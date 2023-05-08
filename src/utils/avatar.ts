import base64 from "../assets/avatar.svg";

export function resolveAvatar(x = 0, y = 0, width = 64, height = 64) {
  const MIME = "image/svg+xml";
  const dataUri = `data:${MIME};base64,${base64}`;

  const image = `
    <image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${dataUri}"></image>
  `;

  return image;
}
