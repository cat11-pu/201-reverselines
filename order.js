// order.js：反转（单次扫描，每行只处理一次；空行也参与）
import { lineAt } from "./reverse.js";

export function reverseLines(lines) {
  const count = lines.length;
  if (count === 0) {
    const error = new Error("no lines to reverse");
    error.code = "E_NO_LINES";
    throw error;
  }
  const reversed = new Array(count);
  const sources = new Array(count);
  let kept = 0;
  for (let spot = 0; spot < count; spot += 1) {
    const from = count - 1 - spot;
    const line = lineAt(lines, from);
    reversed[spot] = line;
    sources[spot] = from + 1;
    if (lineAt(lines, from) === line) {
      kept += 1;
    }
  }
  return { reversed: reversed, sources: sources, kept: kept };
}
