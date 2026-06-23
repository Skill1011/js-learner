/* ==========================================================================
   app.js — App-Initialisierung, Routing, UI-Verdrahtung
   ========================================================================== */

(() => {
  let state = Storage.load();
  let currentLessonId = null;

  // Rotierende Modulfarben aus der Syntax-Palette (style.css :root)
  const MODULE_COLORS = ["#c792ea", "#82aaff", "#f78c66", "#8bd17c", "#f7df1e", "#6b9bd1", "#e0a9e8", "#7fd9c4"];

  const sidebarEl = document.getElementById("sidebar");
  const welcomeScreenEl = document.getElementById("welcome-screen");
  const lessonViewEl = document.getElementById("lesson-view");
  const moduleLabelEl = document.getElementById("lesson-module-label");
  const titleEl = document.getElementById("lesson-title");
  const explanationEl = document.getElementById("lesson-explanation");
  const exampleEl = document.getElementById("lesson-example");
  const taskEl = document.getElementById("lesson-task");
  const xpRewardEl = document.getElementById("lesson-xp-reward");
  const prevBtn = document.getElementById("prev-lesson-btn");
  const nextBtn = document.getElementById("next-lesson-btn");
  const langToggleBtn = document.getElementById("lang-toggle");
  const toastContainer = document.getElementById("toast-container");
  const startLearningBtn = document.getElementById("start-learning-btn");

  const badgesOpenBtn = document.getElementById("badges-open-btn");
  const badgesCloseBtn = document.getElementById("badges-close-btn");
  const badgesOverlayEl = document.getElementById("badges-modal-overlay");
  const badgesGridEl = document.getElementById("badges-grid");
  const badgesSubtitleEl = document.getElementById("badges-modal-subtitle");
  let badgesTriggerEl = null;

  const streakCountEl = document.getElementById("streak-count");
  const levelCountEl = document.getElementById("level-count");
  const xpBarFillEl = document.getElementById("xp-bar-fill");
  const xpLabelEl = document.getElementById("xp-label");
  const progressCountEl = document.getElementById("progress-count");

  function init() {
    I18N.setLang(state.lang || "de");
    Editor.init({ onPass: handleLessonPassed });
    renderStaticIcons();

    renderSidebar();
    updateHeaderStats();
    I18N.applyStaticTranslations();

    langToggleBtn.addEventListener("click", toggleLang);
    prevBtn.addEventListener("click", () => navigate(-1));
    nextBtn.addEventListener("click", () => navigate(1));
    badgesOpenBtn.addEventListener("click", openBadgesModal);
    badgesCloseBtn.addEventListener("click", closeBadgesModal);
    badgesOverlayEl.addEventListener("click", (e) => {
      if (e.target === badgesOverlayEl) closeBadgesModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !badgesOverlayEl.classList.contains("hidden")) closeBadgesModal();
    });
    startLearningBtn.addEventListener("click", () => {
      const first = LESSONS.getAllLessons()[0];
      if (first) selectLesson(first.id);
    });

    initHero();

    const startId = state.lastLessonId && LESSONS.getLessonById(state.lastLessonId) ? state.lastLessonId : null;
    if (startId) {
      selectLesson(startId);
    }
  }

  // ---------------- Icons (ersetzen Emoji-Chrome durch SVG) ----------------

  function renderStaticIcons() {
    document.getElementById("brand-icon").innerHTML = Icons.svg("brand", { size: 20 });
    document.getElementById("streak-icon").innerHTML = Icons.svg("flame", { size: 16 });
    document.getElementById("level-icon").innerHTML = Icons.svg("trophy", { size: 16 });
    document.getElementById("lang-icon").innerHTML = Icons.svg("globe", { size: 16 });
    document.getElementById("run-icon").innerHTML = Icons.svg("play", { size: 16 });
    document.getElementById("reset-icon").innerHTML = Icons.svg("reset", { size: 16 });
    document.getElementById("prev-icon").innerHTML = Icons.svg("arrowLeft", { size: 16 });
    document.getElementById("next-icon").innerHTML = Icons.svg("arrowRight", { size: 16 });
    document.getElementById("badges-close-icon").innerHTML = Icons.svg("x", { size: 18 });
    document.getElementById("progress-icon").innerHTML = Icons.svg("check", { size: 16 });
  }

  // ---------------- Badges modal ----------------

  function renderBadgesGrid() {
    const lang = I18N.getLang();
    badgesGridEl.innerHTML = "";

    Gamification.BADGES.forEach((badge) => {
      const unlocked = state.badges.includes(badge.id);
      const cardEl = document.createElement("div");
      cardEl.className = "badge-card" + (unlocked ? " unlocked" : "");

      const iconEl = document.createElement("span");
      iconEl.className = "badge-card-icon";
      iconEl.innerHTML = Icons.svg(unlocked ? badge.icon : "lock", { size: 18 });

      const textEl = document.createElement("div");
      const titleEl2 = document.createElement("p");
      titleEl2.className = "badge-card-title";
      titleEl2.textContent = badge.title[lang];
      const descEl = document.createElement("p");
      descEl.className = "badge-card-desc";
      descEl.textContent = badge.description[lang];
      textEl.appendChild(titleEl2);
      textEl.appendChild(descEl);

      if (!unlocked) {
        const lockedTag = document.createElement("span");
        lockedTag.className = "badge-card-locked-tag";
        lockedTag.textContent = I18N.t("badgeLockedLabel");
        textEl.appendChild(lockedTag);
      }

      cardEl.appendChild(iconEl);
      cardEl.appendChild(textEl);
      badgesGridEl.appendChild(cardEl);
    });

    badgesSubtitleEl.textContent = I18N.t("badgesModalSubtitle", {
      unlocked: state.badges.length,
      total: Gamification.BADGES.length,
    });
  }

  function openBadgesModal() {
    badgesTriggerEl = document.activeElement;
    renderBadgesGrid();
    badgesOverlayEl.classList.remove("hidden");
    badgesCloseBtn.focus();
  }

  function closeBadgesModal() {
    badgesOverlayEl.classList.add("hidden");
    if (badgesTriggerEl && typeof badgesTriggerEl.focus === "function") badgesTriggerEl.focus();
  }

  // ---------------- Hero: Partikel + Live-Tipp-Demo ----------------

  function initHero() {
    const heroParticlesEl = document.getElementById("hero-particles");
    new Particles(heroParticlesEl, {
      particleColors: ["#f7df1e", "#82aaff", "#8bd17c"],
      particleCount: 70,
      particleSpread: 8,
      speed: 0.12,
      particleBaseSize: 70,
      moveParticlesOnHover: true,
      alphaParticles: true,
      disableRotation: false,
    });

    typeHeroDemo();
  }

  function typeHeroDemo() {
    const codeEl = document.getElementById("hero-typed-code");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = 'console.log("Hallo, Welt!");';
    const output = "Hallo, Welt!";

    if (reducedMotion) {
      codeEl.textContent = `${line}\n${output}`;
      return;
    }

    let i = 0;
    codeEl.textContent = "";
    const typeChar = () => {
      if (i <= line.length) {
        codeEl.textContent = line.slice(0, i);
        i++;
        setTimeout(typeChar, 35);
      } else {
        setTimeout(() => {
          codeEl.textContent = `${line}\n${output}`;
        }, 400);
      }
    };
    typeChar();
  }

  // ---------------- Sidebar ----------------

  function renderSidebar() {
    const lang = I18N.getLang();
    sidebarEl.innerHTML = "";
    let lessonIndex = 0;

    LESSONS.getModules().forEach((module, moduleIndex) => {
      const color = MODULE_COLORS[moduleIndex % MODULE_COLORS.length];

      const moduleEl = document.createElement("div");
      moduleEl.className = "sidebar-module";
      moduleEl.style.setProperty("--module-color", color);

      const moduleTitleEl = document.createElement("div");
      moduleTitleEl.className = "sidebar-module-title";
      moduleTitleEl.textContent = module.title[lang];
      moduleEl.appendChild(moduleTitleEl);

      module.lessons.forEach((lesson) => {
        const lessonEl = document.createElement("div");
        const completed = state.completedLessons.includes(lesson.id);
        lessonEl.className = "sidebar-lesson" + (completed ? " completed" : "") + (lesson.id === currentLessonId ? " active" : "");
        lessonEl.dataset.lessonId = lesson.id;
        lessonEl.style.setProperty("--module-color", color);
        lessonEl.style.animationDelay = `${Math.min(lessonIndex * 25, 400)}ms`;
        lessonEl.setAttribute("role", "button");
        lessonEl.setAttribute("tabindex", "0");

        const checkEl = document.createElement("span");
        checkEl.className = "lesson-check";
        checkEl.innerHTML = completed ? Icons.svg("check", { size: 13 }) : "";

        const labelEl = document.createElement("span");
        labelEl.textContent = lesson.title[lang];

        lessonEl.appendChild(checkEl);
        lessonEl.appendChild(labelEl);
        lessonEl.addEventListener("click", () => selectLesson(lesson.id));
        lessonEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectLesson(lesson.id);
          }
        });

        moduleEl.appendChild(lessonEl);
        lessonIndex++;
      });

      sidebarEl.appendChild(moduleEl);
    });
  }

  function updateSidebarActiveAndCompletion() {
    sidebarEl.querySelectorAll(".sidebar-lesson").forEach((el) => {
      const id = el.dataset.lessonId;
      el.classList.toggle("active", id === currentLessonId);
      const completed = state.completedLessons.includes(id);
      el.classList.toggle("completed", completed);
      el.querySelector(".lesson-check").innerHTML = completed ? Icons.svg("check", { size: 13 }) : "";
    });
  }

  // ---------------- Lesson view ----------------

  function selectLesson(id) {
    const lesson = LESSONS.getLessonById(id);
    if (!lesson) return;
    currentLessonId = id;
    state.lastLessonId = id;
    Storage.save(state);

    const lang = I18N.getLang();
    const moduleIndex = LESSONS.getModules().findIndex((m) => m.lessons.some((l) => l.id === id));
    const module = LESSONS.getModuleByLessonId(id);
    const color = MODULE_COLORS[Math.max(moduleIndex, 0) % MODULE_COLORS.length];

    welcomeScreenEl.classList.add("hidden");
    lessonViewEl.classList.remove("hidden");
    lessonViewEl.style.setProperty("--module-color", color);

    moduleLabelEl.textContent = module ? module.title[lang] : "";
    titleEl.textContent = lesson.title[lang];
    explanationEl.innerHTML = lesson.explanation[lang];
    exampleEl.textContent = lesson.example;
    taskEl.innerHTML = lesson.task[lang];
    xpRewardEl.textContent = I18N.t("xpReward", { xp: lesson.xp });

    Editor.loadLesson(lesson);
    updateSidebarActiveAndCompletion();
    updateNavButtons();

    document.getElementById("lesson-title").focus?.();
  }

  function updateNavButtons() {
    const all = LESSONS.getAllLessons();
    const idx = all.findIndex((l) => l.id === currentLessonId);
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx === -1 || idx >= all.length - 1;
  }

  function navigate(delta) {
    const all = LESSONS.getAllLessons();
    const idx = all.findIndex((l) => l.id === currentLessonId);
    const newIdx = idx + delta;
    if (newIdx < 0 || newIdx >= all.length) return;
    selectLesson(all[newIdx].id);
  }

  // ---------------- Gamification hooks ----------------

  function handleLessonPassed(lesson) {
    const result = Gamification.completeLesson(state, lesson);
    Storage.save(state);
    updateHeaderStats();
    updateSidebarActiveAndCompletion();

    if (result.xpGained > 0) {
      showToast("star", I18N.t("toastXpTitle"), I18N.t("toastXpBody", { xp: result.xpGained, lesson: lesson.title[I18N.getLang()] }));
    }
    if (result.leveledUp) {
      showToast("trophy", I18N.t("toastLevelTitle"), I18N.t("toastLevelBody", { level: result.newLevel }));
    }
    result.newBadges.forEach((badge) => {
      const lang = I18N.getLang();
      showToast(badge.icon, I18N.t("toastBadgeTitle"), `${badge.title[lang]}: ${badge.description[lang]}`);
    });
  }

  // ---------------- Header stats ----------------

  function updateHeaderStats() {
    streakCountEl.textContent = state.streak.count;
    const progress = Gamification.xpProgress(state.xp);
    levelCountEl.textContent = progress.level;
    xpBarFillEl.style.width = `${Math.round(progress.ratio * 100)}%`;
    xpLabelEl.textContent = `${state.xp} / ${progress.ceil} XP`;
    progressCountEl.textContent = `${state.completedLessons.length} / ${LESSONS.getAllLessons().length}`;
  }

  // ---------------- Language ----------------

  function toggleLang() {
    state.lang = I18N.getLang() === "de" ? "en" : "de";
    I18N.setLang(state.lang);
    Storage.save(state);

    I18N.applyStaticTranslations();
    renderSidebar();
    if (currentLessonId) selectLesson(currentLessonId);
    if (!badgesOverlayEl.classList.contains("hidden")) renderBadgesGrid();
  }

  // ---------------- Toasts ----------------

  function showToast(iconName, title, body) {
    const toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.innerHTML = `<span class="toast-icon">${Icons.svg(iconName, { size: 20 })}</span><div><div class="toast-title">${escapeHtml(title)}</div><div class="toast-body">${escapeHtml(body)}</div></div>`;
    toastContainer.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 3000);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
