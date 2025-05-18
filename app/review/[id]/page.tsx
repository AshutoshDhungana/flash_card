"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { useUserStore } from "@/lib/stores/user-store"
import type { Card } from "@/lib/types"
import { FlashCard } from "@/components/cards/flash-card"
import { ReviewComplete } from "@/components/review/review-complete"
import { useKeyboardShortcut } from "@/lib/hooks/use-keyboard-shortcut"
import { motion, AnimatePresence } from "framer-motion"

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.id as string

  const { getDeckById } = useDeckStore()
  const { getDueCards, updateCardAfterReview } = useCardStore()
  const { incrementStreak } = useUserStore()

  const [dueCards, setDueCards] = useState<Card[]>([])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const deck = getDeckById(deckId)
  const reviewStartTime = useRef(Date.now())

  // Load due cards
  useEffect(() => {
    if (!deck) {
      router.push("/decks")
      return
    }

    const cards = getDueCards(deckId)
    if (cards.length === 0) {
      router.push(`/decks/${deckId}`)
      return
    }

    // Shuffle the cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setDueCards(shuffled)

    // Record review session start
    reviewStartTime.current = Date.now()

    // Update streak
    incrementStreak()
  }, [deckId, deck, getDueCards, router, incrementStreak])

  const handleKnow = useCallback(() => {
    if (isComplete || isAnimating) return

    setIsAnimating(true)

    const card = dueCards[currentCardIndex]
    updateCardAfterReview(card.id, true)

    setStats((prev) => ({ ...prev, correct: prev.correct + 1 }))

    // Add a slight delay before moving to the next card for better UX
    setTimeout(() => {
      moveToNextCard()
    }, 300)
  }, [currentCardIndex, dueCards, isComplete, updateCardAfterReview, isAnimating])

  const handleDontKnow = useCallback(() => {
    if (isComplete || isAnimating) return

    setIsAnimating(true)

    const card = dueCards[currentCardIndex]
    updateCardAfterReview(card.id, false)

    setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))

    // Add a slight delay before moving to the next card for better UX
    setTimeout(() => {
      moveToNextCard()
    }, 300)
  }, [currentCardIndex, dueCards, isComplete, updateCardAfterReview, isAnimating])

  const moveToNextCard = () => {
    setIsFlipped(false)
    setShowAnswer(false)

    // Small delay to allow card to flip back before moving to next card
    setTimeout(() => {
      if (currentCardIndex < dueCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1)
      } else {
        setIsComplete(true)
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleFlip = () => {
    if (isAnimating) return
    setIsFlipped(!isFlipped)
    if (!isFlipped) {
      setTimeout(() => setShowAnswer(true), 150)
    } else {
      setShowAnswer(false)
    }
  }

  // Keyboard shortcuts
  useKeyboardShortcut("k", handleKnow)
  useKeyboardShortcut("d", handleDontKnow)
  useKeyboardShortcut(" ", handleFlip)

  if (!deck || dueCards.length === 0) return null

  const progress = (currentCardIndex / dueCards.length) * 100
  const currentCard = dueCards[currentCardIndex]

  if (isComplete) {
    const reviewTime = Math.round((Date.now() - reviewStartTime.current) / 1000)
    return <ReviewComplete stats={stats} reviewTime={reviewTime} deckId={deckId} deckName={deck.name} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-6 max-w-3xl"
    >
      <Button variant="ghost" className="mb-4 group premium-button" onClick={() => router.push(`/decks/${deckId}`)}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Deck
      </Button>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">{deck.name}</h1>
          <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
            Card {currentCardIndex + 1} of {dueCards.length}
          </div>
        </div>
        <Progress value={progress} className="h-2.5 rounded-full bg-muted/50" />
      </div>

      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <FlashCard front={currentCard.front} back={currentCard.back} isFlipped={isFlipped} onFlip={handleFlip} />
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-10 w-full max-w-md">
          <Button
            variant="outline"
            className="flex-1 h-16 border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:border-red-800 group premium-button"
            onClick={handleDontKnow}
            disabled={isAnimating}
          >
            <X className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            Don't Know (D)
          </Button>
          <Button
            className="flex-1 h-16 bg-green-600 hover:bg-green-700 group premium-button"
            onClick={handleKnow}
            disabled={isAnimating}
          >
            <Check className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            Know (K)
          </Button>
        </div>

        <div className="mt-6 text-sm text-muted-foreground flex items-center gap-2">
          Press <kbd className="px-2 py-1 rounded border bg-muted text-xs font-semibold">Space</kbd> to flip card
        </div>
      </div>
    </motion.div>
  )
}
