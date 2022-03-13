import { build } from "https://deno.land/x/dnt/mod.ts";

await build({
  entryPoints: ["./index.ts"],
  outDir: "./dist",
  package: {
    name: "uwuifier",
    version: "4.0.4",
    author: "Sjors van Holst",
    license: "MIT",
    homepage: "https://uwuifier.com",
    repository: "git://github.com/Schotsl/Uwuifier.git",
    description:
      "Uwuifier is a lightweight package that allows you to uwuify any words or sentences (excluding URL's) with many configurable parameters",
  },
});

Deno.copyFileSync("README.md", "dist/README.md");
Deno.copyFileSync("LICENSE.md", "dist/LICENSE.md");
