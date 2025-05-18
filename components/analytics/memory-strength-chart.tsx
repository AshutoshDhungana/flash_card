"use client"

import type { Card } from "@/lib/types"
import { BarChart } from "@/components/ui/chart"

interface MemoryStrengthChartProps {
  cards: Card[]
}

export function MemoryStrengthChart({ cards }: MemoryStrengthChartProps) {
  // Group cards by difficulty ranges
  const difficultyRanges = [
    { label: "Very Weak (0-0.2)", min: 0, max: 0.2, count: 0 },
    { label: "Weak (0.2-0.4)", min: 0.2, max: 0.4, count: 0 },
    { label: "Medium (0.4-0.6)", min: 0.4, max: 0.6, count: 0 },
    { label: "Strong (0.6-0.8)", min: 0.6, max: 0.8, count: 0 },
    { label: "Very Strong (0.8-1.0)", min: 0.8, max: 1.0, count: 0 },
  ]

  // Count cards in each range
  cards.forEach((card) => {
    const range = difficultyRanges.find((range) => card.difficulty >= range.min && card.difficulty < range.max)
    if (range) {
      range.count++
    }
  })

  const data = {
    labels: difficultyRanges.map((range) => range.label),
    datasets: [
      {
        label: "Cards",
        data: difficultyRanges.map((range) => range.count),
        backgroundColor: [
          "hsl(var(--chart-red))",
          "hsl(var(--chart-orange))",
          "hsl(var(--chart-yellow))",
          "hsl(var(--chart-blue))",
          "hsl(var(--chart-green))",
        ],
      },
    ],
  }

  return (
    <BarChart
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
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || ""
                const value = context.parsed.y
                return `${label}: ${value} (${value > 0 && cards.length > 0 ? Math.round((value / cards.length) * 100) : 0}%)`
              },
            },
          },
        },
      }}
    />
  )
}
