import { AggregateRoot } from "@server/shared/src/core/domain/AggregateRoot";
import { UniqueEntityID } from "@server/shared/src/core/domain/UniqueEntityID";
import { Guard } from "@server/shared/src/core/logic/Guard";
import { Result } from "@server/shared/src/core/logic/Result";

import { UserCreatedEvent } from "./events/UserCreatedEvent";
import { UserEmail } from "./UserEmail";

type Post = {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
};

interface IUserProps {
  name: string;
  email: UserEmail;
  posts?: Post[];
}

export class User extends AggregateRoot<IUserProps> {
  get name(): string {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get posts(): Post[] {
    return this.props.posts || [];
  }

  public static create(props: IUserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    const user = new User(props, id);

    const idWasProvided = !!id;

    if (!idWasProvided) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return Result.ok<User>(user);
  }
}
