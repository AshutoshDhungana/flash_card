"use client"

import { useEffect, useRef } from "react"
import type { ReviewHistory } from "@/lib/types"

interface ActivityHeatmapProps {
  reviewHistory: ReviewHistory[]
}

export function ActivityHeatmap({ reviewHistory }: ActivityHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Calculate cell size
    const cellSize = Math.min(
      Math.floor(canvas.width / 53), // 52 weeks + 1 for padding
      Math.floor(canvas.height / 8), // 7 days + 1 for padding
    )

    // Calculate start position
    const startX = (canvas.width - cellSize * 53) / 2
    const startY = (canvas.height - cellSize * 7) / 2

    // Get dates for the last year
    const today = new Date()
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    // Count reviews per day
    const reviewCounts = new Map<string, number>()

    reviewHistory.forEach((review) => {
      const date = new Date(review.reviewedAt)
      if (date >= oneYearAgo) {
        const dateKey = date.toISOString().split("T")[0]
        reviewCounts.set(dateKey, (reviewCounts.get(dateKey) || 0) + 1)
      }
    })

    // Draw heatmap
    let currentDate = new Date(oneYearAgo)

    while (currentDate <= today) {
      const dayOfWeek = currentDate.getDay() // 0 = Sunday, 6 = Saturday
      const weekOffset = Math.floor((currentDate.getTime() - oneYearAgo.getTime()) / (7 * 24 * 60 * 60 * 1000))

      const x = startX + weekOffset * cellSize
      const y = startY + dayOfWeek * cellSize

      const dateKey = currentDate.toISOString().split("T")[0]
      const count = reviewCounts.get(dateKey) || 0

      // Determine color intensity based on count
      let color
      if (count === 0) {
        color = "hsl(var(--muted))"
      } else if (count < 5) {
        color = "hsl(var(--primary) / 0.3)"
      } else if (count < 10) {
        color = "hsl(var(--primary) / 0.5)"
      } else if (count < 20) {
        color = "hsl(var(--primary) / 0.7)"
      } else {
        color = "hsl(var(--primary))"
      }

      // Draw cell
      ctx.fillStyle = color
      ctx.fillRect(x, y, cellSize - 1, cellSize - 1)

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Draw month labels
    ctx.fillStyle = "hsl(var(--foreground))"
    ctx.font = `${cellSize}px sans-serif`
    ctx.textAlign = "center"

    const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
    let lastMonth = -1

    currentDate = new Date(oneYearAgo)
    while (currentDate <= today) {
      const month = currentDate.getMonth()
      const weekOffset = Math.floor((currentDate.getTime() - oneYearAgo.getTime()) / (7 * 24 * 60 * 60 * 1000))

      if (month !== lastMonth) {
        const x = startX + weekOffset * cellSize
        ctx.fillText(months[month], x, startY - cellSize / 2)
        lastMonth = month
      }

      // Move to next week
      currentDate.setDate(currentDate.getDate() + 7)
    }
  }, [reviewHistory])

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
