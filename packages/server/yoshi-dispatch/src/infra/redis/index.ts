import { createClient } from "redis";
import { Client } from "redis-om";

const redis = createClient();
let client: Client | null = null;

const connect = async () => {
  await redis.connect();

  client = await new Client().use(redis);
};

const disconnect = async () => {
  await redis.disconnect();

  client = null;
};

export {
  connect,
  disconnect,
  client,
};
