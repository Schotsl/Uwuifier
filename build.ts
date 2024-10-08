import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");
await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "uwuifier",
    author: "Sjors van Holst",
    license: "MIT",
    version: "4.2.2",
    homepage: "https://uwuifier.com",
    description:
      `Uwuifier is a lightweight package that allows you to uwuify any words or sentences (excluding URL's) with many configurable parameters!`,
    repository: {
      url: "git+https://github.com/Schotsl/Uwuifier.git",
      type: "git",
    },
    bugs: {
      url: "https://github.com/Schotsl/Uwuifier/issues",
    },
    // Less then ideal but I couldn't get JSR to work in Node while using dnt
    test: false,
  },
  postBuild() {
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("LICENSE.md", "npm/LICENSE.md");
  },
});
