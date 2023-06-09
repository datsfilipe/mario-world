import type { IUseCase } from "@server/shared/src/core/domain/IUseCase";
import * as GenericAppError from "@server/shared/src/core/logic/AppError";
import {
  Result,
  failure,
  Either,
  success,
} from "@server/shared/src/core/logic/Result";

import { User } from "@modules/users/domain/User";
import { UserEmail } from "@modules/users/domain/UserEmail";

import * as CreateUserErrors from "./CreateUserErrors";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";
import { IUserRepo } from "@modules/users/repositories/IUserRepo";

type Response = Either<
  GenericAppError.UnexpectedError | CreateUserErrors.AccountAlreadyExists,
  Result<void>
>;

export class CreateUserUseCase
implements IUseCase<ICreateUserRequestDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: ICreateUserRequestDTO): Promise<Response> {
    const userEmailOrError = UserEmail.create(request.email);

    const result = Result.ok<UserEmail>(userEmailOrError.getValue());

    if (result.isFailure) {
      return failure(Result.fail(result.error));
    }

    const userOrError = User.create({
      name: request.name,
      email: userEmailOrError.getValue(),
    });

    if (userOrError.isFailure) {
      return failure(Result.fail(userOrError.error));
    }

    const user = userOrError.getValue();

    const userAlreadyExists = await this.userRepo.findByEmail(user.email);

    if (userAlreadyExists) {
      return failure(
        new CreateUserErrors.AccountAlreadyExists(user.email.value)
      );
    }

    try {
      await this.userRepo.save(user);
    } catch (err) {
      return failure(new GenericAppError.UnexpectedError(err));
    }

    return success(Result.ok());
  }
}
