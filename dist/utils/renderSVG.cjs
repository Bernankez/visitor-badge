"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSVG = renderSVG;
var _svgdom = require("svgdom");
var _svg = require("@svgdotjs/svg.js");
var _avatar = require("./avatar.cjs");
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
  const window = (0, _svgdom.createSVGWindow)();
  const document = window.document;
  (0, _svg.registerWindow)(window, document);
  const canvas = (0, _svg.SVG)(document.documentElement);
  const text = canvas.plain(`Visited: ${count} times`);
  text.font({
    family: "DejaVu Sans,Verdana,Geneva,sans-serif",
    size: 16
  }).move(70, 28);
  const avatar = (0, _avatar.resolveAvatar)();
  return render([avatar, text.node.outerHTML], 210, 64);
}