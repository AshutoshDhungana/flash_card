"use client"
import { useCardStore } from "@/lib/stores/card-store"
import type { Deck } from "@/lib/types"

interface DeckHeaderProps {
  deck: Deck
}

export function DeckHeader({ deck }: DeckHeaderProps) {
  const { getCardsByDeckId } = useCardStore()
  const cards = getCardsByDeckId(deck.id)

  return (
    <div>
      <h1 className="text-3xl font-bold">{deck.name}</h1>
      <p className="text-muted-foreground mt-1">{deck.description}</p>
      <div className="flex gap-4 mt-2">
        <div className="text-sm">
          <span className="text-muted-foreground">Cards:</span> {cards.length}
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Created:</span> {new Date(deck.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
