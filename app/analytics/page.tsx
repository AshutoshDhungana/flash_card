"use client"

import { useState } from "react"
import { useCardStore } from "@/lib/stores/card-store"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useUserStore } from "@/lib/stores/user-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MemoryStrengthChart } from "@/components/analytics/memory-strength-chart"
import { ReviewHistoryChart } from "@/components/analytics/review-history-chart"
import { ActivityHeatmap } from "@/components/analytics/activity-heatmap"
import { DeckPerformanceChart } from "@/components/analytics/deck-performance-chart"

export default function AnalyticsPage() {
  const { decks } = useDeckStore()
  const { cards, reviewHistory } = useCardStore()
  const { streakData } = useUserStore()

  const [selectedDeckId, setSelectedDeckId] = useState<string>("all")

  const filteredCards = selectedDeckId === "all" ? cards : cards.filter((card) => card.deckId === selectedDeckId)

  const filteredReviewHistory =
    selectedDeckId === "all"
      ? reviewHistory
      : reviewHistory.filter((review) => {
          const card = cards.find((c) => c.id === review.cardId)
          return card && card.deckId === selectedDeckId
        })

  const totalReviews = reviewHistory.length
  const correctReviews = reviewHistory.filter((r) => r.isCorrect).length
  const accuracyRate = totalReviews > 0 ? Math.round((correctReviews / totalReviews) * 100) : 0

  const currentStreak = streakData.currentStreak
  const longestStreak = streakData.longestStreak

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your learning progress and memory retention</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{cards.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalReviews}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Accuracy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{accuracyRate}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Streak</CardTitle>
              <CardDescription>Longest: {longestStreak} days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{currentStreak} days</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Detailed Analytics</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by deck:</span>
            <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select deck" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Decks</SelectItem>
                {decks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    {deck.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="memory" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="memory">Memory Strength</TabsTrigger>
            <TabsTrigger value="history">Review History</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="memory" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Memory Strength Distribution</CardTitle>
                <CardDescription>Visualization of your memory strength across all cards</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MemoryStrengthChart cards={filteredCards} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Review History</CardTitle>
                <CardDescription>Your review performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ReviewHistoryChart reviewHistory={filteredReviewHistory} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Heatmap</CardTitle>
                <CardDescription>Your study activity over the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] pt-4">
                <ActivityHeatmap reviewHistory={reviewHistory} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedDeckId === "all" && (
          <Card>
            <CardHeader>
              <CardTitle>Deck Performance Comparison</CardTitle>
              <CardDescription>Compare your performance across different decks</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DeckPerformanceChart decks={decks} cards={cards} reviewHistory={reviewHistory} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
