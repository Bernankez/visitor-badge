import { createHash } from "node:crypto";

export function generateHash(namespace: string, key: string) {
  const str = `${namespace}:${key}`;
  const hash = createHash("md5");
  hash.update(str);
  return hash.digest("hex");
}
