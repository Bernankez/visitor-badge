"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleHeader = handleHeader;
var _h = require("h3");
function handleHeader(event) {
  (0, _h.setHeaders)(event, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"
  });
}