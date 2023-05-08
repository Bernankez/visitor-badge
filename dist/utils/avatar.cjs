"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveAvatar = resolveAvatar;
var _nodeFs = require("node:fs");
var _nodePath = require("node:path");
var _utils = require("@bernankez/utils");
const {
  __dirname: _dirname
} = (0, _utils.resolvePath)(require('url').pathToFileURL(__filename).toString());
function resolveAvatar(x = 0, y = 0, width = 64, height = 64) {
  const avatarPath = (0, _nodePath.resolve)(_dirname, "../assets/avatar.svg");
  const MIME = "image/svg+xml";
  const base64 = (0, _nodeFs.readFileSync)(avatarPath).toString("base64");
  const dataUri = `data:${MIME};base64,${base64}`;
  const image = `
    <image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${dataUri}"></image>
  `;
  return image;
}