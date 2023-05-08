import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs"],
  shims: true,
  outExtension({ format }) {
    return {
      js: `.${format === "cjs" ? "js" : format}`,
    };
  },
});