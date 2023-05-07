import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs"],
  shims: true,
  minify: true,
  treeshake: true,
  loader: {
    ".svg": "dataurl",
  },
});
