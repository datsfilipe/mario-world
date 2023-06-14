import { UniqueEntityID } from "@server/shared/src/core/domain/UniqueEntityID";

import { Post as PersistencePost } from "@prisma/client";

import { Post } from "../domain/Post";

type PostPersistence = {
  id: string;
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
};

export class PostMap {
  public static toDomain(raw: PersistencePost) {
    const postOrError = Post.create(
      {
        title: raw.title,
        content: raw.content || "",
        published: raw.published,
        authorId: raw.authorId,
      },

      new UniqueEntityID(raw.id)
    );

    if (postOrError.isFailure) {
      console.log(postOrError.error);
    }

    if (postOrError.isSuccess) {
      return postOrError.getValue();
    }

    return;
  }

  public static async toPersistence(post: Post): Promise<PostPersistence> {
    return {
      id: post.id.toString(),
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
    };
  }
}
