import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 15 });

export function getCache<T>(namespace: string, key: string) {
  const cacheKey = `${namespace}:${key}`;
  return cache.get<T>(cacheKey);
}

export function setCache<T>(namespace: string, key: string, value: T) {
  const cacheKey = `${namespace}:${key}`;
  return cache.set(cacheKey, value);
}
