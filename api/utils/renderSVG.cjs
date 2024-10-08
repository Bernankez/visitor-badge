"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSVG = renderSVG;
var _svg = require("@svgdotjs/svg.js");
var _avatar = require("./avatar.cjs");
function render(el, width, height) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <style>
          svg {
            image-rendering: pixelated;
          }
        </style>
      </defs>
      <title>Bernankez counter</title>
      <g>
        ${el.join("\n")}
      </g>
  </svg>
  `;
  return svg;
}
async function renderSVG(count) {
  const {
    createSVGWindow
  } = await Promise.resolve().then(() => require("svgdom"));
  const window = createSVGWindow();
  const document = window.document;
  (0, _svg.registerWindow)(window, document);
  const canvas = (0, _svg.SVG)(document.documentElement);
  const text = canvas.plain(`Visited: ${count} times`);
  text.attr({
    // see https://www.zhihu.com/question/58620241
    style: "dominant-baseline: middle"
  }).fill("#c14344").font({
    family: "DejaVu Sans,Verdana,Geneva,sans-serif",
    size: 16
  }).move(70, 38);
  const avatar = (0, _avatar.resolveAvatar)();
  return render([avatar, text.node.outerHTML], 250, 64);
}