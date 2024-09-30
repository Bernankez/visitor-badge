"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadConfig = loadConfig;
var _nodeProcess = _interopRequireDefault(require("node:process"));
var _c = require("c12");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function loadConfig() {
  await (0, _c.loadConfig)({
    dotenv: true
  });
  const {
    MONGODB_HOST: mongodbHost = "localhost",
    MONGODB_PORT: mongodbPort = 27017,
    MONGODB_DATABASE: mongodbDatabase = "counter",
    MONGODB_USER: mongodbUser,
    MONGODB_PASSWORD: mongodbPassword,
    MONGODB_SRV: mongodbSRV = "false"
  } = _nodeProcess.default.env;
  return {
    mongodbDatabase,
    mongodbHost,
    mongodbPassword,
    mongodbPort,
    mongodbUser,
    mongodbSRV: mongodbSRV === "true"
  };
}