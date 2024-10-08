import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      input: "./src",
      outDir: "./api",
      format: "esm",
      ext: "mjs",
    },
  ],
  declaration: false,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
