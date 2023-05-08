"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHash = generateHash;
var _nodeCrypto = require("node:crypto");
function generateHash(namespace, key) {
  const str = `${namespace}:${key}`;
  const hash = (0, _nodeCrypto.createHash)("md5");
  hash.update(str);
  return hash.digest("hex");
}