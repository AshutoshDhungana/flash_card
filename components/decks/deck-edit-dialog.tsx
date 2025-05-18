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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useToast } from "@/components/ui/use-toast"
import type { Deck } from "@/lib/types"

interface DeckEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deck: Deck
}

export function DeckEditDialog({ open, onOpenChange, deck }: DeckEditDialogProps) {
  const { toast } = useToast()
  const { updateDeck } = useDeckStore()

  const [name, setName] = useState(deck.name)
  const [description, setDescription] = useState(deck.description)
  const [tags, setTags] = useState(deck.tags.join(", "))

  // Update form when deck changes
  useEffect(() => {
    setName(deck.name)
    setDescription(deck.description)
    setTags(deck.tags.join(", "))
  }, [deck])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your deck.",
        variant: "destructive",
      })
      return
    }

    const updatedDeck = {
      ...deck,
      name: name.trim(),
      description: description.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    updateDeck(updatedDeck)

    toast({
      title: "Deck updated",
      description: "Your deck has been updated successfully.",
    })

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Deck</DialogTitle>
            <DialogDescription>Update your deck information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter deck name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter deck description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="Enter tags separated by commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Example: math, algebra, equations</p>
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
