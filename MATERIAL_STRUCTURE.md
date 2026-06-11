# Material and App Structure

There is one React web application:

```text
deutsch-modelltest/
```

All exam materials and test data are organized outside the app under:

```text
import/
  A1/
    test-1/
    test-2/
    test-3/
    test-4/
  A2/
  B1/
  B2/
```

Each test folder uses the same structure:

```text
import/<LEVEL>/test-<N>/
  raw/
  webapp-assets/
    audio/
    covers/
    pages/
    pdf/
  metadata/
```

## Folder Roles

- `raw/`: original downloaded or received files, such as PDF files, answer sheets and MP3 audio.
- `webapp-assets/`: processed files prepared for the web app, such as normalized audio filenames, cover images, rendered PDF pages and web-ready PDFs.
- `metadata/`: extracted text, answer keys, parsing output, notes and helper screenshots.

## Runtime Assets

The browser cannot load files directly from `import/`, so the web-ready files are copied into the app:

```text
deutsch-modelltest/public/assets/tests/<LEVEL>/test-<N>/
```

The React app reads from that `public/assets/tests/...` structure, but the canonical source remains `import/...`.

## Adding a New Test

1. Put original materials into `import/<LEVEL>/test-<N>/raw`.
2. Prepare web-ready files in `import/<LEVEL>/test-<N>/webapp-assets`.
3. Put extracted text, answer keys and notes into `import/<LEVEL>/test-<N>/metadata`.
4. Copy final web assets into `deutsch-modelltest/public/assets/tests/<LEVEL>/test-<N>`.
5. Add or update the matching entry in `deutsch-modelltest/src/data/modelTests.ts`.

