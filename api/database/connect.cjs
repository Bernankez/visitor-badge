"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.disconnect = disconnect;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _loadConfig = require("../utils/load-config.cjs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let globalMongoose;
async function connect() {
  const {
    mongodbDatabase,
    mongodbHost,
    mongodbPassword,
    mongodbPort,
    mongodbUser,
    mongodbSRV
  } = await (0, _loadConfig.loadConfig)();
  const url = `mongodb${mongodbSRV ? "+srv" : ""}://${mongodbHost}${mongodbPort ? `:${mongodbPort}` : ""}`;
  return _mongoose.default.connect(url, {
    user: mongodbUser,
    pass: mongodbPassword,
    dbName: mongodbDatabase,
    retryWrites: true,
    writeConcern: {
      w: "majority"
    }
  }).then(res => {
    globalMongoose = res;
    return res;
  });
}
function disconnect() {
  return globalMongoose?.disconnect().then(() => {
    globalMongoose = void 0;
  });
}