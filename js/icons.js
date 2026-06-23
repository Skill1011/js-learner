/* ==========================================================================
   icons.js — Zentrales SVG-Icon-Set (Lucide-Stil, stroke-basiert)

   Ersetzt Emojis bei strukturellen Elementen (Marke, Statusanzeigen,
   Buttons). Emojis bleiben nur als Lektions-Inhalt erlaubt, nie als UI-Chrome.
   ========================================================================== */

const Icons = (() => {
  const paths = {
    brand: '<path d="M8 3 4 12l4 9"/><path d="M16 3l4 9-4 9"/>',
    flame: '<path d="M12 2c1.5 3 .5 4.5-.5 6C10 10 9 11.5 9 13.5a3 3 0 0 0 6 0c0-1-.4-1.8-1-2.5 1.8.8 3 2.6 3 4.8a6 6 0 0 1-12 0c0-3.5 2.5-5.5 4-7.3C9.7 6.8 10.5 4.5 12 2Z"/>',
    trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 5H5a2 2 0 0 0 2 4"/><path d="M16 5h3a2 2 0 0 1-2 4"/><path d="M9 16h6"/><path d="M10 12.5 9.5 16"/><path d="M14 12.5l.5 3.5"/><path d="M8 20h8"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    circle: '<circle cx="12" cy="12" r="9"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 3 3 6 6 6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18"/><path d="M12 3a13 13 0 0 0 0 18"/>',
    arrowLeft: '<path d="M19 12H5"/><polyline points="11 18 5 12 11 6"/>',
    arrowRight: '<path d="M5 12h14"/><polyline points="13 6 19 12 13 18"/>',
    medal: '<circle cx="12" cy="15" r="5"/><path d="M9 10 6 3"/><path d="M15 10l3-7"/><path d="M9.5 14.5 12 13l2.5 1.5-1-2.8 2.2-1.9-2.9-.2L12 7l-1.1 2.6-2.9.2 2.2 1.9z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2V5Z"/><path d="M20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 0 2-2V5Z"/>',
    star: '<polygon points="12 2 15.1 8.6 22 9.3 17 14.1 18.2 21 12 17.6 5.8 21 7 14.1 2 9.3 8.9 8.6 12 2"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    x: '<path d="M18 6 6 18"/><path d="M6 6l12 12"/>',
  };

  function svg(name, { size = 18, strokeWidth = 2, className = "" } = {}) {
    const inner = paths[name];
    if (!inner) return "";
    return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  }

  return { svg, names: Object.keys(paths) };
})();
