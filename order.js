// order.js：反转（基线：原样返回）
import { lineAt } from "./reverse.js";

export function reverseLines(lines) {
  return { reversed: lines.slice(), sources: [], kept: 0 };
}
