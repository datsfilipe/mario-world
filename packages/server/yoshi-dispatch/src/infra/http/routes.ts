import { server } from "./server";
// import { RouteOptions } from "fastify/types/route";

// import customerRoutes from "@modules/customer/infra/http";

server.register((instance, opts, done) => {
  // customerRoutes.forEach((route: RouteOptions) => {
  //   instance.route(route);
  // });
  done();
}, { prefix: "/customer" });
