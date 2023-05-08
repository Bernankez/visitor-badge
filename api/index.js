"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/tsup@6.7.0_typescript@5.0.4/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_node_http = require("http");
var import_h33 = require("h3");
var import_consola = __toESM(require("consola"), 1);

// src/database/connect.ts
var import_mongoose = __toESM(require("mongoose"), 1);

// src/utils/load-config.ts
var import_c12 = require("c12");
async function loadConfig() {
  await (0, import_c12.loadConfig)({
    dotenv: true
  });
  const {
    MONGODB_HOST: mongodbHost = "localhost",
    MONGODB_PORT: mongodbPort = 27017,
    MONGODB_DATABASE: mongodbDatabase = "counter",
    MONGODB_USER: mongodbUser,
    MONGODB_PASSWORD: mongodbPassword,
    MONGODB_SRV: mongodbSRV = "false"
  } = process.env;
  return {
    mongodbDatabase,
    mongodbHost,
    mongodbPassword,
    mongodbPort,
    mongodbUser,
    mongodbSRV: mongodbSRV === "true"
  };
}

// src/database/connect.ts
var globalMongoose;
async function connect() {
  const { mongodbDatabase, mongodbHost, mongodbPassword, mongodbPort, mongodbUser, mongodbSRV } = await loadConfig();
  const url = `mongodb${mongodbSRV ? "+srv" : ""}://${mongodbHost}${mongodbPort ? `:${mongodbPort}` : ""}`;
  return import_mongoose.default.connect(url, {
    user: mongodbUser,
    pass: mongodbPassword,
    dbName: mongodbDatabase,
    retryWrites: true,
    writeConcern: {
      w: "majority"
    }
  }).then((res) => {
    globalMongoose = res;
    return res;
  });
}

// src/database/schema.ts
var import_mongoose2 = __toESM(require("mongoose"), 1);
var logSchema = new import_mongoose2.Schema({
  hash: { type: String, required: true },
  namespace: { type: String, required: true },
  key: { type: String, required: true },
  count: { type: Number, required: true },
  userAgent: String,
  referer: String
}, {
  timestamps: true
});
var Log = import_mongoose2.default.model("Log", logSchema, "log");
var counterSchema = new import_mongoose2.Schema({
  hash: { type: String, required: true, unique: true },
  namespace: { type: String, required: true },
  key: { type: String, required: true },
  count: { type: Number, default: 0 }
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
var Counter = import_mongoose2.default.model("Counter", counterSchema, "counter");

// src/router/index.ts
var import_h32 = require("h3");
var import_utils2 = require("@bernankez/utils");

// src/utils/cache.ts
var import_node_cache = __toESM(require("node-cache"), 1);
var cache = new import_node_cache.default({ stdTTL: 15 });
function getCache(namespace, key) {
  const cacheKey = `${namespace}:${key}`;
  return cache.get(cacheKey);
}
function setCache(namespace, key, value) {
  const cacheKey = `${namespace}:${key}`;
  return cache.set(cacheKey, value);
}

// src/utils/hash.ts
var import_node_crypto = require("crypto");
function generateHash(namespace, key) {
  const str = `${namespace}:${key}`;
  const hash = (0, import_node_crypto.createHash)("md5");
  hash.update(str);
  return hash.digest("hex");
}

// src/database/service.ts
async function increment(namespace, key, headers) {
  const counter = await Counter.findOneAndUpdate(
    { hash: generateHash(namespace, key) },
    { $setOnInsert: { namespace, key }, $inc: { count: 0 } },
    { new: true, upsert: true }
  );
  await counter.increment(headers);
  setCache(namespace, key, counter.count);
  return counter.count;
}

// src/utils/renderSVG.ts
var import_svgdom = require("svgdom");
var import_svg = require("@svgdotjs/svg.js");

// src/utils/avatar.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var import_utils = require("@bernankez/utils");
var { __dirname } = (0, import_utils.resolvePath)(importMetaUrl);
function resolveAvatar(x = 0, y = 0, width = 64, height = 64) {
  const avatarPath = (0, import_node_path.resolve)(__dirname, "../assets/avatar.svg");
  const MIME = "image/svg+xml";
  const base64 = (0, import_node_fs.readFileSync)(avatarPath).toString("base64");
  const dataUri = `data:${MIME};base64,${base64}`;
  const image = `
    <image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${dataUri}"></image>
  `;
  return image;
}

// src/utils/renderSVG.ts
function render(el, width, height) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="image-rendering: pixelated;">
      <title>Bernankez counter</title>
      <g>
        ${el.join("\n")}
      </g>
  </svg>
  `;
  return svg;
}
function renderSVG(count) {
  const window = (0, import_svgdom.createSVGWindow)();
  const document2 = window.document;
  (0, import_svg.registerWindow)(window, document2);
  const canvas = (0, import_svg.SVG)(document2.documentElement);
  const text = canvas.plain(`Visited: ${count} times`);
  text.font({
    family: "DejaVu Sans,Verdana,Geneva,sans-serif",
    size: 16
  }).move(70, 28);
  const avatar = resolveAvatar();
  return render([avatar, text.node.outerHTML], 210, 64);
}

// src/utils/header.ts
var import_h3 = require("h3");
function handleHeader(event) {
  (0, import_h3.setHeaders)(event, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"
  });
}

// src/router/index.ts
function createRouter() {
  const router = (0, import_h32.createRouter)().get("/api/**", (0, import_h32.eventHandler)(async (event) => {
    const headers = (0, import_h32.getHeaders)(event);
    const [namespace, key] = event.context.params?._?.split("/") ?? [];
    if (!namespace) {
      throw (0, import_h32.createError)({
        statusCode: 400,
        statusMessage: "namespace is required"
      });
    } else if (!key) {
      throw (0, import_h32.createError)({
        statusCode: 400,
        statusMessage: "key is required"
      });
    }
    let count;
    count = getCache(namespace, key);
    if (!(0, import_utils2.isDefined)(count)) {
      const referer = headers.referer;
      if (referer) {
        const refererUrl = new URL(referer);
        const hostname = refererUrl.hostname.replace("www.", "");
        if (namespace !== hostname) {
          throw (0, import_h32.createError)({
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

// src/index.ts
async function initWebServer() {
  import_consola.default.success("starting web server");
  const app = (0, import_h33.createApp)();
  const mongodb = await connect();
  mongodb.connection.on("disconnected", () => {
    import_consola.default.info("mongodb disconnected");
  });
  import_consola.default.success("mongodb connected");
  await Log.ensureIndexes();
  await Counter.ensureIndexes();
  import_consola.default.success("mongodb indexes ensured");
  const router = createRouter();
  app.use(router);
  (0, import_node_http.createServer)((0, import_h33.toNodeListener)(app)).listen(process.env.PORT || 443);
}
initWebServer();
