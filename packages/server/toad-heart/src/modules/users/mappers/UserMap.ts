import { UniqueEntityID } from "@server/shared/src/core/domain/UniqueEntityID";

import { User as PersistenceUser } from "@prisma/client";

import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";

type UserPersistence = {
  id: string;
  name: string | null;
  email: string;
};

export class UserMap {
  public static toDomain(raw: PersistenceUser) {
    const userEmailOrError = UserEmail.create(raw.email);

    const userOrError = User.create(
      {
        name: raw.name || "",
        email: userEmailOrError.getValue(),
      },

      new UniqueEntityID(raw.id)
    );

    if (userOrError.isFailure) {
      console.log(userOrError.error);
    }

    if (userOrError.isSuccess) {
      return userOrError.getValue();
    }

    return;
  }

  public static async toPersistence(user: User): Promise<UserPersistence> {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
    };
  }
}
