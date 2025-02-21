import { isDefined } from "@bernankez/utils";
import { createError, createRouter, eventHandler, getHeaders } from "h3";
import { increment } from "../database/service.mjs";
import { getCache } from "../utils/cache.mjs";
import { handleHeader } from "../utils/header.mjs";
import { renderSVG } from "../utils/renderSVG.mjs";
export function createAppRoute() {
  const router = createRouter().get("/api/**", eventHandler(async (event) => {
    const headers = getHeaders(event);
    const [namespace, key] = event.context.params?._?.split("/") ?? [];
    if (!namespace) {
      throw createError({
        statusCode: 400,
        statusMessage: "namespace is required"
      });
    } else if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: "key is required"
      });
    }
    let count;
    count = getCache(namespace, key);
    if (!isDefined(count)) {
      const referer = headers.referer;
      if (referer) {
        const refererUrl = new URL(referer);
        const hostname = refererUrl.hostname.replace("www.", "");
        if (namespace !== hostname) {
          throw createError({
            statusCode: 401,
            statusMessage: "unauthorized"
          });
        }
      }
      count = await increment(namespace, key, headers);
    }
    handleHeader(event);
    return renderSVG(count);
  }));
  return router;
}
