import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 15 });
export function getCache(namespace, key) {
  const cacheKey = `${namespace}:${key}`;
  return cache.get(cacheKey);
}
export function setCache(namespace, key, value) {
  const cacheKey = `${namespace}:${key}`;
  return cache.set(cacheKey, value);
}
