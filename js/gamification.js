/* ==========================================================================
   gamification.js — XP, Level, Abzeichen (Badges) und Tages-Streak
   ========================================================================== */

const Gamification = (() => {
  // ---- Level-Formel: level = floor(sqrt(xp/50)) + 1 ----------------------
  function levelFromXp(xp) {
    return Math.floor(Math.sqrt(xp / 50)) + 1;
  }

  function xpForLevel(level) {
    return 50 * Math.pow(level - 1, 2);
  }

  function xpProgress(xp) {
    const level = levelFromXp(xp);
    const floor = xpForLevel(level);
    const ceil = xpForLevel(level + 1);
    const ratio = ceil > floor ? (xp - floor) / (ceil - floor) : 1;
    return { level, floor, ceil, ratio: Math.max(0, Math.min(1, ratio)) };
  }

  // ---- Badges --------------------------------------------------------------
  const BADGES = [
    {
      id: "first-step",
      icon: "medal",
      title: { de: "Erster Schritt", en: "First step" },
      description: { de: "Erste Lektion abgeschlossen", en: "Completed your first lesson" },
      condition: (state) => state.completedLessons.length >= 1,
    },
    {
      id: "five-lessons",
      icon: "book",
      title: { de: "Fleißig", en: "Diligent" },
      description: { de: "5 Lektionen abgeschlossen", en: "Completed 5 lessons" },
      condition: (state) => state.completedLessons.length >= 5,
    },
    {
      id: "ten-lessons",
      icon: "book",
      title: { de: "Wissensdurstig", en: "Knowledge seeker" },
      description: { de: "10 Lektionen abgeschlossen", en: "Completed 10 lessons" },
      condition: (state) => state.completedLessons.length >= 10,
    },
    {
      id: "streak-3",
      icon: "flame",
      title: { de: "In Fahrt", en: "Warming up" },
      description: { de: "3 Tage in Folge gelernt", en: "Learned 3 days in a row" },
      condition: (state) => state.streak.count >= 3,
    },
    {
      id: "streak-7",
      icon: "flame",
      title: { de: "Eine Woche dabei", en: "One week strong" },
      description: { de: "7 Tage in Folge gelernt", en: "Learned 7 days in a row" },
      condition: (state) => state.streak.count >= 7,
    },
    {
      id: "level-5",
      icon: "trophy",
      title: { de: "Aufsteiger", en: "Riser" },
      description: { de: "Level 5 erreicht", en: "Reached level 5" },
      condition: (state) => levelFromXp(state.xp) >= 5,
    },
  ];

  function checkNewBadges(state) {
    const unlocked = [];
    BADGES.forEach((badge) => {
      if (!state.badges.includes(badge.id) && badge.condition(state)) {
        state.badges.push(badge.id);
        unlocked.push(badge);
      }
    });
    return unlocked;
  }

  // ---- Streak ---------------------------------------------------------------
  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function daysBetween(dateStrA, dateStrB) {
    const a = new Date(dateStrA + "T00:00:00");
    const b = new Date(dateStrB + "T00:00:00");
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  }

  function touchStreak(state) {
    const today = todayStr();
    if (state.streak.lastDate === today) {
      return; // heute schon aktiv gewesen
    }
    if (state.streak.lastDate) {
      const diff = daysBetween(state.streak.lastDate, today);
      state.streak.count = diff === 1 ? state.streak.count + 1 : 1;
    } else {
      state.streak.count = 1;
    }
    state.streak.lastDate = today;
  }

  // ---- Lektion abschließen: zentrale Funktion -------------------------------
  function completeLesson(state, lesson) {
    const alreadyCompleted = state.completedLessons.includes(lesson.id);
    const oldLevel = levelFromXp(state.xp);

    let xpGained = 0;
    if (!alreadyCompleted) {
      state.completedLessons.push(lesson.id);
      state.xp += lesson.xp;
      xpGained = lesson.xp;
      touchStreak(state);
    }

    const newLevel = levelFromXp(state.xp);
    const newBadges = checkNewBadges(state);

    return {
      xpGained,
      leveledUp: newLevel > oldLevel,
      newLevel,
      newBadges,
    };
  }

  return { levelFromXp, xpForLevel, xpProgress, BADGES, checkNewBadges, completeLesson, todayStr };
})();
