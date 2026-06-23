/* ==========================================================================
   runner.js — Führt Nutzer-Code sicher isoliert in einem Web Worker aus.

   Warum ein Worker statt direktem eval() im Hauptthread?
   - Eigener Geltungsbereich: kein Zugriff auf DOM/App-Zustand.
   - Bei Endlosschleifen kann der Worker per terminate() abgebrochen werden,
     ohne dass die Seite einfriert.
   ========================================================================== */

const Runner = (() => {
  const TIMEOUT_MS = 3000;

  // Worker-interner Code als String (läuft isoliert, kein Zugriff auf window)
  const workerSource = `
    function formatValue(v) {
      if (v === undefined) return "undefined";
      if (v === null) return "null";
      if (Array.isArray(v)) return v.join(",");
      if (typeof v === "object") {
        try { return JSON.stringify(v); } catch (e) { return String(v); }
      }
      return String(v);
    }

    self.onmessage = function (ev) {
      const { code, assertCodes } = ev.data;
      const logs = [];
      console.log = function () {
        logs.push(Array.prototype.map.call(arguments, formatValue).join(" "));
      };

      self.__ASSERT_RESULTS__ = [];
      let runtimeError = null;

      const assertLines = (assertCodes || []).map(function (c, i) {
        return 'self.__ASSERT_RESULTS__.push((function(){ try { return { pass: !!(' + c + '), error: null }; } catch (e) { return { pass: false, error: e.message }; } })());';
      }).join("\\n");

      const combined = code + "\\n" + assertLines;

      try {
        // eslint-disable-next-line no-eval
        eval(combined);
      } catch (e) {
        runtimeError = e.message;
      }

      self.postMessage({
        logs: logs,
        runtimeError: runtimeError,
        assertResults: self.__ASSERT_RESULTS__,
      });
    };
  `;

  let workerUrl = null;

  function getWorkerUrl() {
    if (!workerUrl) {
      const blob = new Blob([workerSource], { type: "application/javascript" });
      workerUrl = URL.createObjectURL(blob);
    }
    return workerUrl;
  }

  /**
   * Führt userCode aus und prüft die übergebenen Tests.
   * @param {string} userCode
   * @param {Array} tests - Lektions-Tests (type: "output" | "assert")
   * @param {function} callback - (result) => void
   *   result = { logs: string[], runtimeError: string|null, passed: boolean, failReason: string|null }
   */
  function run(userCode, tests, callback) {
    const worker = new Worker(getWorkerUrl());
    let finished = false;

    const timeoutId = setTimeout(() => {
      if (finished) return;
      finished = true;
      worker.terminate();
      callback({
        logs: [],
        runtimeError: "Timeout: Dein Code lief zu lange. Hast du eine Endlosschleife?",
        passed: false,
        failReason: "timeout",
      });
    }, TIMEOUT_MS);

    worker.onmessage = (ev) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeoutId);
      worker.terminate();

      const { logs, runtimeError, assertResults } = ev.data;
      const evaluation = evaluateTests(tests, logs, assertResults, runtimeError);
      callback({ logs, runtimeError, passed: evaluation.passed, failReason: evaluation.failReason });
    };

    worker.onerror = (err) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeoutId);
      worker.terminate();
      callback({
        logs: [],
        runtimeError: err.message || "Unbekannter Fehler",
        passed: false,
        failReason: "error",
      });
    };

    const assertCodes = (tests || []).filter((t) => t.type === "assert").map((t) => t.code);
    worker.postMessage({ code: userCode, assertCodes });
  }

  function evaluateTests(tests, logs, assertResults, runtimeError) {
    if (runtimeError) {
      return { passed: false, failReason: "runtime" };
    }
    if (!tests || tests.length === 0) {
      return { passed: true, failReason: null };
    }

    let assertIndex = 0;
    for (const test of tests) {
      if (test.type === "output") {
        const expected = test.expected || [];
        const matches = expected.length === logs.length && expected.every((e, i) => String(e) === String(logs[i]));
        if (!matches) return { passed: false, failReason: "output" };
      } else if (test.type === "assert") {
        const result = assertResults[assertIndex];
        assertIndex++;
        if (!result || !result.pass) return { passed: false, failReason: "assert" };
      }
    }
    return { passed: true, failReason: null };
  }

  return { run };
})();
