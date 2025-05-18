"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeckGrid } from "@/components/decks/deck-grid"
import { DeckCreateDialog } from "@/components/decks/deck-create-dialog"
import { useDeckStore } from "@/lib/stores/deck-store"
import { DeckFilters } from "@/components/decks/deck-filters"

export default function DecksPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const { decks } = useDeckStore()
  const router = useRouter()

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (!activeFilter) return matchesSearch

    if (activeFilter === "recent") {
      return matchesSearch && new Date(deck.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }

    return matchesSearch && deck.tags.includes(activeFilter)
  })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Decks</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your flashcard decks</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Deck
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DeckFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        <DeckGrid decks={filteredDecks} />

        <DeckCreateDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      </div>
    </div>
  )
}
