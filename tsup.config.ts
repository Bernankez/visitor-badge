import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "api",
  clean: true,
  format: ["cjs"],
  shims: true,
  minify: true,
  treeshake: true,
  loader: {
    ".svg": "dataurl",
  },
  outExtension({ format }) {
    return {
      js: `.${format === "cjs" ? "js" : format}`,
    };
  },
});
