import type { IUseCase } from "@server/shared/src/core/domain/IUseCase";
import * as GenericAppError from "@server/shared/src/core/logic/AppError";
import {
  Result,
  failure,
  Either,
  success,
} from "@server/shared/src/core/logic/Result";

import { Post } from "@modules/posts/domain/Post";

import * as CreatePostErrors from "./CreatePostErrors";
import { ICreatePostRequestDTO } from "./ICreatePostDTO";
import { IPostRepo } from "@modules/posts/repositories/IPostRepo";

type Response = Either<
  GenericAppError.UnexpectedError | CreatePostErrors.PostAlreadyExists,
  Result<void>
>;

export class CreatePostUseCase
implements IUseCase<ICreatePostRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor(postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  async execute(request: ICreatePostRequestDTO): Promise<Response> {
    const postOrError = Post.create({
      title: request.title,
      content: request.content,
      authorId: request.authorId,
      published: request.published,
    });

    if (postOrError.isFailure) {
      return failure(Result.fail(postOrError.error));
    }

    const post = postOrError.getValue();

    console.log("here", post);
    const postAlreadyExists = await this.postRepo.findByAuthor(post.authorId)
      .then((postsByAuthor) => {
        if (postsByAuthor.find((p) => p?.title === post.title)) {
          return true;
        }

        return false;
      });
    console.log(postAlreadyExists);

    if (postAlreadyExists) {
      return failure(
        new CreatePostErrors.PostAlreadyExists(post.title),
      );
    }

    try {
      await this.postRepo.save(post);
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }

    return success(Result.ok());
  }
}
