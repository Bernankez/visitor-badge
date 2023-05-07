import { createError, createRouter as createRouterH3, eventHandler, getHeaders } from "h3";
import { getCache } from "../utils/cache";
import { increment } from "../database/service";

export function createRouter() {
  const router = createRouterH3().get("/api/**", eventHandler(async (event) => {
    const headers = getHeaders(event);
    const [namespace, key] = event.context.params?._?.split("/") ?? [];
    if (!namespace) {
      throw createError({
        statusCode: 400,
        statusMessage: "namespace is required",
      });
    } else if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: "key is required",
      });
    }
    const count = getCache<number>(namespace, key);
    if (count) { return count; }
    const referer = headers.referer;
    if (referer) {
      const refererUrl = new URL(referer);
      const hostname = refererUrl.hostname.replace("www.", "");
      if (namespace !== hostname) {
        throw createError({
          statusCode: 401,
          statusMessage: "unauthorized",
        });
      }
    }
    return await increment(namespace, key, headers);
  }));
  return router;
}

