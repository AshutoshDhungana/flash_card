"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { useToast } from "@/components/ui/use-toast"

interface DeckDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deckId: string
  onDelete?: () => void
}

export function DeckDeleteDialog({ open, onOpenChange, deckId, onDelete }: DeckDeleteDialogProps) {
  const { toast } = useToast()
  const { deleteDeck } = useDeckStore()
  const { deleteCardsByDeckId } = useCardStore()

  const handleDelete = () => {
    // Delete all cards in the deck
    deleteCardsByDeckId(deckId)

    // Delete the deck
    deleteDeck(deckId)

    toast({
      title: "Deck deleted",
      description: "Your deck and all its cards have been deleted.",
    })

    // Close dialog
    onOpenChange(false)

    // Call onDelete callback if provided
    if (onDelete) {
      onDelete()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Deck</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this deck? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
