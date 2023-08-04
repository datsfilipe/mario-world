import type { RouteOptions } from "fastify";

export default [
  {
    method: "GET",
    url: "/",
    handler: async () => {
      return { hello: "world" };
    },
  },
] as RouteOptions[];
