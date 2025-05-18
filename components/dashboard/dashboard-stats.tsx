"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCardStore } from "@/lib/stores/card-store"
import { useDeckStore } from "@/lib/stores/deck-store"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function DashboardStats() {
  const { cards, reviewHistory } = useCardStore()
  const { decks } = useDeckStore()

  const [animatedTotalReviews, setAnimatedTotalReviews] = useState(0)
  const [animatedAccuracyRate, setAnimatedAccuracyRate] = useState(0)
  const [animatedMasteryRate, setAnimatedMasteryRate] = useState(0)

  // Calculate total reviews
  const totalReviews = reviewHistory.length

  // Calculate correct reviews
  const correctReviews = reviewHistory.filter((review) => review.isCorrect).length

  // Calculate accuracy rate
  const accuracyRate = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0

  // Calculate mastery level
  const masteredCards = cards.filter((card) => card.difficulty >= 0.8).length
  const masteryRate = cards.length > 0 ? Math.round((masteredCards / cards.length) * 100) : 0

  // Animate the stats on mount
  useEffect(() => {
    const duration = 1500
    const interval = 20
    const steps = duration / interval

    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedTotalReviews(Math.round(totalReviews * progress))
      setAnimatedAccuracyRate(Math.round(accuracyRate * progress))
      setAnimatedMasteryRate(Math.round(masteryRate * progress))

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedTotalReviews(totalReviews)
        setAnimatedAccuracyRate(accuracyRate)
        setAnimatedMasteryRate(masteryRate)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [totalReviews, accuracyRate, masteryRate])

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="col-span-2 premium-card">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle>Learning Stats</CardTitle>
          <CardDescription>Your overall learning progress and statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Reviews</span>
              <span className="text-sm font-medium">{animatedTotalReviews}</span>
            </div>
            <Progress value={Math.min(animatedTotalReviews / 10, 100)} className="h-2.5 rounded-full bg-muted/50" />
            <p className="text-xs text-muted-foreground">
              {totalReviews < 10
                ? `Complete ${10 - totalReviews} more reviews to reach your first milestone`
                : `Great job! You've completed ${totalReviews} reviews`}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Accuracy Rate</span>
              <span className="text-sm font-medium">{animatedAccuracyRate}%</span>
            </div>
            <Progress
              value={animatedAccuracyRate}
              className="h-2.5 rounded-full bg-muted/50"
              indicatorClassName={animatedAccuracyRate > 70 ? "bg-green-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {accuracyRate < 70
                ? "Keep practicing to improve your accuracy"
                : "Great job! You're mastering your cards"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mastery Level</span>
              <span className="text-sm font-medium">{animatedMasteryRate}%</span>
            </div>
            <Progress
              value={animatedMasteryRate}
              className="h-2.5 rounded-full bg-muted/50"
              indicatorClassName={animatedMasteryRate > 50 ? "bg-green-500" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {masteryRate < 50 ? "Continue reviewing to master more cards" : "You're making excellent progress!"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3 premium-card">
              <div className="text-sm font-medium">Total Cards</div>
              <div className="mt-1 text-2xl font-bold">{cards.length}</div>
            </div>
            <div className="rounded-lg border p-3 premium-card">
              <div className="text-sm font-medium">Total Decks</div>
              <div className="mt-1 text-2xl font-bold">{decks.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
