/* =============================================
   PLAYGROUND — Ace editor + Pyodide runtime
   ============================================= */

const Playground = (() => {
  let editor = null;
  let pyodide = null;
  let pyodideLoading = null;

  function setStatus(text) {
    const el = document.getElementById("playgroundStatus");
    if (el) el.textContent = text;
  }

  function appendOutput(text) {
    const out = document.getElementById("playgroundOut");
    if (out) out.textContent += text;
  }

  async function ensurePyodide() {
    if (pyodide) return pyodide;
    if (pyodideLoading) return pyodideLoading;

    setStatus("Loading Python (one-time, ~5 MB)…");
    pyodideLoading = (async () => {
      try {
        pyodide = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
        });
        setStatus("Python ready.");
        return pyodide;
      } catch (e) {
        pyodideLoading = null;
        throw e;
      }
    })();
    return pyodideLoading;
  }

  function mount(day) {
    const mountEl = document.getElementById("aceEditor");
    if (!mountEl) return;
    if (editor) return;

    editor = ace.edit(mountEl, {
      mode: "ace/mode/python",
      theme: "ace/theme/tomorrow_night_eighties",
      fontSize: 14,
      showPrintMargin: false,
      tabSize: 4,
      useSoftTabs: true,
      highlightActiveLine: true,
    });
    editor.session.setOption("useWorker", false);

    const starter =
      (day && day.examples && day.examples[0] && day.examples[0].code) ||
      "# Try it out!\nprint('Hello, Python!')\n";
    editor.setValue(starter, -1);
    editor.clearSelection();
  }

  function unmount() {
    if (editor) {
      try {
        editor.destroy();
        if (editor.container && editor.container.remove) editor.container.remove();
      } catch (_) {}
      editor = null;
    }
  }

  async function run() {
    const out = document.getElementById("playgroundOut");
    if (out) out.textContent = "";

    let py;
    try {
      py = await ensurePyodide();
    } catch (e) {
      setStatus("Failed to load Python.");
      appendOutput("Error loading Pyodide: " + e.message);
      return;
    }

    setStatus("Running…");
    py.setStdout({ batched: (s) => appendOutput(s + "\n") });
    py.setStderr({ batched: (s) => appendOutput(s + "\n") });

    try {
      await py.runPythonAsync(`import builtins; builtins.input = lambda prompt="": (_ for _ in ()).throw(RuntimeError("input() is not supported in the browser. Remove input() and hardcode a value instead."))`);
      await py.runPythonAsync(getCode());
      setStatus("Done.");
    } catch (e) {
      appendOutput((e && e.message) || String(e));
      setStatus("Error.");
    }
  }

  function getCode() {
    return editor ? editor.getValue() : "";
  }

  function clearOutput() {
    const out = document.getElementById("playgroundOut");
    if (out) out.textContent = "";
  }

  function reset(day) {
    if (!editor) return;
    const starter =
      (day && day.examples && day.examples[0] && day.examples[0].code) ||
      "# Try it out!\nprint('Hello, Python!')\n";
    editor.setValue(starter, -1);
    editor.clearSelection();
    clearOutput();
  }

  return { mount, unmount, run, getCode, clearOutput, reset };
})();

window.Playground = Playground;
