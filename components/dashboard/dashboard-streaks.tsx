"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/lib/stores/user-store";
import { Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

export function DashboardStreaks() {
  const { streakData } = useUserStore();
  const { currentStreak, longestStreak, lastReviewDate } = streakData;

  // Format the last review date
  const formattedLastReview = lastReviewDate
    ? new Date(lastReviewDate).toLocaleDateString()
    : "Never";

  // Use a deterministic pattern for the streak calendar
  const activeStreak = useMemo(() => {
    // Create a stable pattern based on indices
    // This ensures server and client render the same result
    return [false, true, false, true, true, false, true];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle>Streak Stats</CardTitle>
          <CardDescription>Your learning consistency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold">{currentStreak} days</p>
            </div>
          </motion.div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Longest Streak</span>
              <span className="font-medium">{longestStreak} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Last Review</span>
              <span className="font-medium">{formattedLastReview}</span>
            </div>
          </div>

          <div className="rounded-lg border p-3 transition-all duration-300 hover:shadow-sm dark:hover:shadow-none hover:border-primary/20">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Streak Calendar</span>
            </div>
            <div className="mt-3 flex justify-between">
              {Array.from({ length: 7 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 6 + i);
                const dayName = date
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .charAt(0);
                const isActive = activeStreak[i]; // Use the stable pattern

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-xs text-muted-foreground">
                      {dayName}
                    </div>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                      className={`mt-1 h-6 w-6 rounded-sm ${
                        isActive ? "bg-primary shadow-sm" : "bg-muted"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
