import fastify from "fastify";
import routes from "./routes";

const server = fastify({
  logger: true
});

server.register(routes);

server.listen({ port: 3335 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Yoshi-dispatch is running at ${address}!`);
});

export { server };
