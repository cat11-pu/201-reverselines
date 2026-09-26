// reverse.js：取一行（基线：不处理）
export function lineAt(lines, spot) {
  if (spot < 0 || spot >= lines.length) return "";
  return lines[spot];
}
