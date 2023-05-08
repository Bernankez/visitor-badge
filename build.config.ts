import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: "mkdist",
      input: "./src",
      outDir: "./api",
      format: "cjs",
      ext: "cjs",
    },
  ],
  declaration: false,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
