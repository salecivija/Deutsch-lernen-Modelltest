import { useMemo, useState } from 'react'
import { modelTests } from './data/modelTests'
import type { LibraryLevel, ModelTest, Option } from './types'
import './App.css'

const baseUrl = import.meta.env.BASE_URL
const materialSource = 'https://sprachportal.at/lernmaterial/'

const assetUrl = (path: string) => `${baseUrl}${path}`.replace(/([^:]\/)\/+/g, '$1')

const shuffle = <T,>(items: T[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const makeOrder = (test: ModelTest) =>
  Object.fromEntries(test.questions.map((question) => [question.id, question.shuffle ? shuffle(question.options) : question.options]))

const levels: LibraryLevel[] = ['A1', 'A2', 'B1', 'B2']

function LibraryView({
  selectedLevel,
  onSelectLevel,
  onOpen,
}: {
  selectedLevel: LibraryLevel | null
  onSelectLevel: (level: LibraryLevel | null) => void
  onOpen: (test: ModelTest) => void
}) {
  const available = modelTests.filter((test) => test.status === 'available').length
  const testsForLevel = selectedLevel
    ? modelTests.filter((test) => test.libraryLevel === selectedLevel).sort((a, b) => a.order - b.order)
    : []

  return (
    <main className="library-shell">
      <section className="library-hero">
        <p className="eyebrow">Deutsch lernen</p>
        <h1>Modelltest-Bibliothek</h1>
        <p>
          Eine wachsende Sammlung interaktiver Modelltests für Deutschprüfungen.
          Wählen Sie zuerst ein Niveau aus. Danach können Sie passende Modelltests und Übungstests öffnen.
        </p>
        <div className="library-stats">
          <span>{modelTests.length} Modelltests geplant</span>
          <span>{available} sofort verfügbar</span>
          <span>A1 bis B2 vorbereitet</span>
        </div>
      </section>

      {!selectedLevel && (
        <section className="level-grid" aria-label="Niveaus">
          {levels.map((level) => {
            const count = modelTests.filter((test) => test.libraryLevel === level).length
            const ready = modelTests.filter((test) => test.libraryLevel === level && test.status === 'available').length
            return (
              <button type="button" className="level-card" key={level} onClick={() => onSelectLevel(level)}>
                <span>{level}</span>
                <strong>Niveau {level}</strong>
                <em>{count > 0 ? `${count} Tests, ${ready} verfügbar` : 'In Vorbereitung'}</em>
              </button>
            )
          })}
        </section>
      )}

      {selectedLevel && (
        <section className="level-section">
          <div className="level-head">
            <button type="button" className="back-button" onClick={() => onSelectLevel(null)}>
              <span aria-hidden="true"></span>
              Zurück zu den Niveaus
            </button>
            <div>
              <p className="eyebrow">Niveau {selectedLevel}</p>
              <h2>{selectedLevel} Modelltests</h2>
            </div>
          </div>

          {testsForLevel.length === 0 ? (
            <div className="empty-level">
              <h3>Dieses Niveau ist vorbereitet.</h3>
              <p>Materialien, Audiodateien und Lösungsschlüssel können später ergänzt werden.</p>
            </div>
          ) : (
            <div className="portal-grid" aria-label={`${selectedLevel} Modelltests`}>
              {testsForLevel.map((test) => (
                <article className={`portal-card ${test.status}`} key={test.id}>
                  <div className="portal-card-main">
                    <div className="cover-wrap">
                      <span className="level-badge">{test.libraryLevel}</span>
                      {test.coverImage ? (
                        <img src={assetUrl(test.coverImage)} alt={`${test.cardTitle} Titelbild`} />
                      ) : (
                        <div className="cover-placeholder">{test.libraryLevel}</div>
                      )}
                    </div>
                    <div className="portal-card-content">
                      <h3>{test.cardTitle}</h3>
                    </div>
                    <button
                      type="button"
                      className="arrow-button"
                      disabled={test.status !== 'available'}
                      onClick={() => onOpen(test)}
                      aria-label={`${test.cardTitle} öffnen`}
                    >
                      ›
                    </button>
                  </div>
                  <p>{test.description}</p>
                  <div className="tag-list" aria-label="Kategorien">
                    {test.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <SourceFooter />
    </main>
  )
}

function TestRunner({ test, onBack }: { test: ModelTest; onBack: () => void }) {
  const [activeSectionId, setActiveSectionId] = useState(test.sections[0]?.id ?? '')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<Record<number, Option[]>>(() => makeOrder(test))
  const [checked, setChecked] = useState(false)
  const [writing, setWriting] = useState('')
  const [speaking, setSpeaking] = useState('')

  const stats = useMemo(() => {
    const correct = test.questions.filter((question) => answers[question.id] === question.answer).length
    const listening = test.questions.filter((question) => question.section.startsWith('hoeren') && answers[question.id] === question.answer).length
    const reading = test.questions.filter((question) => question.section.startsWith('lesen') && answers[question.id] === question.answer).length
    return { correct, listening, reading, answered: Object.keys(answers).length }
  }, [answers, test.questions])

  const reset = () => {
    setAnswers({})
    setOrder(makeOrder(test))
    setChecked(false)
    setWriting('')
    setSpeaking('')
  }

  const active = test.sections.find((section) => section.id === activeSectionId) ?? test.sections[0]
  const sectionQuestions = test.questions.filter((question) => question.section === active.id)
  const hasInteractiveQuestions = test.questions.length > 0
  const totalQuestions = test.thresholds.readingListening.total
  const wrongAfterCheck = totalQuestions - stats.correct
  const percentAfterCheck = Math.round((stats.correct / totalQuestions) * 100)
  const activeSectionCorrect = sectionQuestions.filter((question) => answers[question.id] === question.answer).length
  const activeSectionScore = checked ? activeSectionCorrect : 0
  const displayedCorrect = checked ? stats.correct : 0
  const displayedWrong = checked ? wrongAfterCheck : 0
  const displayedPoints = checked ? stats.correct : 0
  const displayedPercent = checked ? percentAfterCheck : 0
  const writingScore = Number(writing)
  const speakingScore = Number(speaking)
  const hasWriting = writing.trim() !== '' && !Number.isNaN(writingScore)
  const hasSpeaking = speaking.trim() !== '' && !Number.isNaN(speakingScore)
  const listeningReadingPassed = stats.correct >= test.thresholds.readingListening.pass
  const writingPassed = hasWriting && writingScore >= (test.thresholds.writing?.pass ?? Number.POSITIVE_INFINITY)
  const speakingPassed = hasSpeaking && speakingScore >= (test.thresholds.speaking?.pass ?? Number.POSITIVE_INFINITY)
  const fullDecision = hasWriting && hasSpeaking ? listeningReadingPassed && writingPassed && speakingPassed : null

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <button type="button" className="back-button top-back" onClick={onBack}>
            <span aria-hidden="true"></span>
            Zurück zur Testauswahl
          </button>
          <p className="eyebrow">{test.exam} · Niveau {test.level}</p>
          <h1>{test.title}</h1>
        </div>
        <div className="actions">
          {test.assets.map((asset) => (
            <a key={asset.path} href={assetUrl(asset.path)} target="_blank" rel="noreferrer">{asset.label}</a>
          ))}
          <button type="button" onClick={reset}>Zurücksetzen</button>
          {hasInteractiveQuestions && (
            <button type="button" className="primary" onClick={() => setChecked(true)}>Auswerten</button>
          )}
        </div>
      </header>

      {hasInteractiveQuestions ? (
        <section className="score-strip" aria-label="Punktestand">
          <div><span>{displayedPoints}</span><small>/{totalQuestions} Punkte</small></div>
          <div><span>{displayedPercent}</span><small>/100 Prozent</small></div>
          <div><span>{displayedCorrect}</span><small>richtig</small></div>
          <div><span>{displayedWrong}</span><small>falsch / leer</small></div>
          <div className={checked ? (listeningReadingPassed ? 'pass' : 'fail') : ''}>
            <span>{checked ? (listeningReadingPassed ? 'B1' : 'unter B1') : `${stats.answered}/${totalQuestions}`}</span>
            <small>{checked ? `${active.title}: ${activeSectionScore}/${sectionQuestions.length}` : 'beantwortet'}</small>
          </div>
        </section>
      ) : (
        <section className="material-strip" aria-label="Materialstatus">
          <strong>Materialansicht</strong>
          <span>Dieser Test ist mit PDF, Antwortbogen und Audio verfügbar. Die interaktiven Antwortfelder werden nach der Digitalisierung ergänzt.</span>
        </section>
      )}

      <nav className="section-tabs" aria-label="Prüfungsteile">
        {test.sections.map((section) => (
          <button
            type="button"
            key={section.id}
            className={section.id === active.id ? 'active' : ''}
            onClick={() => setActiveSectionId(section.id)}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <div className="workarea">
        <aside className="source-pane">
          <div className="source-head">
            <div>
              <h2>{active.title}</h2>
              <p>{active.skill} · {active.time}</p>
            </div>
          </div>
          {active.audio && <audio controls src={assetUrl(`${test.webAssetBase}/audio/${active.audio}`)} />}
          <div className="page-stack">
            {active.pages.map((page) => (
              <img
                key={page}
                src={assetUrl(`${test.webAssetBase}/pages/test-page-${String(page).padStart(2, '0')}.png`)}
                alt={`Originale PDF-Seite ${page}`}
              />
            ))}
          </div>
        </aside>

        <section className="answer-pane">
          {!hasInteractiveQuestions && (
            <section className="material-note">
              <h2>Interaktive Aufgaben folgen</h2>
              <p>
                Die Originalseiten und Audiodateien sind bereits eingebunden. Fragen, Antwortoptionen und Lösungsschlüssel
                werden im nächsten Schritt aus dem Testmaterial in die Datenstruktur übertragen.
              </p>
            </section>
          )}

          {sectionQuestions.map((question) => {
            const selected = answers[question.id]
            const isCorrect = selected === question.answer
            const resultLabel = !selected ? 'nicht beantwortet' : isCorrect ? 'richtig' : 'falsch'
            return (
              <article className={`question ${checked ? (isCorrect ? 'correct' : 'wrong') : ''}`} key={question.id}>
                <div className="question-head">
                  <strong>{question.id}</strong>
                  <p>{question.prompt}</p>
                  {checked && <span>{resultLabel}</span>}
                </div>
                <div className="options">
                  {order[question.id].map((option, index) => {
                    const display = option.id === 'x' ? 'x' : String.fromCharCode(97 + index)
                    return (
                      <label key={`${question.id}-${option.id}`} className={selected === option.id ? 'selected' : ''}>
                        <input
                          type="radio"
                          name={`q-${question.id}`}
                          checked={selected === option.id}
                          onChange={() => {
                            setAnswers((current) => ({ ...current, [question.id]: option.id }))
                            setChecked(false)
                          }}
                        />
                        <span>{display}</span>
                        <em>{option.text}</em>
                      </label>
                    )
                  })}
                </div>
              </article>
            )
          })}

          {hasInteractiveQuestions && <section className="manual-score">
            <h2>Schreiben und Sprechen</h2>
            <p>
              Diese Prüfungsteile werden nicht automatisch bewertet. Tragen Sie hier die Punkte nach der manuellen Bewertung ein.
            </p>
            <label>
              Schreiben
              <input type="number" min="0" max={test.thresholds.writing?.total ?? 20} value={writing} onChange={(event) => setWriting(event.target.value)} />
              <span>/{test.thresholds.writing?.total ?? 20}</span>
            </label>
            <label>
              Sprechen
              <input type="number" min="0" max={test.thresholds.speaking?.total ?? 100} value={speaking} onChange={(event) => setSpeaking(event.target.value)} />
              <span>/{test.thresholds.speaking?.total ?? 100}</span>
            </label>
            <div className="decision">
              {fullDecision === null
                ? `Automatische Auswertung: ${checked ? (listeningReadingPassed ? 'B1 erreicht' : 'B1 nicht erreicht') : 'noch nicht ausgewertet'}`
                : fullDecision
                  ? 'Bestanden: Die B1-Schwelle ist in allen Teilen erreicht.'
                  : 'Nicht bestanden: Mindestens ein Teil liegt unter der B1-Schwelle.'}
            </div>
          </section>}
        </section>
      </div>

      <SourceFooter />
    </main>
  )
}

function SourceFooter() {
  return (
    <footer className="source-footer">
      <p>
        Materialien und Originalvorlagen stammen von{' '}
        <a href={materialSource} target="_blank" rel="noreferrer">sprachportal.at/lernmaterial</a>.
      </p>
    </footer>
  )
}

function App() {
  const [activeTest, setActiveTest] = useState<ModelTest | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<LibraryLevel | null>(null)

  if (!activeTest) {
    return <LibraryView selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} onOpen={setActiveTest} />
  }

  return <TestRunner test={activeTest} onBack={() => setActiveTest(null)} />
}

export default App
