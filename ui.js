// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "行数 " + (spec.lines || []).length + "，点反转看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.reversed.forEach(function (line, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "新第 " + (spot + 1) + " 行";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = line === "" ? "空行" : line;
      row.appendChild(mark);
      const from = document.createElement("span");
      from.className = "chip";
      from.textContent = "来自第 " + view.sources[spot] + " 行";
      row.appendChild(from);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "行数 " + view.count + "，保持原样 " + view.kept + " 行";
    parts.log.textContent = "是否逐行对应 " + view.checked;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "反转行序";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一行";
  addButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).concat(["tail"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一行";
  dropButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一行";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "x";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { lines: (spec.lines || []).concat([box.value]) }));
      parts.out.textContent = "加入后第一行是 " + (view.reversed[0] === "" ? "空行" : view.reversed[0]);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看来自哪行";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "来源序号 " + JSON.stringify(view.sources);
  });
  parts.controls.appendChild(readButton);

  draw();
}
