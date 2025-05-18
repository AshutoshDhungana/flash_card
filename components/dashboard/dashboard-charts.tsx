"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCardStore } from "@/lib/stores/card-store"
import { BarChart } from "@/components/ui/chart"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function DashboardCharts() {
  const { reviewHistory } = useCardStore()
  const [isVisible, setIsVisible] = useState(false)

  // Get the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 6 + i)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  })

  // Mock data for the chart
  // In a real app, this would be calculated from reviewHistory
  const correctData = last7Days.map(() => Math.floor(Math.random() * 20))
  const incorrectData = last7Days.map(() => Math.floor(Math.random() * 10))

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: "Correct",
        data: correctData,
        backgroundColor: "hsl(var(--chart-green))",
        borderRadius: 4,
      },
      {
        label: "Incorrect",
        data: incorrectData,
        backgroundColor: "hsl(var(--chart-red))",
        borderRadius: 4,
      },
    ],
  }

  useEffect(() => {
    // Delay chart visibility for animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Your review performance over the past week</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.7 }}
            className="h-[200px]"
          >
            <BarChart
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                  duration: 1000,
                  easing: "easeOutQuart",
                },
                scales: {
                  x: {
                    stacked: true,
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                      stepSize: 10,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    align: "end",
                    labels: {
                      boxWidth: 12,
                      boxHeight: 12,
                      useBorderRadius: true,
                      borderRadius: 2,
                    },
                  },
                  tooltip: {
                    enabled: true,
                    backgroundColor: "hsl(var(--card))",
                    titleColor: "hsl(var(--card-foreground))",
                    bodyColor: "hsl(var(--card-foreground))",
                    borderColor: "hsl(var(--border))",
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 12,
                    boxHeight: 12,
                    boxPadding: 3,
                    usePointStyle: true,
                    titleFont: {
                      weight: "bold",
                    },
                  },
                },
              }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
