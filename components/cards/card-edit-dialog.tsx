"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCardStore } from "@/lib/stores/card-store"
import { useToast } from "@/components/ui/use-toast"
import type { Card } from "@/lib/types"

interface CardEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: Card
}

export function CardEditDialog({ open, onOpenChange, card }: CardEditDialogProps) {
  const { toast } = useToast()
  const { updateCard } = useCardStore()

  const [front, setFront] = useState(card.front)
  const [back, setBack] = useState(card.back)

  // Update form when card changes
  useEffect(() => {
    setFront(card.front)
    setBack(card.back)
  }, [card])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!front.trim() || !back.trim()) {
      toast({
        title: "Fields required",
        description: "Please fill in both the front and back of the card.",
        variant: "destructive",
      })
      return
    }

    const updatedCard = {
      ...card,
      front: front.trim(),
      back: back.trim(),
    }

    updateCard(updatedCard)

    toast({
      title: "Card updated",
      description: "Your flashcard has been updated successfully.",
    })

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
            <DialogDescription>Update your flashcard content.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="front">Front</Label>
              <Textarea
                id="front"
                placeholder="Enter the question or prompt"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="back">Back</Label>
              <Textarea
                id="back"
                placeholder="Enter the answer or explanation"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
