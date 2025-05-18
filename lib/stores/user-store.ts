"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"

interface UserState extends User {
  incrementStreak: () => void
  addXp: (amount: number) => void
  resetUserData: () => void
}

// Initial user state
const initialUser: User = {
  username: "Learner",
  xp: 250,
  level: 3,
  streakData: {
    currentStreak: 2,
    longestStreak: 5,
    lastReviewDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  settings: {
    theme: "system",
    keyboardShortcuts: true,
    autoAdvance: false,
    reviewsPerSession: 20,
  },
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialUser,

      incrementStreak: () => {
        const { streakData } = get()
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const lastReviewDate = streakData.lastReviewDate ? new Date(streakData.lastReviewDate) : null

        if (lastReviewDate) {
          lastReviewDate.setHours(0, 0, 0, 0)

          // Calculate days difference
          const diffTime = today.getTime() - lastReviewDate.getTime()
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays === 1) {
            // Consecutive day, increment streak
            const newStreak = streakData.currentStreak + 1
            set({
              streakData: {
                currentStreak: newStreak,
                longestStreak: Math.max(newStreak, streakData.longestStreak),
                lastReviewDate: today.toISOString(),
              },
            })
          } else if (diffDays > 1) {
            // Streak broken
            set({
              streakData: {
                currentStreak: 1,
                longestStreak: streakData.longestStreak,
                lastReviewDate: today.toISOString(),
              },
            })
          } else if (diffDays === 0) {
            // Same day, don't change streak but update date
            set({
              streakData: {
                ...streakData,
                lastReviewDate: today.toISOString(),
              },
            })
          }
        } else {
          // First review ever
          set({
            streakData: {
              currentStreak: 1,
              longestStreak: 1,
              lastReviewDate: today.toISOString(),
            },
          })
        }
      },

      addXp: (amount) => {
        const { xp, level } = get()
        const newXp = xp + amount

        // Simple level calculation
        // Each level requires 100 * level XP to advance
        const xpForNextLevel = 100 * level

        if (newXp >= xpForNextLevel) {
          set({
            xp: newXp - xpForNextLevel,
            level: level + 1,
          })
        } else {
          set({ xp: newXp })
        }
      },

      resetUserData: () => set(initialUser),
    }),
    {
      name: "recall-master-user",
    },
  ),
)
