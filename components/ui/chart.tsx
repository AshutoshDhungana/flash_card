"use client"

import type * as React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
  defaults,
} from "chart.js"
import { Bar, Line, Pie, Radar } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// Set default font
defaults.font.family = "Inter, sans-serif"

// Define chart types
type ChartProps = {
  data: ChartData<any, any, any>
  options?: ChartOptions<any>
  className?: string
}

export function BarChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
      />
    </div>
  )
}

export function LineChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
      />
    </div>
  )
}

export function PieChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
      />
    </div>
  )
}

export function RadarChart({ data, options, className }: ChartProps) {
  return (
    <div className={className}>
      <Radar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
      />
    </div>
  )
}

// Export a ChartTooltip component for custom tooltips
export function ChartTooltip({ children }: { children: React.ReactNode }) {
  return <div className="bg-popover text-popover-foreground rounded-md border shadow-md px-3 py-1.5">{children}</div>
}
