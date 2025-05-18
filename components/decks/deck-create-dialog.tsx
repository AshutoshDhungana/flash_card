"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

interface DeckCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeckCreateDialog({ open, onOpenChange }: DeckCreateDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { addDeck } = useDeckStore()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")

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

    const newDeck = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      cardCount: 0,
      createdAt: new Date().toISOString(),
      lastReviewed: null,
    }

    addDeck(newDeck)

    toast({
      title: "Deck created",
      description: "Your new deck has been created successfully.",
    })

    // Reset form
    setName("")
    setDescription("")
    setTags("")

    // Close dialog
    onOpenChange(false)

    // Navigate to the new deck
    router.push(`/decks/${newDeck.id}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>Create a new flashcard deck to organize your learning materials.</DialogDescription>
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
            <Button type="submit">Create Deck</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
