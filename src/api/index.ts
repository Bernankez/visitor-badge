import { isDefined } from "@bernankez/utils";
import { createError, createRouter as createRouterH3, eventHandler, getHeaders } from "h3";
import { increment } from "../database/service";
import { getCache } from "../utils/cache";
import { handleHeader } from "../utils/header";
import { renderSVG } from "../utils/renderSVG";

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
    let count: number | undefined;
    count = getCache<number>(namespace, key);
    if (!isDefined(count)) {
      const referer = headers.referer;
      if (referer) {
        // namespace need to fit hostname
        // eg. www.example.com. namespace should be example.com
        const refererUrl = new URL(referer);
        const hostname = refererUrl.hostname.replace("www.", "");
        if (namespace !== hostname) {
          throw createError({
            statusCode: 401,
            statusMessage: "unauthorized",
          });
        }
      }
      count = await increment(namespace, key, headers);
    }
    handleHeader(event);
    return await renderSVG(count);
  }));
  return router;
}
