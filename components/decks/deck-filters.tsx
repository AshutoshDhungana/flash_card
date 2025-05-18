"use client"

import { useDeckStore } from "@/lib/stores/deck-store"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface DeckFiltersProps {
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
}

export function DeckFilters({ activeFilter, setActiveFilter }: DeckFiltersProps) {
  const { decks } = useDeckStore()

  // Get unique tags from all decks
  const allTags = Array.from(new Set(decks.flatMap((deck) => deck.tags))).sort()

  const handleFilterClick = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null)
    } else {
      setActiveFilter(filter)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={activeFilter === "recent" ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => handleFilterClick("recent")}
      >
        <Clock className="mr-1 h-3 w-3" />
        Recent
      </Badge>

      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant={activeFilter === tag ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => handleFilterClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
