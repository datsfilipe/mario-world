import { Result } from "@server/shared/src/core/logic/Result";
import { UseCaseError } from "@server/shared/src/core/logic/UseCaseError";

export class PostAlreadyExists extends Result<UseCaseError> {
  constructor(title: string) {
    super(false, {
      message: `The post "${title}" already exists for this user.`,
    });
  }
}
