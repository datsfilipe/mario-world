import type { Response } from "express";
import type { FastifyReply } from "fastify";

const isOfType = <T>(varToBeChecked: unknown, propertyToCheckFor: keyof T): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export abstract class BaseController<IRequest, IResponse> {
  protected request: IRequest;

  protected response: IResponse;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract executeImpl(): Promise<void | any>;

  public execute(request: IRequest, response: IResponse): void {
    this.request = request;
    this.response = response;

    this.executeImpl();
  }

  public static send<T>(
    code: number,
    response: T,
    dto?: unknown,
  ): Response | FastifyReply {
    if (isOfType<Response>(response, "status")) {
      if (dto) {
        return response.status(code).json(dto);
      } else {
        return response.sendStatus(code);
      }
    } else if (isOfType<FastifyReply>(response, "code")) {
      if (dto) {
        return response.code(code).send(dto);
      } else {
        return response.code(code).send();
      }
    }

    throw new Error("Response object is not recognized");
  }

  public ok<T>(dto?: T): Response | FastifyReply {
    return BaseController.send(200, this.response, dto);
  }

  public created(): Response | FastifyReply {
    return BaseController.send(201, this.response);
  }

  public clientError(message?: string): Response | FastifyReply {
    return BaseController.send(400, this.response, message || "Unauthorized");
  }

  public unauthorized(message?: string): Response | FastifyReply {
    return BaseController.send(401, this.response, message || "Unauthorized");
  }

  public forbidden(message?: string): Response | FastifyReply {
    return BaseController.send(403, this.response, message || "Forbidden");
  }

  public conflict(message?: string): Response | FastifyReply {
    return BaseController.send(409, this.response, message || "Conflict");
  }

  public tooMany(message?: string): Response | FastifyReply {
    return BaseController.send(429, this.response, message || "Too Many Requests");
  }

  public notFound(message?: string): Response | FastifyReply {
    return BaseController.send(404, this.response, message || "Not Found");
  }

  public fail(error: Error | string): Response | FastifyReply {
    console.log(error);
    return BaseController.send(500, this.response, error.toString());
  }
}
