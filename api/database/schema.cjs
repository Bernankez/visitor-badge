"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = exports.Counter = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const Log = exports.Log = _mongoose.default.model("Log", logSchema, "log");
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
const Counter = exports.Counter = _mongoose.default.model("Counter", counterSchema, "counter");