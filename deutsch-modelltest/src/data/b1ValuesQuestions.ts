import type { Question } from '../types'

const richtigFalsch = [
  { id: 'a', text: 'richtig' },
  { id: 'b', text: 'falsch' },
]

const choice = (items: string[]) => items.map((text, index) => ({ id: String.fromCharCode(97 + index), text }))

type RawQuestion = {
  prompt: string
  answer: string
  options: string[] | 'richtigFalsch'
}

const buildSet = (section: string, questions: RawQuestion[], idOffset: number): Question[] =>
  questions.map((question, index) => ({
    id: idOffset + index + 1,
    displayId: index + 1,
    section,
    prompt: question.prompt,
    answer: question.answer,
    options: question.options === 'richtigFalsch' ? richtigFalsch : choice(question.options),
    shuffle: question.options !== 'richtigFalsch',
  }))

const modelltest1: RawQuestion[] = [
  { prompt: 'In Österreich ist Gewalt gegen Frauen verboten.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich dürfen Männer und Frauen zur Wahl gehen.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich schreibt der Bundespräsident alle Gesetze.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'In öffentliche Schulen gehen Buben und Mädchen.', answer: 'a', options: 'richtigFalsch' },
  {
    prompt: 'Wenn man ein Fest in der Wohnung machen will, dann kann es laut werden. Man sollte deswegen vorher die Nachbarn und Nachbarinnen informieren.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  { prompt: 'Nach dem Zweiten Weltkrieg waren viele Städte in Österreich zerstört.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich darf ein Mann nicht mit einem Mann Sex haben.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'Das österreichische Gesundheitssystem wird mit Steuern und Abgaben finanziert.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Wenn ein Kind eine öffentliche Schule besucht, müssen die Eltern kein Schulgeld bezahlen.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich dürfen homosexuelle Männer oder Frauen ...', answer: 'c', options: ['keine Beziehung haben.', 'nicht heiraten.', 'heiraten.'] },
  {
    prompt: 'Eine Person hat in ihrem Heimatland einen Beruf gelernt. Darf sie in Österreich in diesem Beruf arbeiten?',
    answer: 'c',
    options: [
      'Ja, sie darf immer sofort in diesem Beruf arbeiten.',
      'Nein, sie darf nie in diesem Beruf arbeiten.',
      'Sie muss sich informieren. Viele Ausbildungen und Qualifikationen müssen in Österreich anerkannt werden.',
    ],
  },
  {
    prompt: 'Ein Arztbesuch kostet Patientinnen und Patienten in Österreich oft wenig oder gar nichts, wenn sie ...',
    answer: 'a',
    options: ['versichert sind und eine e-card haben.', 'die österreichische Staatsbürgerschaft haben.', 'schon 10 Jahre in Österreich gelebt haben.'],
  },
  { prompt: 'Wie oft kann man die Vorsorgeuntersuchung machen?', answer: 'a', options: ['Einmal im Jahr.', 'Einmal im Monat.', 'Einmal in der Woche.'] },
  {
    prompt: 'Von wann bis wann gab es in Österreich eine nationalsozialistische Diktatur?',
    answer: 'a',
    options: ['1938 bis 1945', '1938 bis 1955', '1940 bis 1948'],
  },
  {
    prompt: 'Woher kommt das Geld für das österreichische Sozialsystem?',
    answer: 'a',
    options: [
      'Von Menschen, die arbeiten und Steuern und Abgaben zahlen.',
      'Die Europäische Zentralbank bezahlt das österreichische Sozialsystem.',
      'Die UNO bezahlt das österreichische Sozialsystem.',
    ],
  },
  {
    prompt: 'Was versteht man unter Meinungsfreiheit?',
    answer: 'b',
    options: [
      'Ich darf alles sagen.',
      'Ich darf meine Meinung sagen, aber ich darf dabei die Rechte von einem anderen Menschen nicht verletzen.',
      'Ich darf nur sagen, was der Regierung gefällt.',
    ],
  },
  {
    prompt: 'Wer muss die österreichischen Gesetze befolgen?',
    answer: 'c',
    options: ['Nur österreichische Staatsbürgerinnen und Staatsbürger.', 'Nur Christinnen und Christen.', 'Alle Menschen, die in Österreich sind.'],
  },
  {
    prompt: 'Sie leben in einer Wohnung und wissen, dass es eine Hausordnung gibt. Wo können Sie die Hausordnung finden?',
    answer: 'b',
    options: ['Im Rathaus.', 'Bei der Hausverwaltung.', 'Bei der Meldebehörde.'],
  },
]

const modelltest2: RawQuestion[] = [
  { prompt: 'In Österreich darf jede Frau selbst entscheiden, wie viele Kinder sie möchte.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Wenn man einen anderen Menschen schlägt und verletzt, ist das Körperverletzung. Das ist in Österreich verboten.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich dürfen Buben und Mädchen die gleiche Schule besuchen.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Wenn man ein Fest in der Wohnung macht, muss man ab 22 Uhr leise sein.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich dürfen Männer und Frauen nur dann zusammenleben, wenn sie verheiratet sind.', answer: 'b', options: 'richtigFalsch' },
  {
    prompt: 'Der Staat kann die öffentlichen Schulen zahlen, weil der Staat von den Menschen, die in Österreich arbeiten, Steuern und Abgaben bekommt.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  {
    prompt: 'Die Notfallambulanz im Krankenhaus ist für Menschen da, die in Notsituationen sind und schnell Hilfe brauchen.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  {
    prompt: 'Eine Berufsausbildung aus einem anderen Land kann in Österreich gültig sein. Das muss aber vorher geprüft werden.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  { prompt: 'An einer österreichischen Schule kann eine Frau Direktorin oder ein Mann Direktor sein.', answer: 'a', options: 'richtigFalsch' },
  {
    prompt: 'Wer musste zusammenhelfen, damit sich die Wirtschaft in Österreich nach dem Zweiten Weltkrieg wieder erholen konnte?',
    answer: 'c',
    options: ['Nur Männer.', 'Nur Frauen.', 'Alle Menschen in Österreich.'],
  },
  {
    prompt: 'Wer finanziert das Arbeitslosengeld?',
    answer: 'c',
    options: ['Die EU.', 'Die UNO.', 'Menschen, die in Österreich arbeiten und Steuern und Abgaben zahlen.'],
  },
  { prompt: 'Wann war der Zweite Weltkrieg?', answer: 'a', options: ['1939 bis 1945', '1938 bis 1955', '1930 bis 1940'] },
  {
    prompt: 'In Österreich geht das Recht vom Volk aus. Was bedeutet das?',
    answer: 'a',
    options: ['Österreich ist eine Demokratie.', 'Österreich ist eine Diktatur.', 'Österreich ist eine absolute Monarchie.'],
  },
  {
    prompt: 'Eine Frau liebt eine Frau. Darf sie mit ihr zusammenleben?',
    answer: 'a',
    options: ['Ja, wenn sie das auch möchte.', 'Ja, wenn die Familie das erlaubt.', 'Nein, sie müssen vorher heiraten.'],
  },
  { prompt: 'Damit man Krankheiten früh bemerkt, ...', answer: 'b', options: ['macht man Sport.', 'geht man zur Vorsorgeuntersuchung.', 'isst man gesund.'] },
  {
    prompt: 'Ich möchte in meiner Wohnung laut Musik hören. Was könnte ein Problem sein?',
    answer: 'a',
    options: ['Ich könnte die Nachbarn und Nachbarinnen stören.', 'Musik hören ist in Wohnhäusern verboten.', 'Es gibt keine Probleme.'],
  },
  {
    prompt: 'Um als Ärztin oder Arzt zu arbeiten, muss man ...',
    answer: 'b',
    options: ['aus einer Familie von Ärzten kommen.', 'an der Universität Medizin studiert haben.', 'eine Lehre bei einem Arzt oder einer Ärztin machen.'],
  },
  {
    prompt: 'Alte Menschen, die keine Familie und nicht genug Geld haben, bekommen Hilfe vom Staat. Wer bezahlt diese Hilfe?',
    answer: 'a',
    options: ['Alle Menschen, die eine Arbeit haben und Steuern und Abgaben zahlen.', 'Die EU.', 'Die UNO.'],
  },
]

const modelltest3: RawQuestion[] = [
  { prompt: 'In den Jahren 1939 bis 1945 war der Zweite Weltkrieg.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In einer Diktatur geht das Recht vom Volk aus.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'Nach dem Zweiten Weltkrieg war keine Stadt in Österreich zerstört.', answer: 'b', options: 'richtigFalsch' },
  {
    prompt: 'Besonders ab den 1960er-Jahren kamen Menschen aus anderen Ländern nach Österreich und haben am Erfolg der Wirtschaft in Österreich mitgearbeitet.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  {
    prompt: 'Auch wegen der Erfahrungen aus der Zeit des Nationalsozialismus sind Demokratie und Menschenrechte für die österreichische Gesellschaft heute sehr wichtig.',
    answer: 'a',
    options: 'richtigFalsch',
  },
  { prompt: 'Alle Kinder in Österreich müssen zur Schule gehen.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Mädchen und Buben müssen an allen Schulfächern teilnehmen.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Eine Berufsausbildung aus einem anderen Land kann in Österreich anerkannt werden.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Wenn Erwachsene keinen Schulabschluss haben, können sie ihn nachholen.', answer: 'a', options: 'richtigFalsch' },
  {
    prompt: 'Wer hat ab den 1960er-Jahren am Erfolg der Wirtschaft in Österreich mitgearbeitet?',
    answer: 'b',
    options: ['Nur Österreicher und Österreicherinnen.', 'Österreicher, Österreicherinnen und Menschen aus anderen Ländern.', 'Nur Menschen aus anderen Ländern.'],
  },
  { prompt: 'Wer muss am Sportunterricht teilnehmen?', answer: 'c', options: ['Nur Buben.', 'Nur Mädchen.', 'Mädchen und Buben.'] },
  {
    prompt: 'Warum sollen Eltern zum Elternsprechtag gehen?',
    answer: 'a',
    options: ['Sie können mit Lehrerinnen und Lehrern über ihr Kind sprechen.', 'Sie bekommen dort einen Reisepass.', 'Sie müssen dort eine Prüfung machen.'],
  },
  {
    prompt: 'Was braucht man, wenn man in Österreich als Ärztin oder Arzt arbeiten möchte?',
    answer: 'b',
    options: ['Eine kurze Einschulung.', 'Ein abgeschlossenes Medizinstudium.', 'Nur Berufserfahrung im Ausland.'],
  },
  { prompt: 'Was bezahlt das österreichische Sozialsystem?', answer: 'a', options: ['Zum Beispiel Hilfe bei Arbeitslosigkeit.', 'Urlaub für alle Menschen.', 'Private Geschenke.'] },
  { prompt: 'Wer finanziert öffentliche Schulen?', answer: 'a', options: ['Der Staat durch Steuern und Abgaben.', 'Nur die Eltern.', 'Nur private Firmen.'] },
  {
    prompt: 'Was bedeutet Demokratie?',
    answer: 'a',
    options: ['Das Recht geht vom Volk aus.', 'Eine Person entscheidet alles.', 'Es gibt keine Wahlen.'],
  },
  { prompt: 'Was ist eine Diktatur?', answer: 'b', options: ['Alle Menschen entscheiden alles direkt.', 'Eine Person oder Gruppe hat die Macht.', 'Es gibt immer freie Wahlen.'] },
  { prompt: 'Was ist wichtig für Integration?', answer: 'c', options: ['Nur Geld.', 'Nur Wohnen.', 'Sprache, Bildung und Respekt vor Gesetzen.'] },
]

const modelltest4: RawQuestion[] = [
  { prompt: 'In Österreich ist die Todesstrafe verboten.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Alle Menschen in Österreich sind gleich viel wert.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'In Österreich darf ein Kind, das 8 Jahre alt ist, in einer Firma arbeiten.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'Die Menschenrechte schützen nur die Rechte von Österreicherinnen und Österreichern.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'In Österreich muss jeder Mensch die Religion seiner Eltern haben.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'In Österreich dürfen Frauen vor der Hochzeit nicht alleine leben.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'In Österreich darf die Ehefrau ihren Ehemann schlagen.', answer: 'b', options: 'richtigFalsch' },
  { prompt: 'Der österreichische Staat schützt die Rechte von Kindern.', answer: 'a', options: 'richtigFalsch' },
  { prompt: 'Wenn man einen anderen Menschen schlägt und verletzt, ist das strafbar.', answer: 'a', options: 'richtigFalsch' },
  {
    prompt: 'Ab wann darf jeder Mensch in Österreich selber entscheiden, welche Religion er haben möchte?',
    answer: 'a',
    options: ['Ab 14 Jahren.', 'Ab 6 Jahren.', 'Nie.'],
  },
  { prompt: 'Wer entscheidet, ob man heiratet?', answer: 'a', options: ['Die betroffenen Personen selbst.', 'Nur die Eltern.', 'Die Nachbarn.'] },
  { prompt: 'Wer darf in Österreich ein Kind schlagen?', answer: 'c', options: ['Die Eltern.', 'Lehrerinnen und Lehrer.', 'Niemand.'] },
  {
    prompt: 'Was passiert, wenn man einen anderen Menschen schlägt und verletzt?',
    answer: 'b',
    options: ['Das ist immer erlaubt.', 'Das kann strafbar sein.', 'Das interessiert den Staat nicht.'],
  },
  { prompt: 'Darf eine Frau in Österreich ihren Lebenspartner selbst wählen?', answer: 'a', options: ['Ja.', 'Nein.', 'Nur mit Genehmigung der Gemeinde.'] },
  { prompt: 'Ist Zwangsehe in Österreich erlaubt?', answer: 'b', options: ['Ja.', 'Nein.', 'Nur bei Erwachsenen.'] },
  { prompt: 'Darf ein Mann in Österreich einen Mann heiraten?', answer: 'a', options: ['Ja.', 'Nein.', 'Nur mit Erlaubnis der Familie.'] },
  { prompt: 'Was schützen Kinderrechte?', answer: 'a', options: ['Die Rechte von Kindern.', 'Nur die Rechte der Eltern.', 'Nur die Rechte der Schule.'] },
  { prompt: 'Was muss man in Österreich befolgen?', answer: 'c', options: ['Nur religiöse Regeln.', 'Nur Familienregeln.', 'Die österreichischen Gesetze.'] },
]

export const b1ValuesQuestionSets = {
  modelltest1: buildSet('werte-modelltest-1', modelltest1, 0),
  modelltest2: buildSet('werte-modelltest-2', modelltest2, 100),
  modelltest3: buildSet('werte-modelltest-3', modelltest3, 200),
  modelltest4: buildSet('werte-modelltest-4', modelltest4, 300),
}

export const b1ValuesAllQuestions: Question[] = Object.values(b1ValuesQuestionSets)
  .flat()
  .map((question, index) => ({
    ...question,
    id: 1000 + index + 1,
    displayId: index + 1,
    section: 'werte-alle-fragen',
  }))
