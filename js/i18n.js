/* ==========================================================================
   i18n.js — Übersetzung der statischen Oberflächentexte (DE / EN)
   ========================================================================== */

const I18N = (() => {
  const translations = {
    de: {
      level: "Level",
      heroEyebrow: "Interaktiver JavaScript-Kurs",
      welcomeTitle: "Code schreiben. Direkt sehen, was passiert.",
      welcomeText: "Wähle links eine Lektion. Du schreibst echten Code, er läuft sofort im Browser, und du sammelst XP für jede Lösung.",
      startLearning: "Erste Lektion starten",
      explanationHeading: "Erklärung",
      exampleHeading: "Beispiel",
      taskHeading: "Aufgabe",
      consoleHeading: "Konsole",
      runButton: "Ausführen",
      resetButton: "Zurücksetzen",
      prevLesson: "Zurück",
      nextLesson: "Weiter",
      xpReward: "+{xp} XP",
      testPass: "✅ Geschafft! Aufgabe gelöst.",
      testFail: "❌ Noch nicht ganz richtig. Versuch's nochmal!",
      noOutput: "(keine Ausgabe)",
      runtimeErrorPrefix: "Fehler: ",
      toastXpTitle: "XP erhalten!",
      toastXpBody: "+{xp} XP für „{lesson}“",
      toastLevelTitle: "Level Up! 🎉",
      toastLevelBody: "Du bist jetzt Level {level}!",
      toastBadgeTitle: "Abzeichen freigeschaltet! 🏅",
      streakTitle: "Streak",
      firstLessonHint: "Wähle links eine Lektion, um zu starten.",
      badgesButtonLabel: "Abzeichen anzeigen",
      badgesModalTitle: "Abzeichen",
      badgesModalSubtitle: "{unlocked} von {total} freigeschaltet",
      badgesCloseLabel: "Schließen",
      badgeLockedLabel: "Noch nicht freigeschaltet",
    },
    en: {
      level: "Level",
      heroEyebrow: "Interactive JavaScript course",
      welcomeTitle: "Write code. Watch it run instantly.",
      welcomeText: "Pick a lesson on the left. You write real code, it runs in your browser right away, and you earn XP for every solution.",
      startLearning: "Start the first lesson",
      explanationHeading: "Explanation",
      exampleHeading: "Example",
      taskHeading: "Task",
      consoleHeading: "Console",
      runButton: "Run",
      resetButton: "Reset",
      prevLesson: "Back",
      nextLesson: "Next",
      xpReward: "+{xp} XP",
      testPass: "✅ Well done! Task solved.",
      testFail: "❌ Not quite right yet. Try again!",
      noOutput: "(no output)",
      runtimeErrorPrefix: "Error: ",
      toastXpTitle: "XP earned!",
      toastXpBody: "+{xp} XP for \"{lesson}\"",
      toastLevelTitle: "Level Up! 🎉",
      toastLevelBody: "You are now level {level}!",
      toastBadgeTitle: "Badge unlocked! 🏅",
      streakTitle: "Streak",
      firstLessonHint: "Pick a lesson on the left to get started.",
      badgesButtonLabel: "Show badges",
      badgesModalTitle: "Badges",
      badgesModalSubtitle: "{unlocked} of {total} unlocked",
      badgesCloseLabel: "Close",
      badgeLockedLabel: "Not unlocked yet",
    },
  };

  let currentLang = "de";

  function setLang(lang) {
    if (translations[lang]) currentLang = lang;
  }

  function getLang() {
    return currentLang;
  }

  function t(key, vars) {
    let str = (translations[currentLang] && translations[currentLang][key])
      || (translations.de && translations.de[key])
      || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(`{${k}}`, vars[k]);
      });
    }
    return str;
  }

  // Aktualisiert alle Elemente mit data-i18n(-title|-aria-label) im DOM
  function applyStaticTranslations(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.getAttribute("data-i18n-title"));
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
  }

  return { setLang, getLang, t, applyStaticTranslations };
})();
