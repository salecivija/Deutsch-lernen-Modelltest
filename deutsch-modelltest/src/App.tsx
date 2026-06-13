import { useMemo, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { modelTests } from './data/modelTests'
import type { LibraryLevel, ModelTest, Option } from './types'

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
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 900 }}>
              Deutsch lernen
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: 38, md: 52 }, lineHeight: 1.04 }}>
              Modelltest-Bibliothek
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 850, fontSize: 18 }}>
              Eine wachsende Sammlung interaktiver Modelltests für Deutschprüfungen. Wählen Sie zuerst ein Niveau aus.
              Danach können Sie passende Modelltests und Übungstests öffnen.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 3, flexWrap: 'wrap' }}>
              <Chip label={`${modelTests.length} Modelltests geplant`} variant="outlined" />
              <Chip label={`${available} sofort verfügbar`} variant="outlined" />
              <Chip label="A1 bis B2 vorbereitet" variant="outlined" />
            </Stack>
          </Box>

          {!selectedLevel && (
            <Grid container spacing={2} aria-label="Niveaus">
              {levels.map((level) => {
                const count = modelTests.filter((test) => test.libraryLevel === level).length
                const ready = modelTests.filter((test) => test.libraryLevel === level && test.status === 'available').length
                return (
                  <Grid key={level} size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card variant="outlined" sx={{ height: '100%', bgcolor: 'background.paper' }}>
                      <CardActionArea onClick={() => onSelectLevel(level)} sx={{ height: '100%', p: 3 }}>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: 'grid',
                              placeItems: 'center',
                              width: 58,
                              height: 58,
                              borderRadius: '50%',
                              bgcolor: '#d9f99d',
                              color: '#14532d',
                              fontWeight: 900,
                              fontSize: 22,
                            }}
                          >
                            {level}
                          </Box>
                          <Typography variant="h5" sx={{ fontWeight: 900 }}>
                            Niveau {level}
                          </Typography>
                          <Typography color="text.secondary">
                            {count > 0 ? `${count} Tests, ${ready} verfügbar` : 'In Vorbereitung'}
                          </Typography>
                        </Stack>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          )}

          {selectedLevel && (
            <Stack spacing={2}>
              <Box>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => onSelectLevel(null)}
                    sx={{ borderRadius: 999, bgcolor: alpha('#2196f3', 0.08) }}
                  >
                    Zurück zu den Niveaus
                  </Button>
                  <Typography
                    variant="h5"
                    color="primary.dark"
                    sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0 }}
                  >
                    Niveau {selectedLevel}
                  </Typography>
                </Stack>
                <Typography variant="h2" sx={{ fontSize: { xs: 32, md: 40 } }}>
                  {selectedLevel} Modelltests
                </Typography>
              </Box>

              {testsForLevel.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper', maxWidth: 680 }}>
                  <Typography variant="h6">Dieses Niveau ist vorbereitet.</Typography>
                  <Typography color="text.secondary">
                    Materialien, Audiodateien und Lösungsschlüssel können später ergänzt werden.
                  </Typography>
                </Paper>
              ) : (
                <Grid container spacing={2.5} aria-label={`${selectedLevel} Modelltests`}>
                  {testsForLevel.map((test) => (
                    <Grid key={test.id} size={{ xs: 12, md: 6, lg: 4 }}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: '100%',
                          minHeight: 460,
                          bgcolor: '#f8fbff',
                          borderColor: '#e5edf6',
                          borderRadius: 3,
                        }}
                      >
                        <CardContent sx={{ height: '100%', p: 3.5 }}>
                          <Stack spacing={2.5} sx={{ height: '100%' }}>
                            <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                              <Box sx={{ position: 'relative', width: 154, flex: '0 0 154px' }}>
                                <Chip
                                  label={test.libraryLevel}
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: -16,
                                    left: 0,
                                    zIndex: 1,
                                    bgcolor: '#d9f99d',
                                    color: '#14532d',
                                    fontWeight: 900,
                                  }}
                                />
                                {test.coverImage ? (
                                  <Box
                                    component="img"
                                    src={assetUrl(test.coverImage)}
                                    alt={`${test.cardTitle} Titelbild`}
                                    sx={{ width: 154, height: 218, objectFit: 'cover', display: 'block' }}
                                  />
                                ) : (
                                  <Box sx={{ width: 154, height: 218, display: 'grid', placeItems: 'center', bgcolor: '#e8f2ff' }}>
                                    {test.libraryLevel}
                                  </Box>
                                )}
                              </Box>
                              <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="h6" color={test.status === 'available' ? 'primary.dark' : 'text.primary'}>
                                  {test.cardTitle}
                                </Typography>
                                <Button
                                  variant="text"
                                  color="primary"
                                  endIcon={<ArrowForwardIosIcon />}
                                  disabled={test.status !== 'available'}
                                  onClick={() => onOpen(test)}
                                  sx={{ alignSelf: 'flex-start' }}
                                >
                                  Öffnen
                                </Button>
                              </Stack>
                            </Stack>
                            <Typography sx={{ fontSize: 18, lineHeight: 1.65 }}>{test.description}</Typography>
                            <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 'auto', flexWrap: 'wrap' }}>
                              {test.tags.map((tag) => (
                                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: '#eef6ff', color: 'primary.dark', fontWeight: 800 }} />
                              ))}
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
      <SourceFooter />
    </Box>
  )
}

