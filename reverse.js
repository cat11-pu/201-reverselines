// reverse.js：取一行（下标从零数，越界给空串）
export function lineAt(lines, spot) {
  if (spot < 0 || spot >= lines.length) {
    return "";
  }
  return lines[spot];
}
