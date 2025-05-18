"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { CardList } from "@/components/cards/card-list"
import { CardCreateDialog } from "@/components/cards/card-create-dialog"
import { DeckEditDialog } from "@/components/decks/deck-edit-dialog"
import { DeckDeleteDialog } from "@/components/decks/deck-delete-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function DeckDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const deckId = params.id as string
  const { getDeckById, deleteDeck } = useDeckStore()
  const { getCardsByDeckId, getDueCardCount } = useCardStore()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const deck = getDeckById(deckId)
  const cards = getCardsByDeckId(deckId)
  const dueCardCount = getDueCardCount(deckId)

  useEffect(() => {
    if (!deck) {
      router.push("/decks")
    }
  }, [deck, router])

  if (!deck) return null

  const handleStartReview = () => {
    if (dueCardCount === 0) {
      toast({
        title: "No cards due for review",
        description: "All caught up! Try adding more cards or check back later.",
        variant: "default",
      })
      return
    }
    router.push(`/review/${deckId}`)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.push("/decks")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Decks
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{deck.name}</h1>
            <p className="text-muted-foreground mt-1">{deck.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {deck.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{cards.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Due for Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dueCardCount}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartReview} disabled={dueCardCount === 0}>
                Start Review
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Mastery Progress</CardTitle>
              <CardDescription>Based on card difficulty levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">
                  {cards.length > 0
                    ? Math.round((cards.filter((c) => c.difficulty >= 0.8).length / cards.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <Progress
                value={cards.length > 0 ? (cards.filter((c) => c.difficulty >= 0.8).length / cards.length) * 100 : 0}
              />
            </CardContent>
          </Card>
        </div>

        <CardList cards={cards} deckId={deckId} />

        <CardCreateDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} deckId={deckId} />

        <DeckEditDialog open={isEditOpen} onOpenChange={setIsEditOpen} deck={deck} />

        <DeckDeleteDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          deckId={deckId}
          onDelete={() => router.push("/decks")}
        />
      </div>
    </div>
  )
}