function TestRunner({ test, onBack }: { test: ModelTest; onBack: () => void }) {
  const [activeSectionId, setActiveSectionId] = useState(test.sections[0]?.id ?? '')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<Record<number, Option[]>>(() => makeOrder(test))
  const [checked, setChecked] = useState(false)
  const [writing, setWriting] = useState('')
  const [writingText, setWritingText] = useState('')
  const [speaking, setSpeaking] = useState('')

  const stats = useMemo(() => {
    const correctQuestions = test.questions.filter((question) => answers[question.id] === question.answer)
    const points = correctQuestions.reduce((total, question) => total + (question.points ?? 1), 0)
    return { correct: correctQuestions.length, points, answered: Object.keys(answers).length }
  }, [answers, test.questions])

  const reset = () => {
    setAnswers({})
    setOrder(makeOrder(test))
    setChecked(false)
    setWriting('')
    setWritingText('')
    setSpeaking('')
  }

  const active = test.sections.find((section) => section.id === activeSectionId) ?? test.sections[0]
  const sectionQuestions = test.questions.filter((question) => question.section === active.id)
  const hasInteractiveQuestions = test.questions.length > 0
  const scoreMode = test.scoreMode ?? 'points'
  const totalPoints = test.thresholds.readingListening.total
  const totalQuestionCount = test.questions.length
  const wrongAfterCheck = totalQuestionCount - stats.correct
  const percentAfterCheck = Math.round((stats.points / totalPoints) * 100)
  const activeSectionPoints = sectionQuestions
    .filter((question) => answers[question.id] === question.answer)
    .reduce((total, question) => total + (question.points ?? 1), 0)
  const activeSectionCorrectCount = sectionQuestions.filter((question) => answers[question.id] === question.answer).length
  const activeSectionAnsweredCount = sectionQuestions.filter((question) => answers[question.id]).length
  const activeSectionWrongCount = sectionQuestions.length - activeSectionCorrectCount
  const activeSectionScore = checked ? activeSectionPoints : 0
  const activeSectionTotal = sectionQuestions.reduce((total, question) => total + (question.points ?? 1), 0)
  const displayedCorrect = checked ? stats.correct : 0
  const displayedWrong = checked ? wrongAfterCheck : 0
  const displayedPoints = checked ? stats.points : 0
  const displayedPercent = checked ? percentAfterCheck : 0
  const hasManualScore = Boolean(test.thresholds.writing || test.thresholds.speaking)
  const passLabel = hasManualScore ? 'B1' : 'Bestanden'
  const failLabel = hasManualScore ? 'unter B1' : 'Nicht bestanden'
  const writingScore = Number(writing)
  const speakingScore = Number(speaking)
  const hasWriting = writing.trim() !== '' && !Number.isNaN(writingScore)
  const hasSpeaking = speaking.trim() !== '' && !Number.isNaN(speakingScore)
  const listeningReadingPassed = stats.points >= test.thresholds.readingListening.pass
  const scoreCards =
    scoreMode === 'count'
      ? [
          [`${checked ? activeSectionCorrectCount : 0}`, 'richtig'],
          [`${checked ? activeSectionWrongCount : 0}`, 'falsch / leer'],
          [`${activeSectionAnsweredCount}/${sectionQuestions.length}`, 'beantwortet'],
          [`${sectionQuestions.length}`, 'Fragen in diesem Test'],
          [checked ? 'Ausgewertet' : 'Offen', 'Status'],
        ]
      : [
          [`${displayedPoints}`, `/${totalPoints} Punkte`],
          [`${displayedPercent}`, '/100 Prozent'],
          [`${displayedCorrect}`, 'richtig'],
          [`${displayedWrong}`, 'falsch / leer'],
          [
            checked ? (listeningReadingPassed ? passLabel : failLabel) : `${stats.answered}/${totalQuestionCount}`,
            checked ? `${active.title}: ${activeSectionScore}/${activeSectionTotal}` : 'beantwortet',
          ],
        ]
  const writingPassed = hasWriting && writingScore >= (test.thresholds.writing?.pass ?? Number.POSITIVE_INFINITY)
  const speakingPassed = hasSpeaking && speakingScore >= (test.thresholds.speaking?.pass ?? Number.POSITIVE_INFINITY)
  const fullDecision = hasWriting && hasSpeaking ? listeningReadingPassed && writingPassed && speakingPassed : null

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: alpha('#ffffff', 0.96) }}>
        <Toolbar sx={{ alignItems: 'stretch', flexDirection: 'column', gap: 1.25, py: 1.5 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
              alignItems: 'center',
              gap: 1.5,
              width: '100%',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={onBack}
              sx={{ borderRadius: 999, justifySelf: 'start', bgcolor: alpha('#2196f3', 0.08) }}
            >
              Zurück zur Testauswahl
            </Button>

            <Typography
              variant="h5"
              color="primary.dark"
              sx={{
                justifySelf: 'center',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {test.exam} · Niveau {test.level}
            </Typography>

            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              {test.assets.map((asset) => (
                <Button key={asset.path} component="a" href={assetUrl(asset.path)} target="_blank" rel="noreferrer" variant="outlined">
                  {asset.label}
                </Button>
              ))}
              <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={reset}>
                Zurücksetzen
              </Button>
              {hasInteractiveQuestions && (
                <Button variant="contained" startIcon={<CheckCircleOutlinedIcon />} onClick={() => setChecked(true)}>
                  Auswerten
                </Button>
              )}
            </Stack>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 34 } }}>
            {test.title}
          </Typography>
        </Toolbar>
      </AppBar>

      {hasInteractiveQuestions ? (
        <Grid container columns={5} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          {scoreCards.map(([value, label]) => (
            <Grid key={`${value}-${label}`} size={{ xs: 5, sm: 1 }} sx={{ p: 2.5, borderRight: { sm: 1 }, borderColor: 'divider' }}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper square variant="outlined" sx={{ p: 2.5, borderX: 0 }}>
          <Typography color="primary" sx={{ fontWeight: 900 }}>
            Materialansicht
          </Typography>
          <Typography color="text.secondary">
            Dieser Test ist mit PDF, Antwortbogen und Audio verfügbar. Die interaktiven Antwortfelder werden nach der Digitalisierung ergänzt.
          </Typography>
        </Paper>
      )}

      <Box sx={{ position: 'sticky', top: { xs: 155, md: 105 }, zIndex: 10, bgcolor: '#eef6ff', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={active.id}
          onChange={(_, value: string) => setActiveSectionId(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Prüfungsteile"
          sx={{ px: { xs: 1, md: 3 } }}
        >
          {test.sections.map((section) => (
            <Tab key={section.id} value={section.id} label={section.title} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={2.5} sx={{ p: { xs: 2, md: 3.5 }, alignItems: 'flex-start' }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper
            variant="outlined"
            sx={{
              position: { lg: 'sticky' },
              top: 170,
              maxHeight: { lg: 'calc(100vh - 190px)' },
              overflow: 'auto',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">{active.title}</Typography>
              <Typography color="text.secondary">
                {active.skill} · {active.time}
              </Typography>
            </Box>
            {active.audio && (
              <Box sx={{ px: 2, pt: 2 }}>
                <Box component="audio" controls src={assetUrl(`${test.webAssetBase}/audio/${active.audio}`)} sx={{ width: '100%' }} />
              </Box>
            )}
            <Stack spacing={2} sx={{ p: 2 }}>
              {active.pages.map((page) => (
                <Box
                  key={page}
                  component="img"
                  src={assetUrl(`${test.webAssetBase}/pages/test-page-${String(page).padStart(2, '0')}.png`)}
                  alt={`Originale PDF-Seite ${page}`}
                  sx={{ width: '100%', border: 1, borderColor: 'divider', bgcolor: '#ffffff' }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={2}>
            {!hasInteractiveQuestions && (
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6">Interaktive Aufgaben folgen</Typography>
                <Typography color="text.secondary">
                  Die Originalseiten und Audiodateien sind bereits eingebunden. Fragen, Antwortoptionen und Lösungsschlüssel
                  werden im nächsten Schritt aus dem Testmaterial in die Datenstruktur übertragen.
                </Typography>
              </Paper>
            )}

            {sectionQuestions.map((question) => {
              const selected = answers[question.id]
              const isCorrect = selected === question.answer
              const resultLabel = !selected ? 'nicht beantwortet' : isCorrect ? 'richtig' : 'falsch'
              const useCompactOptions = question.section === 'lesen-2' && order[question.id].length > 3
              return (
                <Paper
                  key={question.id}
                  variant="outlined"
                  sx={{
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    borderColor: checked ? (isCorrect ? 'success.main' : 'error.main') : 'divider',
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Chip label={question.displayId ?? question.id} sx={{ fontWeight: 900 }} />
                    <Typography sx={{ flex: 1, pt: 0.5, fontWeight: 900 }}>
                      {question.prompt}
                    </Typography>
                    {checked && <Chip label={resultLabel} color={isCorrect ? 'success' : selected ? 'error' : 'default'} size="small" />}
                  </Stack>
                  <ToggleButtonGroup
                    exclusive
                    value={selected ?? null}
                    onChange={(_, value: string | null) => {
                      if (!value) return
                      setAnswers((current) => ({ ...current, [question.id]: value }))
                      setChecked(false)
                    }}
                    orientation={useCompactOptions ? undefined : 'vertical'}
                    fullWidth
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: useCompactOptions ? { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' } : '1fr',
                      p: 2,
                      gap: 1,
                      '& .MuiToggleButtonGroup-grouped': {
                        width: '100%',
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: '8px !important',
                        margin: '0 !important',
                      },
                    }}
                  >
                    {order[question.id].map((option, index) => {
                      const display = option.id === 'x' ? 'x' : String.fromCharCode(97 + index)
                      return (
                        <ToggleButton key={`${question.id}-${option.id}`} value={option.id} sx={{ justifyContent: 'flex-start', gap: 2, py: 1.2 }}>
                          <Chip label={display} size="small" color={selected === option.id ? 'primary' : 'default'} sx={{ fontWeight: 900 }} />
                          <Typography component="span" sx={{ textAlign: 'left' }}>
                            {option.text}
                          </Typography>
                        </ToggleButton>
                      )
                    })}
                  </ToggleButtonGroup>
                </Paper>
              )
            })}

            {active.id === 'schreiben' && (
              <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.paper' }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Schreiben</Typography>
                    <Typography color="text.secondary">
                      Schreiben Sie Ihre Antwort hier direkt neben der Aufgabenstellung.
                    </Typography>
                  </Box>
                  <TextField
                    label="Text schreiben"
                    value={writingText}
                    onChange={(event) => setWritingText(event.target.value)}
                    multiline
                    minRows={22}
                    fullWidth
                    placeholder="Beginnen Sie hier mit Ihrem Text..."
                    slotProps={{
                      input: {
                        sx: {
                          alignItems: 'flex-start',
                          fontSize: 18,
                          lineHeight: 1.65,
                          minHeight: { xs: 520, md: 680 },
                        },
                      },
                    }}
                  />
                </Stack>
              </Paper>
            )}

            {hasInteractiveQuestions && hasManualScore && (
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Schreiben und Sprechen</Typography>
                    <Typography color="text.secondary">
                      Diese Prüfungsteile werden nicht automatisch bewertet. Tragen Sie hier die Punkte nach der manuellen Bewertung ein.
                    </Typography>
                  </Box>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="Schreiben"
                      type="number"
                      value={writing}
                      onChange={(event) => setWriting(event.target.value)}
                      slotProps={{ htmlInput: { min: 0, max: test.thresholds.writing?.total ?? 20 } }}
                      helperText={`/${test.thresholds.writing?.total ?? 20}`}
                    />
                    <TextField
                      label="Sprechen"
                      type="number"
                      value={speaking}
                      onChange={(event) => setSpeaking(event.target.value)}
                      slotProps={{ htmlInput: { min: 0, max: test.thresholds.speaking?.total ?? 100 } }}
                      helperText={`/${test.thresholds.speaking?.total ?? 100}`}
                    />
                  </Stack>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: alpha('#2196f3', 0.07) }}>
                    <Typography sx={{ fontWeight: 900 }}>
                      {fullDecision === null
                        ? `Automatische Auswertung: ${checked ? (listeningReadingPassed ? 'B1 erreicht' : 'B1 nicht erreicht') : 'noch nicht ausgewertet'}`
                        : fullDecision
                          ? 'Bestanden: Die B1-Schwelle ist in allen Teilen erreicht.'
                          : 'Nicht bestanden: Mindestens ein Teil liegt unter der B1-Schwelle.'}
                    </Typography>
                  </Paper>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Grid>
      </Grid>

      <SourceFooter />
    </Box>
  )
}

function SourceFooter() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Typography color="text.secondary">
        Materialien und Originalvorlagen stammen von{' '}
        <Link href={materialSource} target="_blank" rel="noreferrer">
          sprachportal.at/lernmaterial
        </Link>
        .
      </Typography>
    </Box>
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
