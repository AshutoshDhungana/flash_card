"use client"

import type React from "react"

import { useState } from "react"
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

interface CardCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deckId: string
}

export function CardCreateDialog({ open, onOpenChange, deckId }: CardCreateDialogProps) {
  const { toast } = useToast()
  const { addCard } = useCardStore()

  const [front, setFront] = useState("")
  const [back, setBack] = useState("")

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

    const newCard = {
      id: crypto.randomUUID(),
      deckId,
      front: front.trim(),
      back: back.trim(),
      difficulty: 0.3, // Initial difficulty
      nextReview: new Date().toISOString(),
      reviewHistory: [],
      createdAt: new Date().toISOString(),
    }

    addCard(newCard)

    toast({
      title: "Card created",
      description: "Your new flashcard has been created successfully.",
    })

    // Reset form
    setFront("")
    setBack("")

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription>Create a new flashcard for your deck.</DialogDescription>
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
            <Button type="submit">Create Card</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
