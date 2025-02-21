import type { RequestHeaders } from "h3";
import mongoose, { Schema } from "mongoose";

const logSchema = new Schema({
  hash: { type: String, required: true },
  namespace: { type: String, required: true },
  key: { type: String, required: true },
  count: { type: Number, required: true },
  userAgent: String,
  referer: String,
}, {
  timestamps: true,
});

export const Log = mongoose.model("Log", logSchema, "log");

const counterSchema = new Schema({
  hash: { type: String, required: true, unique: true },
  namespace: { type: String, required: true },
  key: { type: String, required: true },
  count: { type: Number, default: 0 },
}, {
  timestamps: true,
  methods: {
    async increment(headers: RequestHeaders) {
      this.count++;
      await this.save();
      await Log.create({
        hash: this.hash,
        namespace: this.namespace,
        key: this.key,
        count: this.count,
        userAgent: headers["user-agent"],
        referer: headers.referer,
      });
    },
  },
});

export const Counter = mongoose.model("Counter", counterSchema, "counter");
