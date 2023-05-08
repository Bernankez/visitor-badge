"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCache = getCache;
exports.setCache = setCache;
var _nodeCache = _interopRequireDefault(require("node-cache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const cache = new _nodeCache.default({
  stdTTL: 15
});
function getCache(namespace, key) {
  const cacheKey = `${namespace}:${key}`;
  return cache.get(cacheKey);
}
function setCache(namespace, key, value) {
  const cacheKey = `${namespace}:${key}`;
  return cache.set(cacheKey, value);
}