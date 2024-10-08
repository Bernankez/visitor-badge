import { setCache } from "../utils/cache.mjs";
import { generateHash } from "../utils/hash.mjs";
import { Counter } from "./schema.mjs";
export async function increment(namespace, key, headers) {
  const counter = await Counter.findOneAndUpdate(
    { hash: generateHash(namespace, key) },
    { $setOnInsert: { namespace, key }, $inc: { count: 0 } },
    { new: true, upsert: true }
  );
  await counter.increment(headers);
  setCache(namespace, key, counter.count);
  return counter.count;
}
