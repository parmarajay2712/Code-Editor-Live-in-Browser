/* ------------------------------------
   Helper query selector functions
------------------------------------ */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* ------------------------------------
   Core DOM references
------------------------------------ */
const out = $("#output");
const preview = $("#preview");
const storage_key = "code";

/* ------------------------------------
   Escape HTML for safe logging
------------------------------------ */
const ecaphtml = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      }[c])
  );

/* ------------------------------------
   Logger: prints messages into output pane
------------------------------------ */
function log(msg, type = "info") {
  const color =
    type === "error"
      ? "var(--err)"
      : type === "warn"
      ? "var(--warn)"
      : "var(--brand)";

  const time = new Date().toLocaleTimeString();
  const line = document.createElement("div");

  line.innerHTML = `<span style="color: ${color}">[${time}]</span> ${ecaphtml(
    msg
  )}`;

  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

/* ------------------------------------
   Clear output log
------------------------------------ */
function clearout() {
  out.innerHTML = "";
}
$("#clearout")?.addEventListener("click", clearout);

/* ------------------------------------
   Create configured Ace editor instance
------------------------------------ */
function makeeditor(id, mode) {
  const ed = ace.edit(id, {
    theme: "ace/theme/dracula",
    mode,
    tabSize: 2,
    useSoftTabs: true,
    showPrintMargin: false,
    wrap: true,
  });

  ed.session.setUseWrapMode(true);

  // Run code shortcut: Ctrl/Cmd + Enter
  ed.commands.addCommand({
    name: "run",
    bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
    exec() {
      runweb(false);
    },
  });

  // Save shortcut: Ctrl/Cmd + S
  ed.commands.addCommand({
    name: "save",
    bindKey: { win: "Ctrl-S", mac: "Command-S" },
    exec() {
      saveProject();
    },
  });

  return ed;
}

/* ------------------------------------
   Initialize Ace editors
------------------------------------ */
const ed_html = makeeditor("ed_html", "ace/mode/html");
const ed_css = makeeditor("ed_css", "ace/mode/css");
const ed_js = makeeditor("ed_Javascript", "ace/mode/javascript");

/* ------------------------------------
   Pane / tab configuration
------------------------------------ */
const tab_order = ["html", "css", "javascript"];

const wraps = Object.fromEntries(
  $$("#webeditots .editor-wrap").map((w) => [w.dataset.pane, w])
);

const editors = {
  html: ed_html,
  css: ed_css,
  javascript: ed_js,
};

/* ------------------------------------
   Detect active pane
------------------------------------ */
function activepane() {
  const t = $("#webtabs .tab.active");
  return t ? t.dataset.pane : "html";
}

/* ------------------------------------
   Switch visible editor pane
------------------------------------ */
function showpane(name) {
  tab_order.forEach((k) => {
    if (wraps[k]) wraps[k].hidden = k !== name;
  });

  $$("#webtabs .tab").forEach((t) => {
    const on = t.dataset.pane === name;
    t.classList.toggle("active", on);
    t.setAttribute("aria-selected", on);
    t.tabIndex = on ? 0 : -1;
  });

  requestAnimationFrame(() => {
    const ed = editors[name];
    if (ed?.resize) {
      ed.resize(true);
      ed.focus();
    }
  });
}

/* ------------------------------------
   Tab click handler
------------------------------------ */
$("#webtabs")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (btn) showpane(btn.dataset.pane);
});

/* ------------------------------------
   Keyboard navigation for tabs
------------------------------------ */
$("#webtabs")?.addEventListener("keydown", (e) => {
  const idx = tab_order.indexOf(activepane());
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    showpane(tab_order[(idx + delta + tab_order.length) % tab_order.length]);
  }
});

/* ------------------------------------
   Default editor tab
------------------------------------ */
showpane("html");

/* ------------------------------------
   Build iframe srcdoc content
------------------------------------ */
function buildwebSrcdoc(withTests = false) {
  const html = ed_html.getValue();
  const css = ed_css.getValue();
  const javascript = ed_js.getValue();
  const tests = ($("#testArea")?.value || "").trim();

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${css}
</style>
</head>
<body>
${html}
<script>
try {
${javascript}
${withTests && tests ? `\n/* tests */\n${tests}` : ""}
} catch (e) {
console.error(e);
}
<\/script>
</body>
</html>`;
}

/* ------------------------------------
   Render preview into iframe
------------------------------------ */
function runweb(withTests = false) {
  preview.srcdoc = buildwebSrcdoc(withTests);
  log(withTests ? "Run with tests" : "Run preview updated.");
}

$("#runweb")?.addEventListener("click", () => runweb(false));
$("#runtests")?.addEventListener("click", () => runweb(true));

/* ------------------------------------
   Open preview in new window
------------------------------------ */
$("#openPreview")?.addEventListener("click", () => {
  const src = buildwebSrcdoc(true);
  const w = window.open("about:blank");
  w.document.open();
  w.document.write(src);
  w.document.close();
});

/* ------------------------------------
   Build structured JSON project data
------------------------------------ */
function ProjectJSON() {
  return {
    version: 1,
    kind: "web-only",
    Assignment: $("#Assignment")?.value || "",
    test: $("#testArea")?.value || "",
    html: ed_html.getValue(),
    css: ed_css.getValue(),
    javascript: ed_js.getValue(),
  };
}

/* ------------------------------------
   Load project JSON into editors
------------------------------------ */
function loadProject(Obj) {
  try {
    if ($("#Assignment")) $("#Assignment").value = Obj.Assignment || "";
    if ($("#testArea")) $("#testArea").value = Obj.test || "";
    ed_html.setValue(Obj.html || "", -1);
    ed_css.setValue(Obj.css || "", -1);
    ed_js.setValue(Obj.javascript || "", -1);
    log("Web Project loaded.");
  } catch (error) {
    log("Unable to load project: " + error, "error");
  }
}

/* ------------------------------------
   Set starter default editor content
------------------------------------ */
function SetDefaultContent() {
  ed_html.setValue(`<!-- write your html code here.. -->`, -1);
  ed_css.setValue(`/* write your css code here.. */`, -1);
  ed_js.setValue(`// write your javascript code here..`, -1);
}

/* ------------------------------------
   Save project to localStorage & JSON file
------------------------------------ */
function saveProject() {
  try {
    const data = JSON.stringify(ProjectJSON(), null, 2);
    localStorage.setItem(storage_key, data);

    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "web-project.json";
    a.click();

    log("Web Project saved locally and downloaded JSON File.");
  } catch (error) {
    log("Unable to save project: " + error, "error");
  }
}

$("#savebtn")?.addEventListener("click", saveProject);
$("#loadbtn")?.addEventListener("click", () => $("#openfile").click());

/* ------------------------------------
   Import project JSON file
------------------------------------ */
$("#openfile")?.addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  try {
    const Obj = JSON.parse(await f.text());
    loadProject(Obj);
  } catch (error) {
    log("invalid project file:", "error");
  }
});

/* ------------------------------------
   Restore last session or start fresh
------------------------------------ */
try {
  const cache = localStorage.getItem(storage_key);
  cache ? loadProject(JSON.parse(cache)) : SetDefaultContent();
} catch (error) {
  SetDefaultContent();
}

/* ------------------------------------
   Initial ready log
------------------------------------ */
log("Ready - web only editor loaded (HTML / CSS / javascript).");
