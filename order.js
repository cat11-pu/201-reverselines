// order.js：反转（基线：原样返回）
import { lineAt } from "./reverse.js";

export function reverseLines(lines) {
  const count = lines.length;
  if (count === 0) {
    const error = new Error("E_NO_LINES: no lines to reverse");
    error.code = "E_NO_LINES";
    throw error;
  }
  const reversed = new Array(count);
  const sources = new Array(count);
  let kept = 0;
  for (let spot = 0; spot < count; spot += 1) {
    const source = count - spot;
    const text = lineAt(lines, source - 1);
    reversed[spot] = text;
    sources[spot] = source;
    if (text === lines[source - 1]) kept += 1;
  }
  return { reversed: reversed, sources: sources, kept: kept };
}
