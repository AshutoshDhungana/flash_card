"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Search, Trash2 } from "lucide-react"
import type { Card as CardType } from "@/lib/types"
import { CardEditDialog } from "@/components/cards/card-edit-dialog"
import { CardDeleteDialog } from "@/components/cards/card-delete-dialog"

interface CardListProps {
  cards: CardType[]
  deckId: string
}

export function CardList({ cards, deckId }: CardListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingCard, setEditingCard] = useState<CardType | null>(null)
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null)

  const filteredCards = cards.filter(
    (card) =>
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Flashcards ({cards.length})</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredCards.length > 0 ? (
        <div className="space-y-4">
          {filteredCards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Front</div>
                    <div className="min-h-[60px]">{card.front}</div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Back</div>
                    <div className="min-h-[60px]">{card.back}</div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 p-2 bg-muted/50">
                  <Button variant="ghost" size="icon" onClick={() => setEditingCard(card)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeletingCardId(card.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {cards.length === 0
              ? "No cards in this deck yet. Add your first card to get started."
              : "No cards match your search. Try a different query."}
          </p>
        </div>
      )}

      {editingCard && (
        <CardEditDialog
          open={!!editingCard}
          onOpenChange={(open) => !open && setEditingCard(null)}
          card={editingCard}
        />
      )}

      {deletingCardId && (
        <CardDeleteDialog
          open={!!deletingCardId}
          onOpenChange={(open) => !open && setDeletingCardId(null)}
          cardId={deletingCardId}
          deckId={deckId}
        />
      )}
    </div>
  )
}
