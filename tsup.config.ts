import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  shims: true,
  dts: true,
  minify: true,
  treeshake: true,
  loader: {
    ".svg": "dataurl",
  },
  outExtension({ format }) {
    return {
      js: `.${format === "esm" ? "mjs" : format}`,
    };
  },
});
