"use client"

import Link from "next/link"
import { useCardStore } from "@/lib/stores/card-store"
import { useDeckStore } from "@/lib/stores/deck-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardUpcoming() {
  const { getDueCards } = useCardStore()
  const { decks } = useDeckStore()

  // Get decks with due cards
  const decksWithDueCards = decks
    .map((deck) => {
      const dueCards = getDueCards(deck.id)
      return {
        ...deck,
        dueCardCount: dueCards.length,
      }
    })
    .filter((deck) => deck.dueCardCount > 0)
    .sort((a, b) => b.dueCardCount - a.dueCardCount)
    .slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="mt-6 overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle>Upcoming Reviews</CardTitle>
          <CardDescription>Decks with cards due for review</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {decksWithDueCards.length > 0 ? (
            <div className="space-y-4">
              {decksWithDueCards.map((deck, index) => (
                <motion.div
                  key={deck.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between rounded-lg border p-4 transition-all duration-300 hover:shadow-sm dark:hover:shadow-none hover:border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{deck.name}</p>
                      <p className="text-sm text-muted-foreground">{deck.dueCardCount} cards due for review</p>
                    </div>
                  </div>
                  <Button size="sm" asChild className="group relative overflow-hidden">
                    <Link href={`/review/${deck.id}`}>
                      Review
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-white"></span>
                    </Link>
                  </Button>
                </motion.div>
              ))}

              <div className="flex justify-end">
                <Button variant="outline" asChild className="group relative overflow-hidden">
                  <Link href="/decks">
                    View All Decks
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No cards due for review</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                You're all caught up! Create new decks or add more cards.
              </p>
              <Button asChild className="group relative overflow-hidden">
                <Link href="/decks">
                  Explore Decks
                  <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-white"></span>
                </Link>
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
