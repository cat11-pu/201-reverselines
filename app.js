// app.js：渲染结果
import { lineAt } from "./reverse.js";
import { reverseLines } from "./order.js";

export function render(spec) {
  const lines = spec.lines || [];
  const view = reverseLines(lines);
  const reversed = view.reversed || [];
  const sources = view.sources || [];
  return { reversed: reversed, sources: sources, count: reversed.length,
           kept: sources.filter((item, spot) => lineAt(lines, item - 1) === reversed[spot]).length,
           checked: reversed.length === sources.length,
           first_from: sources.length > 0 ? sources[0] : 0 };
}
