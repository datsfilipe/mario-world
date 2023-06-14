import { AggregateRoot } from "@server/shared/src/core/domain/AggregateRoot";
import { UniqueEntityID } from "@server/shared/src/core/domain/UniqueEntityID";
import { Guard } from "@server/shared/src/core/logic/Guard";
import { Result } from "@server/shared/src/core/logic/Result";

import { PostCreatedEvent } from "./events/PostCreatedEvent";

interface IPostProps {
  title: string;
  content?: string;
  published?: boolean;
  authorId: string;
}

export class Post extends AggregateRoot<IPostProps> {
  get title(): string {
    return this.props.title;
  }

  get content(): string | undefined {
    return this.props.content;
  }

  get published(): boolean {
    return this.props.published || false;
  }

  get authorId(): string {
    return this.props.authorId;
  }

  public static create(props: IPostProps, id?: UniqueEntityID): Result<Post> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: "title" },
      { argument: props.authorId, argumentName: "authorId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message);
    }

    const post = new Post(props, id);

    const idWasProvided = !!id;

    if (!idWasProvided) {
      post.addDomainEvent(new PostCreatedEvent(post));
    }

    return Result.ok<Post>(post);
  }
}
