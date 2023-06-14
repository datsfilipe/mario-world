import { BaseController } from "@server/shared/src/core/infra/BaseController";
import { Request, Response } from "express";

import * as CreatePostErrors from "./CreatePostErrors";
import { CreatePostUseCase } from "./CreatePostUseCase";
import { ICreatePostRequestDTO } from "./ICreatePostDTO";

export class CreatePostController extends BaseController<Request, Response> {
  private useCase: CreatePostUseCase;

  constructor(useCase: CreatePostUseCase) {
    super();

    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<unknown> {
    const dto = this.request.body as ICreatePostRequestDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const error = result.value;

        switch (error.constructor) {
        case CreatePostErrors.PostAlreadyExists:
          return this.conflict(error.errorValue().message);
        default:
          return this.fail(error.errorValue().message);
        }
      } else {
        return this.created();
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
