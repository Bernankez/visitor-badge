"use strict";

var _nodeHttp = require("node:http");
var _h = require("h3");
var _consola = _interopRequireDefault(require("consola"));
var _connect = require("./database/connect.cjs");
var _schema = require("./database/schema.cjs");
var _api = require("./api/index.cjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  (0, _nodeHttp.createServer)((0, _h.toNodeListener)(app)).listen(process.env.PORT || 3e3);
}
initWebServer();