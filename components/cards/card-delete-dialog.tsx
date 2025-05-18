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
import { useCardStore } from "@/lib/stores/card-store"
import { useToast } from "@/components/ui/use-toast"

interface CardDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
  deckId: string
}

export function CardDeleteDialog({ open, onOpenChange, cardId, deckId }: CardDeleteDialogProps) {
  const { toast } = useToast()
  const { deleteCard } = useCardStore()

  const handleDelete = () => {
    deleteCard(cardId)

    toast({
      title: "Card deleted",
      description: "Your flashcard has been deleted.",
    })

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this flashcard? This action cannot be undone.
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
