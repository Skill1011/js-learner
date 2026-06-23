/* ==========================================================================
   storage.js — Persistenz des Lernfortschritts in localStorage
   ========================================================================== */

const Storage = (() => {
  const STORAGE_KEY = "js-learner-state";

  function defaultState() {
    return {
      lang: "de",
      xp: 0,
      completedLessons: [],   // Array von lesson.id
      badges: [],             // Array von badge.id
      streak: {
        count: 0,
        lastDate: null,       // "YYYY-MM-DD"
      },
      lastLessonId: null,
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      // Mit Defaults zusammenführen, damit fehlende Felder robust sind
      return Object.assign(defaultState(), parsed, {
        streak: Object.assign(defaultState().streak, parsed.streak || {}),
      });
    } catch (e) {
      console.warn("Konnte gespeicherten Zustand nicht laden, nutze Defaults.", e);
      return defaultState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Konnte Zustand nicht speichern.", e);
    }
  }

  return { load, save, defaultState };
})();
