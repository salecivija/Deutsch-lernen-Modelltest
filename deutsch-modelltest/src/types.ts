export type Skill = 'Hören' | 'Lesen' | 'Schreiben' | 'Sprechen' | 'Wertewissen'

export type TestStatus = 'available' | 'planned'

export type LibraryLevel = 'A1' | 'A2' | 'B1' | 'B2'

export type Option = {
  id: string
  text: string
}

export type Question = {
  id: number
  displayId?: number | string
  section: string
  prompt: string
  answer: string
  options: Option[]
  shuffle?: boolean
  points?: number
}

export type TestSection = {
  id: string
  title: string
  skill: Skill
  time: string
  pages: number[]
  audio?: string
}

export type TestAsset = {
  label: string
  path: string
}

export type ScoreThresholds = {
  readingListening: {
    total: number
    pass: number
  }
  writing?: {
    total: number
    pass: number
  }
  speaking?: {
    total: number
    pass: number
  }
}

export type ModelTest = {
  id: string
  title: string
  cardTitle: string
  level: string
  libraryLevel: LibraryLevel
  exam: string
  provider: string
  description: string
  status: TestStatus
  sourceUrl: string
  webAssetBase: string
  coverImage?: string
  tags: string[]
  order: number
  assets: TestAsset[]
  sections: TestSection[]
  questions: Question[]
  thresholds: ScoreThresholds
  scoreMode?: 'points' | 'count'
}
