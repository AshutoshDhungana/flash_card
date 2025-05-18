"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import type { Deck } from "@/lib/types"
import { useCardStore } from "@/lib/stores/card-store"
import { motion } from "framer-motion"

interface DeckGridProps {
  decks: Deck[]
}

export function DeckGrid({ decks }: DeckGridProps) {
  const { getCardsByDeckId, getDueCardCount } = useCardStore()

  if (decks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No decks found</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Create your first deck to start learning</p>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck, index) => {
        const cards = getCardsByDeckId(deck.id)
        const dueCardCount = getDueCardCount(deck.id)
        const lastReviewed = deck.lastReviewed ? new Date(deck.lastReviewed).toLocaleDateString() : "Never"

        return (
          <motion.div
            key={deck.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col premium-card">
              <CardHeader className="pb-2 bg-muted/30">
                <CardTitle>{deck.name}</CardTitle>
                <CardDescription>{deck.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {deck.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="premium-badge bg-primary/10 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cards:</span>
                    <span>{cards.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due for review:</span>
                    <span className={dueCardCount > 0 ? "font-medium text-primary" : ""}>{dueCardCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last reviewed:</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lastReviewed}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Button className="w-full premium-button" asChild>
                  <Link href={`/decks/${deck.id}`}>
                    Open Deck
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
