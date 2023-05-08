"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increment = increment;
var _cache = require("../utils/cache.cjs");
var _hash = require("../utils/hash.cjs");
var _schema = require("./schema.cjs");
async function increment(namespace, key, headers) {
  const counter = await _schema.Counter.findOneAndUpdate({
    hash: (0, _hash.generateHash)(namespace, key)
  }, {
    $setOnInsert: {
      namespace,
      key
    },
    $inc: {
      count: 0
    }
  }, {
    new: true,
    upsert: true
  });
  await counter.increment(headers);
  (0, _cache.setCache)(namespace, key, counter.count);
  return counter.count;
}