import { createRequire } from "https://deno.land/std/node/module.ts";
const require = createRequire(import.meta.url);
const p = require("./src/index");
export let parser = p;
