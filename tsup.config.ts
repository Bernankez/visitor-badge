import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "api",
  clean: true,
  format: ["cjs"],
  shims: true,
  treeshake: true,
  minify: true,
  outExtension({ format }) {
    return {
      js: `.${format === "cjs" ? "js" : format}`,
    };
  },
});
