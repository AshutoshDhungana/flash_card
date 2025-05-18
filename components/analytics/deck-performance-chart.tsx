"use client"

import type { Deck, Card, ReviewHistory } from "@/lib/types"
import { RadarChart } from "@/components/ui/chart"

interface DeckPerformanceChartProps {
  decks: Deck[]
  cards: Card[]
  reviewHistory: ReviewHistory[]
}

export function DeckPerformanceChart({ decks, cards, reviewHistory }: DeckPerformanceChartProps) {
  // Calculate performance metrics for each deck
  const deckMetrics = decks
    .map((deck) => {
      const deckCards = cards.filter((card) => card.deckId === deck.id)

      // Skip decks with no cards
      if (deckCards.length === 0) return null

      const deckReviews = reviewHistory.filter((review) => {
        const card = cards.find((c) => c.id === review.cardId)
        return card && card.deckId === deck.id
      })

      // Calculate metrics
      const totalReviews = deckReviews.length
      const correctReviews = deckReviews.filter((r) => r.isCorrect).length

      const accuracyRate = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0

      const masteredCards = deckCards.filter((c) => c.difficulty >= 0.8).length
      const masteryRate = (masteredCards / deckCards.length) * 100

      const avgDifficulty = (deckCards.reduce((sum, card) => sum + card.difficulty, 0) / deckCards.length) * 100

      // Calculate review frequency (normalized to 0-100)
      const reviewFrequency = Math.min((totalReviews / deckCards.length) * 20, 100)

      // Calculate retention (mock data)
      const retention = Math.min(avgDifficulty * 1.1, 100)

      return {
        deck,
        metrics: {
          accuracyRate,
          masteryRate,
          avgDifficulty,
          reviewFrequency,
          retention,
        },
      }
    })
    .filter(Boolean) as Array<{
    deck: Deck
    metrics: {
      accuracyRate: number
      masteryRate: number
      avgDifficulty: number
      reviewFrequency: number
      retention: number
    }
  }>

  // Only include decks with cards
  if (deckMetrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Not enough data to display deck performance.</p>
      </div>
    )
  }

  const data = {
    labels: ["Accuracy", "Mastery", "Difficulty", "Frequency", "Retention"],
    datasets: deckMetrics.map((deckMetric, index) => ({
      label: deckMetric.deck.name,
      data: [
        deckMetric.metrics.accuracyRate,
        deckMetric.metrics.masteryRate,
        deckMetric.metrics.avgDifficulty,
        deckMetric.metrics.reviewFrequency,
        deckMetric.metrics.retention,
      ],
      backgroundColor: `hsl(var(--chart-${(index % 5) + 1}) / 0.2)`,
      borderColor: `hsl(var(--chart-${(index % 5) + 1}))`,
      borderWidth: 2,
    })),
  }

  return (
    <RadarChart
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "center",
          },
        },
      }}
    />
  )
}
