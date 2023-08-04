import type { RouteOptions } from "fastify";

export default [
  {
    method: "GET",
    url: "/customer",
    handler: async () => {
      return { hello: "world" };
    },
  },
] as RouteOptions[];
