"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Deck } from "@/lib/types"

interface DeckState {
  decks: Deck[]
  addDeck: (deck: Deck) => void
  updateDeck: (deck: Deck) => void
  deleteDeck: (id: string) => void
  getDeckById: (id: string) => Deck | undefined
  updateDeckLastReviewed: (id: string) => void
  resetDeckData: () => void
}

// Sample decks for initial state
const sampleDecks: Deck[] = [
  {
    id: "deck-1",
    name: "JavaScript Fundamentals",
    description: "Core concepts of JavaScript programming language",
    tags: ["programming", "javascript", "web"],
    cardCount: 15,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastReviewed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "deck-2",
    name: "Spanish Vocabulary",
    description: "Common Spanish words and phrases for beginners",
    tags: ["language", "spanish", "vocabulary"],
    cardCount: 25,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastReviewed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "deck-3",
    name: "World Capitals",
    description: "Capital cities of countries around the world",
    tags: ["geography", "capitals", "countries"],
    cardCount: 20,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    lastReviewed: null,
  },
]

export const useDeckStore = create<DeckState>()(
  persist(
    (set, get) => ({
      decks: sampleDecks,

      addDeck: (deck) =>
        set((state) => ({
          decks: [...state.decks, deck],
        })),

      updateDeck: (updatedDeck) =>
        set((state) => ({
          decks: state.decks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck)),
        })),

      deleteDeck: (id) =>
        set((state) => ({
          decks: state.decks.filter((deck) => deck.id !== id),
        })),

      getDeckById: (id) => {
        return get().decks.find((deck) => deck.id === id)
      },

      updateDeckLastReviewed: (id) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === id ? { ...deck, lastReviewed: new Date().toISOString() } : deck,
          ),
        })),

      resetDeckData: () => set({ decks: sampleDecks }),
    }),
    {
      name: "recall-master-decks",
    },
  ),
)
