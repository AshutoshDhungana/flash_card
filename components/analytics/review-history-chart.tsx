"use client"

import type { ReviewHistory } from "@/lib/types"
import { LineChart } from "@/components/ui/chart"

interface ReviewHistoryChartProps {
  reviewHistory: ReviewHistory[]
}

export function ReviewHistoryChart({ reviewHistory }: ReviewHistoryChartProps) {
  // Get the last 14 days
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 13 + i)
    return date
  })

  // Format dates for display
  const formattedDates = last14Days.map((date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))

  // Count correct and incorrect reviews for each day
  const dailyStats = last14Days.map((date) => {
    const dayStart = new Date(date)
    dayStart.setHours(0, 0, 0, 0)

    const dayEnd = new Date(date)
    dayEnd.setHours(23, 59, 59, 999)

    const dayReviews = reviewHistory.filter((review) => {
      const reviewDate = new Date(review.reviewedAt)
      return reviewDate >= dayStart && reviewDate <= dayEnd
    })

    return {
      correct: dayReviews.filter((review) => review.isCorrect).length,
      incorrect: dayReviews.filter((review) => !review.isCorrect).length,
    }
  })

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Correct",
        data: dailyStats.map((stat) => stat.correct),
        borderColor: "hsl(var(--chart-green))",
        backgroundColor: "hsl(var(--chart-green) / 0.1)",
        fill: true,
        tension: 0.2,
      },
      {
        label: "Incorrect",
        data: dailyStats.map((stat) => stat.incorrect),
        borderColor: "hsl(var(--chart-red))",
        backgroundColor: "hsl(var(--chart-red) / 0.1)",
        fill: true,
        tension: 0.2,
      },
    ],
  }

  return (
    <LineChart
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "end",
          },
        },
      }}
    />
  )
}
