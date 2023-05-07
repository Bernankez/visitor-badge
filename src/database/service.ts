import type { RequestHeaders } from "h3";
import { setCache } from "../cache";
import { Counter } from "./schema";
import { generateHash } from "./hash";

export async function increment(namespace: string, key: string, headers: RequestHeaders) {
  const counter = await Counter.findOneAndUpdate(
    { hash: generateHash(namespace, key) },
    { $setOnInsert: { namespace, key }, $inc: { count: 0 } },
    { new: true, upsert: true },
  );
  await counter.increment(headers);
  setCache(namespace, key, counter.count);
  return counter.count;
}
