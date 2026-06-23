/* ==========================================================================
   editor.js — Code-Editor-UI: Eingabe, Ausführen, Zurücksetzen, Ausgabe
   ========================================================================== */

const Editor = (() => {
  let textarea, runBtn, resetBtn, consoleOutput, testResultEl;
  let currentLesson = null;
  let onTestPassed = null; // callback(lesson)

  function init({ onPass }) {
    textarea = document.getElementById("code-editor");
    runBtn = document.getElementById("run-btn");
    resetBtn = document.getElementById("reset-btn");
    consoleOutput = document.getElementById("console-output");
    testResultEl = document.getElementById("test-result");
    onTestPassed = onPass;

    // Tab-Taste fügt Einrückung ein statt den Fokus zu wechseln
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.slice(0, start) + "  " + textarea.value.slice(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }
    });

    runBtn.addEventListener("click", runCode);
    resetBtn.addEventListener("click", resetCode);
  }

  function getStarterCode(lesson) {
    const sc = lesson.starterCode;
    if (sc && typeof sc === "object") return sc[I18N.getLang()] || sc.de || "";
    return sc || "";
  }

  function loadLesson(lesson) {
    currentLesson = lesson;
    textarea.value = getStarterCode(lesson);
    clearOutput();
  }

  function clearOutput() {
    consoleOutput.textContent = "";
    testResultEl.className = "test-result";
    testResultEl.textContent = "";
  }

  function resetCode() {
    if (!currentLesson) return;
    textarea.value = getStarterCode(currentLesson);
    clearOutput();
  }

  function runCode() {
    if (!currentLesson) return;
    runBtn.disabled = true;
    consoleOutput.textContent = "…";
    testResultEl.className = "test-result";

    Runner.run(textarea.value, currentLesson.tests, (result) => {
      runBtn.disabled = false;
      renderOutput(result);

      if (result.passed && typeof onTestPassed === "function") {
        onTestPassed(currentLesson);
      }
    });
  }

  function renderOutput(result) {
    const lines = result.logs && result.logs.length ? result.logs : [];
    if (result.runtimeError) {
      consoleOutput.innerHTML =
        (lines.length ? escapeHtml(lines.join("\n")) + "\n" : "") +
        `<span class="error-line">${escapeHtml(I18N.t("runtimeErrorPrefix") + result.runtimeError)}</span>`;
    } else {
      consoleOutput.textContent = lines.length ? lines.join("\n") : I18N.t("noOutput");
    }

    testResultEl.classList.remove("pass", "fail");
    if (result.passed) {
      testResultEl.classList.add("pass");
      testResultEl.textContent = I18N.t("testPass");
    } else {
      testResultEl.classList.add("fail");
      testResultEl.textContent = I18N.t("testFail");
    }
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  return { init, loadLesson, clearOutput };
})();
