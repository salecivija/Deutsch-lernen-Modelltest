# Deutsch lernen Modelltest

Interaktive Modelltest-Bibliothek für Deutschprüfungen.

## Deutsch

Dieses Repository enthält eine einzige React/Vite/TypeScript-Webapp mit Material UI und eine strukturierte Materialsammlung für Deutsch-Modelltests. Die Tests werden nicht als einzelne Apps gebaut, sondern als Daten, Medien und Assets in die zentrale Anwendung eingebunden.

### Projektstruktur

```text
deutsch-modelltest/      React/Vite/TypeScript-Webapp mit Material UI
import/                  Rohmaterialien und vorbereitete Testdaten
MATERIAL_STRUCTURE.md    Details zur Materialstruktur
```

Die Materialien liegen unter:

```text
import/<NIVEAU>/test-<NUMMER>/
  raw/                   Originale PDF-, Audio- und Antwortdateien
  webapp-assets/         Vorbereitete Web-Dateien
    audio/
    covers/
    pages/
    pdf/
  metadata/              Extrahierter Text, Fragen, Lösungsschlüssel, Notizen
```

Die Webapp lädt zur Laufzeit nur Dateien aus:

```text
deutsch-modelltest/public/assets/tests/<NIVEAU>/test-<NUMMER>/
```

### Aktueller Stand

- B1 Werte- und Orientierungswissen ist interaktiv umgesetzt.
- B1 DTÖ Modelltest ist interaktiv umgesetzt.
- B1 DTÖ Übungstest 1, 2 und 3 sind interaktiv umgesetzt.
- Hören und Lesen werden automatisch ausgewertet.
- Schreiben und Sprechen bleiben manuelle Prüfungsteile.
- Antwortoptionen können beim Zurücksetzen neu gemischt werden.
- Ergebnisse werden erst nach `Auswerten` angezeigt.

### Quelle der Materialien

Die verwendeten Originalmaterialien stammen vom Sprachportal des Österreichischen Integrationsfonds:

https://sprachportal.at/lernmaterial/

Dieses Projekt ist eine Lern- und Übungsoberfläche. Die Originalmaterialien, Audiodateien und PDF-Vorlagen bleiben den jeweiligen Rechteinhabern zugeordnet.

## English

This repository contains a single React/Vite/TypeScript web app with Material UI and a structured material library for German model tests. Tests are not built as separate applications; they are added as data, media and assets to the central app.

### Project Structure

```text
deutsch-modelltest/      React/Vite/TypeScript web app with Material UI
import/                  Raw materials and prepared test data
MATERIAL_STRUCTURE.md    Details about the material structure
```

Materials are stored under:

```text
import/<LEVEL>/test-<NUMBER>/
  raw/                   Original PDF, audio and answer files
  webapp-assets/         Prepared web files
    audio/
    covers/
    pages/
    pdf/
  metadata/              Extracted text, questions, answer keys, notes
```

At runtime, the web app loads files from:

```text
deutsch-modelltest/public/assets/tests/<LEVEL>/test-<NUMBER>/
```

### Current State

- B1 Werte- und Orientierungswissen is implemented interactively.
- B1 DTÖ Modelltest is implemented interactively.
- B1 DTÖ Übungstest 1, 2 and 3 are implemented interactively.
- Listening and reading are scored automatically.
- Writing and speaking remain manually assessed sections.
- Answer options can be reshuffled with reset.
- Results are shown only after `Auswerten`.

### Material Source

The original materials come from the Sprachportal of the Austrian Integration Fund:

https://sprachportal.at/lernmaterial/

This project is a learning and practice interface. The original materials, audio files and PDF templates remain attributed to their respective rights holders.
