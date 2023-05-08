import dataUri from "../assets/avatar.svg";

export function resolveAvatar(x = 0, y = 0, width = 64, height = 64) {
  const image = `
    <image x="${x}" y="${y}" width="${width}" height="${height}" xlink:href="${dataUri.replaceAll("\"\"", "\\\"\\\"")}"></image>
  `;

  return image;
}
