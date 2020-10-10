import { assert } from "https://deno.land/std/testing/asserts.ts";
import { parser } from "./mod.ts";

Deno.test("env", () => {
  if (!parser) {
    throw Error("missing parser module");
  }
});

Deno.test("can parse app.arc", () => {
  let arcfile = `
@app
myapp
@http
get /
`;
  let parsed = parser(arcfile);
  assert(parsed);
  console.log(parsed);
});

Deno.test("can parse json", () => {
  let arcfile = JSON.stringify({
    app: "myapp",
    http: [{ get: "/" }],
  });
  let parsed = parser.json(arcfile);
  assert(parsed);
  console.log(parsed);
});

Deno.test("can parse yaml", () => {
  let arcfile = `
app: myapp
http: 
  - get: /
`;
  let parsed = parser.yaml(arcfile);
  assert(parsed);
  console.log(parsed);
});
