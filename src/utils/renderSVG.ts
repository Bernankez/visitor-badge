// @ts-expect-error no type definitions
import { createSVGWindow } from "svgdom";
import type { Svg } from "@svgdotjs/svg.js";
import { SVG, registerWindow } from "@svgdotjs/svg.js";
import { resolveAvatar } from "./avatar";

function render(el: string[], width: number, height: number) {
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

export function renderSVG(count: number) {
  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);

  const canvas = (SVG(document.documentElement) as Svg);
  const text = canvas.plain(`Visited: ${count} times`);
  text.attr({
    // see https://www.zhihu.com/question/58620241
    style: "dominant-baseline: middle",
  }).font({
    family: "DejaVu Sans,Verdana,Geneva,sans-serif",
    size: 16,
  }).move(70, 38);

  const avatar = resolveAvatar();

  return render([avatar, text.node.outerHTML], 210, 64);
}
