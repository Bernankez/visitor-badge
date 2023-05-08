"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = createRouter;
var _h = require("h3");
var _utils = require("@bernankez/utils");
var _cache = require("../utils/cache.cjs");
var _service = require("../database/service.cjs");
var _renderSVG = require("../utils/renderSVG.cjs");
var _header = require("../utils/header.cjs");
function createRouter() {
  const router = (0, _h.createRouter)().get("/api/**", (0, _h.eventHandler)(async event => {
    const headers = (0, _h.getHeaders)(event);
    const [namespace, key] = event.context.params?._?.split("/") ?? [];
    if (!namespace) {
      throw (0, _h.createError)({
        statusCode: 400,
        statusMessage: "namespace is required"
      });
    } else if (!key) {
      throw (0, _h.createError)({
        statusCode: 400,
        statusMessage: "key is required"
      });
    }
    let count;
    count = (0, _cache.getCache)(namespace, key);
    if (!(0, _utils.isDefined)(count)) {
      const referer = headers.referer;
      if (referer) {
        const refererUrl = new URL(referer);
        const hostname = refererUrl.hostname.replace("www.", "");
        if (namespace !== hostname) {
          throw (0, _h.createError)({
            statusCode: 401,
            statusMessage: "unauthorized"
          });
        }
      }
      count = await (0, _service.increment)(namespace, key, headers);
    }
    (0, _header.handleHeader)(event);
    return (0, _renderSVG.renderSVG)(count);
  }));
  return router;
}