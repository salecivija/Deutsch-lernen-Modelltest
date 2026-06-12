# Deutsch Modelltest Webapp

React/Vite/TypeScript application with Material UI for the Deutsch lernen Modelltest library.

## Deutsch

Diese App ist die einzige Weboberfläche im Projekt. Neue Tests werden über Daten und Assets ergänzt, nicht durch weitere Apps. Die Oberfläche nutzt Material UI als React-Komponenten- und Theme-System.

### Funktionen

- Auswahl nach Niveau: A1, A2, B1, B2
- Material UI Theme, Komponenten, Buttons, Tabs, Cards und Eingabefelder
- Testauswahl innerhalb eines Niveaus
- Originale PDF-Seiten links, interaktive Antworten rechts
- Interaktiver B1-Test zu Werte- und Orientierungswissen mit gewichteter Bewertung
- Audio-Wiedergabe für Hörteile
- Automatische Auswertung für Hören und Lesen
- Punktestand, Prozent, richtige und falsche Antworten erst nach `Auswerten`
- Kein Anzeigen des Lösungsschlüssels in den Aufgaben
- Zurücksetzen mit neu gemischten Antwortoptionen

### Entwicklung

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Testdaten

Die kanonischen Materialien liegen außerhalb der App:

```text
../import/<NIVEAU>/test-<NUMMER>/
```

Die App lädt browserfähige Dateien aus:

```text
public/assets/tests/<NIVEAU>/test-<NUMMER>/
```

Die Testregistrierung liegt in:

```text
src/data/modelTests.ts
src/data/b1PracticeQuestions.ts
```

## English

This app is the single web interface in the project. New tests are added through data and assets, not through additional apps. The interface uses Material UI as the React component and theme system.

### Features

- Level selection: A1, A2, B1, B2
- Material UI theme, components, buttons, tabs, cards and input fields
- Test selection inside each level
- Original PDF pages on the left, interactive answers on the right
- Interactive B1 Werte- und Orientierungswissen test with weighted scoring
- Audio playback for listening sections
- Automatic scoring for listening and reading
- Points, percentage, correct and wrong answers shown only after `Auswerten`
- No answer key reveal inside the questions
- Reset with reshuffled answer options

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Test Data

Canonical materials live outside the app:

```text
../import/<LEVEL>/test-<NUMBER>/
```

The app loads browser-ready files from:

```text
public/assets/tests/<LEVEL>/test-<NUMBER>/
```

Test registration lives in:

```text
src/data/modelTests.ts
src/data/b1PracticeQuestions.ts
```
