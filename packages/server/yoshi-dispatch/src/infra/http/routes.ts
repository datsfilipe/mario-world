import type { RouteOptions } from "fastify/types/route";
import type { FastifyInstance } from "fastify";

import customerRoutes from "@modules/customer/infra/http";

export default function routes(instance: FastifyInstance, opts: unknown, done: () => void): void {
  customerRoutes.forEach((route: RouteOptions) => {
    instance.route(route);
  });
  done();
}
