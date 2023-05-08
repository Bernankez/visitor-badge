"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = exports.Counter = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const logSchema = new _mongoose.Schema({
  hash: {
    type: String,
    required: true
  },
  namespace: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  userAgent: String,
  referer: String
}, {
  timestamps: true
});
const Log = _mongoose.default.model("Log", logSchema, "log");
exports.Log = Log;
const counterSchema = new _mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  namespace: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  methods: {
    async increment(headers) {
      this.count++;
      await this.save();
      await Log.create({
        hash: this.hash,
        namespace: this.namespace,
        key: this.key,
        count: this.count,
        userAgent: headers["user-agent"],
        referer: headers.referer
      });
    }
  }
});
const Counter = _mongoose.default.model("Counter", counterSchema, "counter");
exports.Counter = Counter;