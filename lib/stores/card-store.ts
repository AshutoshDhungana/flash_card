"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Card, ReviewHistory } from "@/lib/types"
import { calculateNextReview } from "@/lib/spaced-repetition"

interface CardState {
  cards: Card[]
  reviewHistory: ReviewHistory[]
  addCard: (card: Card) => void
  updateCard: (card: Card) => void
  deleteCard: (id: string) => void
  deleteCardsByDeckId: (deckId: string) => void
  getCardById: (id: string) => Card | undefined
  getCardsByDeckId: (deckId: string) => Card[]
  getDueCards: (deckId: string) => Card[]
  getDueCardCount: (deckId: string) => number
  updateCardAfterReview: (cardId: string, isCorrect: boolean) => void
  resetCardData: () => void
}

// Sample cards for initial state
const sampleCards: Card[] = [
  // JavaScript Fundamentals Deck
  {
    id: "card-1",
    deckId: "deck-1",
    front: "What is a closure in JavaScript?",
    back: "A closure is a function that has access to its own scope, the scope of the outer function, and the global scope.",
    difficulty: 0.6,
    nextReview: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-1", "review-2"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "card-2",
    deckId: "deck-1",
    front: "What is the difference between let and var?",
    back: "let is block-scoped, while var is function-scoped. let was introduced in ES6 and is generally preferred over var.",
    difficulty: 0.8,
    nextReview: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-3"],
    createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "card-3",
    deckId: "deck-1",
    front: "What is the purpose of the 'this' keyword in JavaScript?",
    back: "The 'this' keyword refers to the object it belongs to. In a method, 'this' refers to the owner object. In a function, 'this' refers to the global object.",
    difficulty: 0.4,
    nextReview: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-4"],
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // Spanish Vocabulary Deck
  {
    id: "card-4",
    deckId: "deck-2",
    front: "¿Cómo estás?",
    back: "How are you?",
    difficulty: 0.9,
    nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-5", "review-6", "review-7"],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "card-5",
    deckId: "deck-2",
    front: "Buenos días",
    back: "Good morning",
    difficulty: 0.7,
    nextReview: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-8", "review-9"],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },

  // World Capitals Deck
  {
    id: "card-6",
    deckId: "deck-3",
    front: "What is the capital of France?",
    back: "Paris",
    difficulty: 0.5,
    nextReview: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: ["review-10"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "card-7",
    deckId: "deck-3",
    front: "What is the capital of Japan?",
    back: "Tokyo",
    difficulty: 0.3,
    nextReview: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviewHistory: [],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Sample review history
const sampleReviewHistory: ReviewHistory[] = [
  {
    id: "review-1",
    cardId: "card-1",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 5000,
  },
  {
    id: "review-2",
    cardId: "card-1",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 3000,
  },
  {
    id: "review-3",
    cardId: "card-2",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 4000,
  },
  {
    id: "review-4",
    cardId: "card-3",
    isCorrect: false,
    reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 7000,
  },
  {
    id: "review-5",
    cardId: "card-4",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 2000,
  },
  {
    id: "review-6",
    cardId: "card-4",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 1500,
  },
  {
    id: "review-7",
    cardId: "card-4",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 1000,
  },
  {
    id: "review-8",
    cardId: "card-5",
    isCorrect: false,
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 6000,
  },
  {
    id: "review-9",
    cardId: "card-5",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 3000,
  },
  {
    id: "review-10",
    cardId: "card-6",
    isCorrect: true,
    reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeTaken: 2500,
  },
]

export const useCardStore = create<CardState>()(
  persist(
    (set, get) => ({
      cards: sampleCards,
      reviewHistory: sampleReviewHistory,

      addCard: (card) =>
        set((state) => ({
          cards: [...state.cards, card],
        })),

      updateCard: (updatedCard) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      deleteCardsByDeckId: (deckId) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.deckId !== deckId),
          reviewHistory: state.reviewHistory.filter((review) => {
            const card = state.cards.find((c) => c.id === review.cardId)
            return !card || card.deckId !== deckId
          }),
        })),

      getCardById: (id) => {
        return get().cards.find((card) => card.id === id)
      },

      getCardsByDeckId: (deckId) => {
        return get().cards.filter((card) => card.deckId === deckId)
      },

      getDueCards: (deckId) => {
        const now = new Date().toISOString()
        return get().cards.filter((card) => card.deckId === deckId && card.nextReview <= now)
      },

      getDueCardCount: (deckId) => {
        const now = new Date().toISOString()
        return get().cards.filter((card) => card.deckId === deckId && card.nextReview <= now).length
      },

      updateCardAfterReview: (cardId, isCorrect) => {
        const { cards, reviewHistory } = get()
        const card = cards.find((c) => c.id === cardId)

        if (!card) return

        // Create new review history entry
        const newReview: ReviewHistory = {
          id: crypto.randomUUID(),
          cardId,
          isCorrect,
          reviewedAt: new Date().toISOString(),
          timeTaken: Math.floor(Math.random() * 5000) + 1000, // Mock time taken
        }

        // Update card difficulty and next review date
        const newDifficulty = isCorrect ? Math.min(card.difficulty + 0.1, 1) : Math.max(card.difficulty - 0.2, 0)

        const nextReview = calculateNextReview(newDifficulty, isCorrect)

        // Update card
        const updatedCard = {
          ...card,
          difficulty: newDifficulty,
          nextReview,
          reviewHistory: [...card.reviewHistory, newReview.id],
        }

        set((state) => ({
          cards: state.cards.map((c) => (c.id === cardId ? updatedCard : c)),
          reviewHistory: [...state.reviewHistory, newReview],
        }))
      },

      resetCardData: () =>
        set({
          cards: sampleCards,
          reviewHistory: sampleReviewHistory,
        }),
    }),
    {
      name: "recall-master-cards",
    },
  ),
)
