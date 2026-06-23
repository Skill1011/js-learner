/* ==========================================================================
   lessons.js — Lerninhalte (Module → Lektionen), zweisprachig (de/en)
   ==========================================================================

   Test-Typen pro Lektion:
   - { type: "output", expected: [...zeilen] }
       Vergleicht die per console.log ausgegebenen Zeilen 1:1 (als Strings).
   - { type: "assert", code: "<JS-Ausdruck als String>" }
       Wird NACH dem Nutzer-Code im selben Scope ausgewertet (Sandbox-Iframe).
       Muss zu einem truthy Wert auswerten, um zu bestehen.
   ========================================================================== */

const LESSONS = (() => {
  const modules = [
    {
      id: "grundlagen",
      title: { de: "Grundlagen", en: "Basics" },
      lessons: [
        {
          id: "intro-console-log",
          title: { de: "Hallo, JavaScript!", en: "Hello, JavaScript!" },
          explanation: {
            de: "JavaScript ist die Programmiersprache des Webs. Mit <code>console.log()</code> gibst du Werte aus und siehst sofort, was dein Code tut.",
            en: "JavaScript is the programming language of the web. With <code>console.log()</code> you print values and see exactly what your code does.",
          },
          example: "console.log(\"Hallo, Welt!\");",
          task: {
            de: "Gib mit <code>console.log()</code> den Text <code>Hallo, Welt!</code> aus.",
            en: "Use <code>console.log()</code> to print the text <code>Hello, World!</code>.",
          },
          starterCode: { de: "// Schreibe deinen Code hier\n", en: "// Write your code here\n" },
          tests: [{ type: "output", expected: ["Hallo, Welt!"] }],
          xp: 10,
        },
        {
          id: "variables-let-const",
          title: { de: "Variablen: let & const", en: "Variables: let & const" },
          explanation: {
            de: "Mit <code>let</code> erstellst du eine Variable, die sich später ändern kann. Mit <code>const</code> erstellst du eine Konstante, die nicht neu zugewiesen werden darf.",
            en: "Use <code>let</code> to create a variable that can change later. Use <code>const</code> to create a constant that cannot be reassigned.",
          },
          example: "let name = \"Cem\";\nconst geburtsjahr = 2000;\nconsole.log(name);",
          task: {
            de: "Erstelle eine Variable <code>alter</code> mit <code>let</code> und weise ihr den Wert <code>16</code> zu. Gib sie anschließend mit <code>console.log</code> aus.",
            en: "Create a variable <code>alter</code> using <code>let</code> and assign it the value <code>16</code>. Then print it with <code>console.log</code>.",
          },
          starterCode: { de: "// Erstelle hier deine Variable\n", en: "// Create your variable here\n" },
          tests: [
            { type: "assert", code: "typeof alter !== 'undefined' && alter === 16" },
            { type: "output", expected: ["16"] },
          ],
          xp: 15,
        },
        {
          id: "data-types",
          title: { de: "Datentypen", en: "Data types" },
          explanation: {
            de: "JavaScript kennt u.a. <code>String</code> (Text), <code>Number</code> (Zahlen), <code>Boolean</code> (wahr/falsch). Mit <code>typeof</code> findest du den Typ eines Werts heraus.",
            en: "JavaScript has types like <code>String</code> (text), <code>Number</code>, and <code>Boolean</code> (true/false). Use <code>typeof</code> to find out a value's type.",
          },
          example: "console.log(typeof \"Hallo\");\nconsole.log(typeof 42);\nconsole.log(typeof true);",
          task: {
            de: "Lege eine Variable <code>istWach</code> an mit dem Wert <code>true</code> und gib ihren Typ mit <code>typeof</code> aus.",
            en: "Create a variable <code>istWach</code> with the value <code>true</code> and print its type using <code>typeof</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["boolean"] }],
          xp: 15,
        },
      ],
    },
    {
      id: "operatoren",
      title: { de: "Operatoren & Strings", en: "Operators & Strings" },
      lessons: [
        {
          id: "math-operators",
          title: { de: "Rechnen mit Zahlen", en: "Doing math" },
          explanation: {
            de: "Mit <code>+ - * /</code> kannst du rechnen, mit <code>%</code> den Rest einer Division (Modulo) bestimmen.",
            en: "Use <code>+ - * /</code> for math, and <code>%</code> for the remainder of a division (modulo).",
          },
          example: "console.log(5 + 3);\nconsole.log(10 % 3);",
          task: {
            de: "Berechne <code>7 * 6</code> und gib das Ergebnis aus.",
            en: "Calculate <code>7 * 6</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["42"] }],
          xp: 10,
        },
        {
          id: "template-literals",
          title: { de: "Template Literals", en: "Template literals" },
          explanation: {
            de: "Mit Backticks (`) und <code>${ }</code> kannst du Variablen direkt in einen String einbauen.",
            en: "Using backticks (`) and <code>${ }</code> you can embed variables directly inside a string.",
          },
          example: "let name = \"Cem\";\nconsole.log(`Hallo, ${name}!`);",
          task: {
            de: "Erstelle eine Variable <code>stadt</code> mit dem Wert <code>\"Berlin\"</code> und gib mit einem Template Literal <code>Ich wohne in Berlin</code> aus.",
            en: "Create a variable <code>stadt</code> with the value <code>\"Berlin\"</code> and print <code>I live in Berlin</code> using a template literal.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Ich wohne in Berlin"] }],
          xp: 15,
        },
        {
          id: "comparisons",
          title: { de: "Vergleiche", en: "Comparisons" },
          explanation: {
            de: "Mit <code>===</code> vergleichst du Werte exakt (Wert UND Typ). Das Ergebnis ist immer <code>true</code> oder <code>false</code>.",
            en: "Use <code>===</code> to compare values strictly (value AND type). The result is always <code>true</code> or <code>false</code>.",
          },
          example: "console.log(5 === 5);\nconsole.log(5 === \"5\");",
          task: {
            de: "Gib aus, ob <code>10</code> größer ist als <code>3</code> (verwende <code>&gt;</code>).",
            en: "Print whether <code>10</code> is greater than <code>3</code> (use <code>&gt;</code>).",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["true"] }],
          xp: 10,
        },
      ],
    },
    {
      id: "bedingungen",
      title: { de: "Bedingungen", en: "Conditionals" },
      lessons: [
        {
          id: "if-else",
          title: { de: "if / else", en: "if / else" },
          explanation: {
            de: "Mit <code>if (bedingung) { ... } else { ... }</code> führst du Code nur unter bestimmten Bedingungen aus.",
            en: "With <code>if (condition) { ... } else { ... }</code> you only run code under certain conditions.",
          },
          example: "let alter = 18;\nif (alter >= 18) {\n  console.log(\"volljährig\");\n} else {\n  console.log(\"minderjährig\");\n}",
          task: {
            de: "Lege eine Variable <code>punkte</code> mit dem Wert <code>75</code> an. Gib <code>\"bestanden\"</code> aus, wenn <code>punkte >= 50</code> ist, sonst <code>\"nicht bestanden\"</code>.",
            en: "Create a variable <code>punkte</code> with value <code>75</code>. Print <code>\"bestanden\"</code> if <code>punkte >= 50</code>, otherwise <code>\"nicht bestanden\"</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["bestanden"] }],
          xp: 15,
        },
      ],
    },
    {
      id: "schleifen",
      title: { de: "Schleifen", en: "Loops" },
      lessons: [
        {
          id: "for-loop",
          title: { de: "Die for-Schleife", en: "The for loop" },
          explanation: {
            de: "Eine <code>for</code>-Schleife wiederholt Code: <code>for (let i = 0; i &lt; 5; i++) { ... }</code>.",
            en: "A <code>for</code> loop repeats code: <code>for (let i = 0; i &lt; 5; i++) { ... }</code>.",
          },
          example: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
          task: {
            de: "Gib mit einer <code>for</code>-Schleife die Zahlen <code>1</code> bis <code>5</code> aus (jede in einer eigenen Zeile).",
            en: "Use a <code>for</code> loop to print the numbers <code>1</code> to <code>5</code> (each on its own line).",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["1", "2", "3", "4", "5"] }],
          xp: 20,
        },
      ],
    },
    {
      id: "funktionen",
      title: { de: "Funktionen", en: "Functions" },
      lessons: [
        {
          id: "function-basics",
          title: { de: "Funktionen definieren", en: "Defining functions" },
          explanation: {
            de: "Eine Funktion fasst Code zusammen, den du wiederverwenden kannst: <code>function name(parameter) { return ergebnis; }</code>.",
            en: "A function bundles code you can reuse: <code>function name(parameter) { return result; }</code>.",
          },
          example: "function verdoppeln(zahl) {\n  return zahl * 2;\n}\nconsole.log(verdoppeln(4));",
          task: {
            de: "Schreibe eine Funktion <code>quadrat(zahl)</code>, die die Zahl mit sich selbst multipliziert zurückgibt. Rufe sie mit <code>5</code> auf und gib das Ergebnis aus.",
            en: "Write a function <code>quadrat(zahl)</code> that returns the number multiplied by itself. Call it with <code>5</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [
            { type: "assert", code: "typeof quadrat === 'function' && quadrat(5) === 25" },
            { type: "output", expected: ["25"] },
          ],
          xp: 20,
        },
      ],
    },
    {
      id: "arrays",
      title: { de: "Arrays", en: "Arrays" },
      lessons: [
        {
          id: "array-basics",
          title: { de: "Arrays erstellen & nutzen", en: "Creating & using arrays" },
          explanation: {
            de: "Ein Array speichert mehrere Werte in einer Liste: <code>[1, 2, 3]</code>. Mit <code>.push()</code> fügst du Werte hinzu, mit <code>array[index]</code> greifst du darauf zu.",
            en: "An array stores multiple values in a list: <code>[1, 2, 3]</code>. Use <code>.push()</code> to add values, and <code>array[index]</code> to access them.",
          },
          example: "let farben = [\"rot\", \"grün\", \"blau\"];\nfarben.push(\"gelb\");\nconsole.log(farben[0]);",
          task: {
            de: "Erstelle ein Array <code>zahlen</code> mit <code>[1, 2, 3]</code>, füge <code>4</code> hinzu und gib das ganze Array aus.",
            en: "Create an array <code>zahlen</code> with <code>[1, 2, 3]</code>, push <code>4</code>, and print the whole array.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["1,2,3,4"] }],
          xp: 20,
        },
      ],
    },
    {
      id: "objekte",
      title: { de: "Objekte", en: "Objects" },
      lessons: [
        {
          id: "object-basics",
          title: { de: "Objekte erstellen & nutzen", en: "Creating & using objects" },
          explanation: {
            de: "Ein Objekt speichert Werte unter Namen (Eigenschaften): <code>{ name: \"Cem\", alter: 16 }</code>. Zugriff per <code>objekt.name</code>.",
            en: "An object stores values under names (properties): <code>{ name: \"Cem\", alter: 16 }</code>. Access via <code>objekt.name</code>.",
          },
          example: "let person = { name: \"Cem\", alter: 16 };\nconsole.log(person.name);",
          task: {
            de: "Erstelle ein Objekt <code>auto</code> mit den Eigenschaften <code>marke: \"VW\"</code> und <code>baujahr: 2020</code>. Gib <code>auto.marke</code> aus.",
            en: "Create an object <code>auto</code> with properties <code>marke: \"VW\"</code> and <code>baujahr: 2020</code>. Print <code>auto.marke</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["VW"] }],
          xp: 20,
        },
      ],
    },
    {
      id: "dom-bonus",
      title: { de: "DOM & Events (Bonus)", en: "DOM & Events (Bonus)" },
      lessons: [
        {
          id: "dom-intro",
          title: { de: "Das DOM verstehen", en: "Understanding the DOM" },
          explanation: {
            de: "Das DOM (Document Object Model) ist die Struktur einer Webseite, die JavaScript verändern kann. In dieser Sandbox simulieren wir das mit einem einfachen Objekt statt einer echten Seite.",
            en: "The DOM (Document Object Model) is the structure of a web page that JavaScript can change. In this sandbox we simulate it with a simple object instead of a real page.",
          },
          example: "let seite = { titel: \"Meine Seite\" };\nseite.titel = \"Neuer Titel\";\nconsole.log(seite.titel);",
          task: {
            de: "Erstelle ein Objekt <code>seite</code> mit <code>titel: \"Start\"</code>, ändere <code>seite.titel</code> zu <code>\"Geändert\"</code> und gib <code>seite.titel</code> aus.",
            en: "Create an object <code>seite</code> with <code>titel: \"Start\"</code>, change <code>seite.titel</code> to <code>\"Geändert\"</code> and print <code>seite.titel</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Geändert"] }],
          xp: 25,
        },
      ],
    },
  ];

  function getModules() {
    return modules;
  }

  function getAllLessons() {
    return modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })));
  }

  function getLessonById(id) {
    return getAllLessons().find((l) => l.id === id) || null;
  }

  function getModuleByLessonId(id) {
    return modules.find((m) => m.lessons.some((l) => l.id === id)) || null;
  }

  return { getModules, getAllLessons, getLessonById, getModuleByLessonId };
})();
