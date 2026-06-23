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
        {
          id: "else-if-chains",
          title: { de: "else if-Ketten", en: "else if chains" },
          explanation: {
            de: "Mit <code>else if</code> prüfst du mehrere Bedingungen nacheinander. Die erste zutreffende wird ausgeführt, der Rest wird übersprungen.",
            en: "Use <code>else if</code> to check multiple conditions in order. The first one that matches runs, the rest are skipped.",
          },
          example: "let note = 2;\nif (note === 1) {\n  console.log(\"sehr gut\");\n} else if (note === 2) {\n  console.log(\"gut\");\n} else {\n  console.log(\"weiter so\");\n}",
          task: {
            de: "Lege eine Variable <code>temperatur</code> mit dem Wert <code>28</code> an. Gib <code>\"heiß\"</code> aus, wenn sie über 25 liegt, sonst <code>\"mild\"</code>, wenn sie über 15 liegt, sonst <code>\"kalt\"</code>.",
            en: "Create a variable <code>temperatur</code> with value <code>28</code>. Print <code>\"heiß\"</code> if it's above 25, otherwise <code>\"mild\"</code> if above 15, otherwise <code>\"kalt\"</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["heiß"] }],
          xp: 15,
        },
        {
          id: "switch-statement",
          title: { de: "switch-Statement", en: "switch statement" },
          explanation: {
            de: "<code>switch</code> vergleicht einen Wert mit mehreren <code>case</code>-Möglichkeiten. <code>break</code> beendet den jeweiligen Fall, <code>default</code> greift, wenn nichts passt.",
            en: "<code>switch</code> compares a value against several <code>case</code> options. <code>break</code> ends each case, <code>default</code> runs when nothing matches.",
          },
          example: "let tag = \"Mo\";\nswitch (tag) {\n  case \"Mo\":\n    console.log(\"Montag\");\n    break;\n  default:\n    console.log(\"anderer Tag\");\n}",
          task: {
            de: "Lege eine Variable <code>farbe</code> mit dem Wert <code>\"grün\"</code> an. Gib per <code>switch</code> <code>\"los\"</code> aus, wenn sie <code>\"grün\"</code> ist, <code>\"warten\"</code> bei <code>\"gelb\"</code>, <code>\"stopp\"</code> bei <code>\"rot\"</code>.",
            en: "Create a variable <code>farbe</code> with value <code>\"grün\"</code>. Use <code>switch</code> to print <code>\"los\"</code> for <code>\"grün\"</code>, <code>\"warten\"</code> for <code>\"gelb\"</code>, <code>\"stopp\"</code> for <code>\"rot\"</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["los"] }],
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
        {
          id: "while-loop",
          title: { de: "Die while-Schleife", en: "The while loop" },
          explanation: {
            de: "Eine <code>while</code>-Schleife wiederholt Code, solange eine Bedingung wahr ist: <code>while (bedingung) { ... }</code>. Du musst die Bedingung selbst irgendwann falsch machen, sonst läuft sie endlos.",
            en: "A <code>while</code> loop repeats code as long as a condition is true: <code>while (condition) { ... }</code>. You must make the condition false yourself eventually, or it runs forever.",
          },
          example: "let zahl = 5;\nwhile (zahl > 0) {\n  console.log(zahl);\n  zahl--;\n}",
          task: {
            de: "Erstelle eine Variable <code>zaehler</code> mit dem Wert <code>3</code>. Gib mit einer <code>while</code>-Schleife <code>zaehler</code> aus und verringere ihn jedes Mal um 1, bis er <code>0</code> erreicht (3, 2, 1 ausgeben).",
            en: "Create a variable <code>zaehler</code> with value <code>3</code>. Use a <code>while</code> loop to print <code>zaehler</code> and decrease it by 1 each time, until it reaches <code>0</code> (print 3, 2, 1).",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["3", "2", "1"] }],
          xp: 20,
        },
        {
          id: "for-of-arrays",
          title: { de: "Arrays durchlaufen mit for...of", en: "Iterating arrays with for...of" },
          explanation: {
            de: "Mit <code>for (const wert of array) { ... }</code> bekommst du in jedem Durchlauf direkt den nächsten Wert des Arrays, ohne selbst einen Index zu verwalten.",
            en: "With <code>for (const value of array) { ... }</code> you get the next array value directly on each iteration, without managing an index yourself.",
          },
          example: "let obst = [\"Apfel\", \"Birne\", \"Kiwi\"];\nfor (const stueck of obst) {\n  console.log(stueck);\n}",
          task: {
            de: "Erstelle ein Array <code>tiere</code> mit <code>[\"Hund\", \"Katze\", \"Maus\"]</code> und gib jedes Element mit <code>for...of</code> in einer eigenen Zeile aus.",
            en: "Create an array <code>tiere</code> with <code>[\"Hund\", \"Katze\", \"Maus\"]</code> and print each element on its own line using <code>for...of</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Hund", "Katze", "Maus"] }],
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
        {
          id: "arrow-functions",
          title: { de: "Arrow Functions", en: "Arrow functions" },
          explanation: {
            de: "Arrow Functions sind eine kürzere Schreibweise für Funktionen: <code>const name = (parameter) => ausdruck;</code>. Bei nur einem Ausdruck entfällt <code>return</code>.",
            en: "Arrow functions are a shorter way to write functions: <code>const name = (parameter) => expression;</code>. With a single expression you can skip <code>return</code>.",
          },
          example: "const verdoppeln = (zahl) => zahl * 2;\nconsole.log(verdoppeln(4));",
          task: {
            de: "Schreibe eine Arrow Function <code>halbieren</code>, die eine Zahl durch 2 teilt. Rufe sie mit <code>10</code> auf und gib das Ergebnis aus.",
            en: "Write an arrow function <code>halbieren</code> that divides a number by 2. Call it with <code>10</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [
            { type: "assert", code: "typeof halbieren === 'function' && halbieren(10) === 5" },
            { type: "output", expected: ["5"] },
          ],
          xp: 20,
        },
        {
          id: "default-parameters",
          title: { de: "Default-Parameter", en: "Default parameters" },
          explanation: {
            de: "Funktionsparameter können einen Standardwert haben: <code>function gruss(name = \"Gast\") { ... }</code>. Wird kein Argument übergeben, greift der Standardwert.",
            en: "Function parameters can have a default value: <code>function gruss(name = \"Gast\") { ... }</code>. If no argument is passed, the default value is used.",
          },
          example: "function gruss(name = \"Gast\") {\n  return `Hallo, ${name}!`;\n}\nconsole.log(gruss());\nconsole.log(gruss(\"Cem\"));",
          task: {
            de: "Schreibe eine Funktion <code>potenz(basis, exponent = 2)</code>, die <code>basis</code> hoch <code>exponent</code> zurückgibt (nutze <code>Math.pow</code>). Rufe sie nur mit <code>basis = 3</code> auf und gib das Ergebnis aus.",
            en: "Write a function <code>potenz(basis, exponent = 2)</code> that returns <code>basis</code> to the power of <code>exponent</code> (use <code>Math.pow</code>). Call it with only <code>basis = 3</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [
            { type: "assert", code: "typeof potenz === 'function' && potenz(3) === 9" },
            { type: "output", expected: ["9"] },
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
        {
          id: "array-map-filter",
          title: { de: ".map() und .filter()", en: ".map() and .filter()" },
          explanation: {
            de: "<code>.map()</code> erzeugt ein neues Array, indem es jeden Wert umwandelt. <code>.filter()</code> erzeugt ein neues Array nur mit Werten, die eine Bedingung erfüllen.",
            en: "<code>.map()</code> creates a new array by transforming every value. <code>.filter()</code> creates a new array containing only values that match a condition.",
          },
          example: "let zahlen = [1, 2, 3, 4];\nlet verdoppelt = zahlen.map((z) => z * 2);\nlet gerade = zahlen.filter((z) => z % 2 === 0);\nconsole.log(verdoppelt);\nconsole.log(gerade);",
          task: {
            de: "Erstelle ein Array <code>zahlen</code> mit <code>[1, 2, 3, 4, 5]</code>. Erzeuge mit <code>.filter()</code> ein Array <code>grosse</code> mit allen Zahlen größer als 2 und gib es aus.",
            en: "Create an array <code>zahlen</code> with <code>[1, 2, 3, 4, 5]</code>. Use <code>.filter()</code> to create an array <code>grosse</code> with all numbers greater than 2 and print it.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["3,4,5"] }],
          xp: 25,
        },
        {
          id: "array-find-includes",
          title: { de: ".find() und .includes()", en: ".find() and .includes()" },
          explanation: {
            de: "<code>.find()</code> gibt den ersten Wert zurück, der eine Bedingung erfüllt (oder <code>undefined</code>). <code>.includes()</code> prüft, ob ein Wert im Array enthalten ist, und gibt <code>true</code>/<code>false</code> zurück.",
            en: "<code>.find()</code> returns the first value matching a condition (or <code>undefined</code>). <code>.includes()</code> checks whether a value exists in the array and returns <code>true</code>/<code>false</code>.",
          },
          example: "let zahlen = [3, 7, 12, 5];\nconsole.log(zahlen.find((z) => z > 10));\nconsole.log(zahlen.includes(7));",
          task: {
            de: "Erstelle ein Array <code>namen</code> mit <code>[\"Anna\", \"Ben\", \"Cem\"]</code>. Gib mit <code>.includes()</code> aus, ob <code>\"Ben\"</code> enthalten ist.",
            en: "Create an array <code>namen</code> with <code>[\"Anna\", \"Ben\", \"Cem\"]</code>. Use <code>.includes()</code> to print whether <code>\"Ben\"</code> is contained.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["true"] }],
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
        {
          id: "object-methods",
          title: { de: "Objekt-Methoden", en: "Object methods" },
          explanation: {
            de: "Eine Eigenschaft kann auch eine Funktion sein — das nennt man Methode. Innerhalb der Methode greifst du mit <code>this</code> auf andere Eigenschaften desselben Objekts zu.",
            en: "A property can also be a function — that's called a method. Inside the method, use <code>this</code> to access other properties of the same object.",
          },
          example: "let person = {\n  name: \"Cem\",\n  gruesse() {\n    return `Hallo, ich bin ${this.name}`;\n  },\n};\nconsole.log(person.gruesse());",
          task: {
            de: "Erstelle ein Objekt <code>rechteck</code> mit <code>breite: 4</code>, <code>hoehe: 3</code> und einer Methode <code>flaeche()</code>, die <code>breite * hoehe</code> zurückgibt. Rufe <code>rechteck.flaeche()</code> auf und gib das Ergebnis aus.",
            en: "Create an object <code>rechteck</code> with <code>breite: 4</code>, <code>hoehe: 3</code> and a method <code>flaeche()</code> that returns <code>breite * hoehe</code>. Call <code>rechteck.flaeche()</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["12"] }],
          xp: 25,
        },
        {
          id: "object-destructuring",
          title: { de: "Destructuring", en: "Destructuring" },
          explanation: {
            de: "Mit Destructuring holst du Eigenschaften direkt in Variablen: <code>const { name, alter } = person;</code> erstellt <code>name</code> und <code>alter</code> aus den gleichnamigen Eigenschaften.",
            en: "Destructuring pulls properties directly into variables: <code>const { name, alter } = person;</code> creates <code>name</code> and <code>alter</code> from the matching properties.",
          },
          example: "let person = { name: \"Cem\", alter: 16 };\nconst { name, alter } = person;\nconsole.log(name, alter);",
          task: {
            de: "Erstelle ein Objekt <code>buch</code> mit <code>titel: \"Krabat\"</code> und <code>seiten: 320</code>. Hole <code>titel</code> per Destructuring in eine Variable und gib sie aus.",
            en: "Create an object <code>buch</code> with <code>titel: \"Krabat\"</code> and <code>seiten: 320</code>. Pull out <code>titel</code> using destructuring and print it.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Krabat"] }],
          xp: 20,
        },
      ],
    },
    {
      id: "strings-fehler",
      title: { de: "Strings & Fehler", en: "Strings & Errors" },
      lessons: [
        {
          id: "string-methods",
          title: { de: "String-Methoden", en: "String methods" },
          explanation: {
            de: "Strings haben nützliche Methoden: <code>.toUpperCase()</code> (Großbuchstaben), <code>.slice(start, ende)</code> (Ausschnitt), <code>.length</code> (Länge), <code>.trim()</code> (Leerzeichen entfernen).",
            en: "Strings have useful methods: <code>.toUpperCase()</code> (uppercase), <code>.slice(start, end)</code> (substring), <code>.length</code> (length), <code>.trim()</code> (remove whitespace).",
          },
          example: "let text = \"Hallo Welt\";\nconsole.log(text.toUpperCase());\nconsole.log(text.slice(0, 5));",
          task: {
            de: "Erstelle eine Variable <code>wort</code> mit dem Wert <code>\"javascript\"</code> und gib sie mit <code>.toUpperCase()</code> in Großbuchstaben aus.",
            en: "Create a variable <code>wort</code> with the value <code>\"javascript\"</code> and print it in uppercase using <code>.toUpperCase()</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["JAVASCRIPT"] }],
          xp: 15,
        },
        {
          id: "try-catch-basics",
          title: { de: "try / catch", en: "try / catch" },
          explanation: {
            de: "Mit <code>try { ... } catch (fehler) { ... }</code> fängst du Fehler ab, statt dass dein Programm abstürzt. Der <code>catch</code>-Block läuft nur, wenn im <code>try</code>-Block ein Fehler auftritt.",
            en: "With <code>try { ... } catch (error) { ... }</code> you catch errors instead of letting your program crash. The <code>catch</code> block only runs if an error occurs inside <code>try</code>.",
          },
          example: "try {\n  let ergebnis = 10 / 0;\n  JSON.parse(\"kein json\");\n} catch (fehler) {\n  console.log(\"Fehler abgefangen\");\n}",
          task: {
            de: "Schreibe einen <code>try</code>-Block, der <code>JSON.parse(\"ungueltig\")</code> aufruft (das wirft einen Fehler). Gib im <code>catch</code>-Block <code>\"Fehler abgefangen\"</code> aus.",
            en: "Write a <code>try</code> block that calls <code>JSON.parse(\"ungueltig\")</code> (this throws an error). In the <code>catch</code> block, print <code>\"Fehler abgefangen\"</code>.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Fehler abgefangen"] }],
          xp: 25,
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
        {
          id: "event-listener-sim",
          title: { de: "Event-Listener simulieren", en: "Simulating event listeners" },
          explanation: {
            de: "Echte Events kommen von <code>element.addEventListener(\"click\", funktion)</code>. Wir simulieren das hier mit einem einfachen Objekt, das eine Callback-Funktion speichert und später selbst aufruft.",
            en: "Real events come from <code>element.addEventListener(\"click\", function)</code>. Here we simulate it with a simple object that stores a callback function and calls it later.",
          },
          example: "let button = { onClick: null };\nbutton.onClick = () => console.log(\"Geklickt!\");\nbutton.onClick();",
          task: {
            de: "Erstelle ein Objekt <code>knopf</code> mit der Eigenschaft <code>onClick: null</code>. Setze <code>onClick</code> auf eine Funktion, die <code>\"Knopf gedrückt\"</code> ausgibt, und rufe sie danach auf.",
            en: "Create an object <code>knopf</code> with property <code>onClick: null</code>. Set <code>onClick</code> to a function that prints <code>\"Knopf gedrückt\"</code>, then call it.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [{ type: "output", expected: ["Knopf gedrückt"] }],
          xp: 25,
        },
        {
          id: "form-validation-sim",
          title: { de: "Formular-Validierung simulieren", en: "Simulating form validation" },
          explanation: {
            de: "Bevor ein Formular abgeschickt wird, prüft JavaScript oft die Eingaben. Hier simulieren wir das mit einer Funktion, die eine Eingabe prüft und <code>true</code> oder <code>false</code> zurückgibt.",
            en: "Before a form is submitted, JavaScript often checks the input. Here we simulate that with a function that checks an input and returns <code>true</code> or <code>false</code>.",
          },
          example: "function istGueltig(eingabe) {\n  return eingabe.length >= 3;\n}\nconsole.log(istGueltig(\"ab\"));\nconsole.log(istGueltig(\"abc\"));",
          task: {
            de: "Schreibe eine Funktion <code>istGueltigeEmail(text)</code>, die prüft, ob <code>text</code> ein <code>@</code>-Zeichen enthält (nutze <code>.includes(\"@\")</code>). Rufe sie mit <code>\"test@beispiel.de\"</code> auf und gib das Ergebnis aus.",
            en: "Write a function <code>istGueltigeEmail(text)</code> that checks whether <code>text</code> contains an <code>@</code> character (use <code>.includes(\"@\")</code>). Call it with <code>\"test@beispiel.de\"</code> and print the result.",
          },
          starterCode: { de: "// dein Code hier\n", en: "// your code here\n" },
          tests: [
            { type: "assert", code: "typeof istGueltigeEmail === 'function' && istGueltigeEmail('test@beispiel.de') === true && istGueltigeEmail('keinemail') === false" },
            { type: "output", expected: ["true"] },
          ],
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
