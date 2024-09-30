"use strict";

var _nodeHttp = require("node:http");
var _nodeProcess = _interopRequireDefault(require("node:process"));
var _consola = _interopRequireDefault(require("consola"));
var _h = require("h3");
var _api = require("./api/index.cjs");
var _connect = require("./database/connect.cjs");
var _schema = require("./database/schema.cjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function initWebServer() {
  const app = (0, _h.createApp)();
  const mongodb = await (0, _connect.connect)();
  mongodb.connection.on("disconnected", () => {
    _consola.default.info("mongodb disconnected");
  });
  _consola.default.success("mongodb connected");
  await _schema.Log.ensureIndexes();
  await _schema.Counter.ensureIndexes();
  _consola.default.success("mongodb indexes ensured");
  const router = (0, _api.createRouter)();
  app.use(router);
  (0, _nodeHttp.createServer)((0, _h.toNodeListener)(app)).listen(_nodeProcess.default.env.PORT || 3e3);
}
initWebServer();