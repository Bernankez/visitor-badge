import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { resolvePath } from "@bernankez/utils/node";

const { __dirname } = resolvePath(import.meta.url);

export function resolveAvatar(x = 0, y = 0, width = 64, height = 64) {
  const avatarPath = resolve(__dirname, "../assets/avatar.svg");
  const MIME = "image/svg+xml";
  const base64 = readFileSync(avatarPath).toString("base64");
  const dataUri = `data:${MIME};base64,${base64}`;

  const image = `
    <image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${dataUri}"></image>
  `;

  return image;
}
