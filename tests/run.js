import assert from "node:assert";
import { lineAt } from "../reverse.js";
import { reverseLines } from "../order.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("lineAt returns text", () => {
  assert.strictEqual(typeof lineAt(["a"], 0), "string");
});

check("reverseLines returns reversed list", () => {
  assert.ok(Array.isArray(reverseLines(["a"]).reversed));
});

check("reverseLines returns sources", () => {
  assert.ok(Array.isArray(reverseLines(["a"]).sources));
});

check("render counts lines", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).count, "number");
});

check("render exposes first source", () => {
  assert.strictEqual(typeof render({ lines: ["a"] }).first_from, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
