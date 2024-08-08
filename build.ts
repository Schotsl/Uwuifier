import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

await emptyDir("./npm");
await build({
  shims: {
    deno: true,
  },
  package: {
    name: "uwuifier",
    author: "Sjors van Holst",
    license: "MIT",
    version: "4.1.0",
    homepage: "https://uwuifier.com",
    repository: "git://github.com/Schotsl/Uwuifier.git",
    description:
      "Uwuifier is a lightweight package that allows you to uwuify any words or sentences (excluding URL's) with many configurable parameters",
  },
  outDir: "./dist",
  entryPoints: ["./index.ts"],
});

Deno.copyFileSync("README.md", "dist/README.md");
Deno.copyFileSync("LICENSE.md", "dist/LICENSE.md");
