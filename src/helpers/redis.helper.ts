import { createClient } from "redis";

const client = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

const setItem = async (key: string, value: string) => {
  try {
    await client.set(key, value);
  } catch (error) {}
};
const getItem = async (key: string): Promise<string> => {
  try {
    return client.get(key);
  } catch (error) {}
};

const deleteItem = async (key: string) => {
  try {
    await client.del(key);
  } catch (error) {}
};

export default { setItem, getItem, deleteItem };
