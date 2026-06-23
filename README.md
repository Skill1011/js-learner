# JS Learner

Interaktiver JavaScript-Kurs für Einsteiger. DE/EN umschaltbar, reines HTML/CSS/Vanilla-JS ohne Build-Schritt.

**Live:** https://skill1011.github.io/js-learner/

## Features

- Lektionen zu Grundlagen, Operatoren, Bedingungen, Schleifen, Funktionen, Arrays, Objekten und dem DOM
- Code-Editor mit direkter Ausführung im Browser, isoliert in einem Web Worker
- XP, Level, Tages-Streak und Abzeichen für abgeschlossene Lektionen
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)

## Lokal starten

Keine Abhängigkeiten, kein Build. Einfach `index.html` im Browser öffnen, oder mit einem beliebigen statischen Server ausliefern:

```
npx serve .
```

## Struktur

```
index.html
css/style.css      Designsystem
js/app.js           Initialisierung, Routing, UI
js/lessons.js       Lektionsinhalte
js/editor.js        Editor-UI
js/runner.js        Code-Ausführung im Web Worker
js/gamification.js  XP, Level, Abzeichen, Streak
js/storage.js       localStorage-Persistenz
js/i18n.js          DE/EN-Übersetzungen
js/icons.js         SVG-Icon-Set
js/particles.js     Partikel-Hintergrund (Vanilla-JS)
```
