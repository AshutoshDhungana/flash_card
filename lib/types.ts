export interface Deck {
  id: string
  name: string
  description: string
  tags: string[]
  cardCount: number
  createdAt: string
  lastReviewed: string | null
}

export interface Card {
  id: string
  deckId: string
  front: string
  back: string
  difficulty: number // 0 to 1, where 1 is fully mastered
  nextReview: string
  reviewHistory: string[] // IDs of review history entries
  createdAt: string
}

export interface ReviewHistory {
  id: string
  cardId: string
  isCorrect: boolean
  reviewedAt: string
  timeTaken: number // in milliseconds
}

export interface User {
  username: string
  xp: number
  level: number
  streakData: {
    currentStreak: number
    longestStreak: number
    lastReviewDate: string | null
  }
  settings: {
    theme: string
    keyboardShortcuts: boolean
    autoAdvance: boolean
    reviewsPerSession: number
  }
}
