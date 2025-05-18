"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Award, BarChart3, CheckCircle, XCircle } from "lucide-react"
import { useUserStore } from "@/lib/stores/user-store"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface ReviewCompleteProps {
  stats: {
    correct: number
    incorrect: number
  }
  reviewTime: number
  deckId: string
  deckName: string
}

export function ReviewComplete({ stats, reviewTime, deckId, deckName }: ReviewCompleteProps) {
  const router = useRouter()
  const { addXp } = useUserStore()

  const totalCards = stats.correct + stats.incorrect
  const accuracyRate = totalCards > 0 ? Math.round((stats.correct / totalCards) * 100) : 0

  // Award XP based on performance
  const earnedXp = stats.correct * 10 + (accuracyRate >= 80 ? 50 : 0)

  // Format review time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Trigger confetti effect on component mount
  useEffect(() => {
    // Add XP to user account
    addXp(earnedXp)

    // Trigger confetti if accuracy is good
    if (accuracyRate >= 70) {
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#5eead4", "#0ea5e9", "#8b5cf6"],
        })

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#5eead4", "#0ea5e9", "#8b5cf6"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [addXp, earnedXp, accuracyRate])

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-3xl">
      <Button variant="ghost" className="mb-4 premium-button" onClick={() => router.push(`/decks/${deckId}`)}>
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Deck
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-primary/20 premium-card">
          <CardHeader className="text-center pb-2 bg-muted/30">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 glow-effect"
            >
              <Award className="h-8 w-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl">Review Complete!</CardTitle>
            <CardDescription>
              You've completed your review session for <strong>{deckName}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-lg border p-4 premium-card"
              >
                <div className="flex items-center gap-2 text-lg font-medium">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Correct
                </div>
                <p className="text-3xl font-bold mt-2">{stats.correct}</p>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-lg border p-4 premium-card"
              >
                <div className="flex items-center gap-2 text-lg font-medium">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Incorrect
                </div>
                <p className="text-3xl font-bold mt-2">{stats.incorrect}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-4 rounded-lg border p-4 premium-card"
            >
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Accuracy Rate</span>
                <span className="font-medium">{accuracyRate}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Cards</span>
                <span className="font-medium">{totalCards}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Review Time</span>
                <span className="font-medium">{formatTime(reviewTime)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">XP Earned</span>
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: 0.8, repeat: 1 }}
                  className="font-medium text-primary"
                >
                  +{earnedXp} XP
                </motion.span>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 p-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto premium-button"
              onClick={() => router.push(`/decks/${deckId}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Return to Deck
            </Button>
            <Button className="w-full sm:w-auto premium-button" onClick={() => router.push("/analytics")}>
              <BarChart3 className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              View Analytics
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
