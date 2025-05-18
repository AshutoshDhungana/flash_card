"use client"

import { useUserStore } from "@/lib/stores/user-store"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { Button } from "@/components/ui/button"
import { BookOpen, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function DashboardHeader() {
  const { username, xp, level } = useUserStore()
  const { decks } = useDeckStore()
  const { getDueCardCount } = useCardStore()

  const totalDueCards = decks.reduce((total, deck) => {
    return total + getDueCardCount(deck.id)
  }, 0)

  return (
    <div className="flex flex-col gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Welcome back, {username || "Learner"}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </motion.div>
          </h1>
          <p className="text-muted-foreground mt-1">Track your progress and continue learning</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" asChild className="premium-button">
            <Link href="/decks">
              <BookOpen className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              View All Decks
            </Link>
          </Button>
          <Button asChild className="premium-button">
            <Link href="/decks">
              <Plus className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Create Deck
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="flex items-center gap-4 rounded-lg border p-4 premium-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Decks</p>
            <p className="text-2xl font-bold">{decks.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border p-4 premium-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due for Review</p>
            <p className="text-2xl font-bold">{totalDueCards}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border p-4 premium-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M2 20h.01" />
              <path d="M7 20v-4" />
              <path d="M12 20v-8" />
              <path d="M17 20v-6" />
              <path d="M22 20V8" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">XP Level</p>
            <p className="text-2xl font-bold">
              {level} <span className="text-sm text-muted-foreground">({xp} XP)</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
