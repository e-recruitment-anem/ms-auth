import { createClient } from "redis";

const client = createClient();
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

export default { setItem, getItem };
