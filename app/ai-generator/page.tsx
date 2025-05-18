"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Lightbulb, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { useToast } from "@/components/ui/use-toast"
import { GeneratedCard } from "@/components/ai-generator/generated-card"
import { mockGenerateFlashcards } from "@/lib/mock-ai-generator"

export default function AIGeneratorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { decks, addDeck } = useDeckStore()
  const { addCard } = useCardStore()

  const [inputText, setInputText] = useState("")
  const [selectedDeckId, setSelectedDeckId] = useState<string>("")
  const [newDeckName, setNewDeckName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCards, setGeneratedCards] = useState<Array<{ front: string; back: string }>>([])
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set())

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to generate flashcards.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call an AI service
      const cards = await mockGenerateFlashcards(inputText)
      setGeneratedCards(cards)

      // Select all cards by default
      setSelectedCards(new Set(cards.map((_, index) => index)))

      toast({
        title: "Flashcards generated",
        description: `Successfully generated ${cards.length} flashcards.`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleCardSelection = (index: number) => {
    const newSelection = new Set(selectedCards)
    if (newSelection.has(index)) {
      newSelection.delete(index)
    } else {
      newSelection.add(index)
    }
    setSelectedCards(newSelection)
  }

  const handleSaveCards = () => {
    if (selectedCards.size === 0) {
      toast({
        title: "No cards selected",
        description: "Please select at least one card to save.",
        variant: "destructive",
      })
      return
    }

    if (!selectedDeckId && !newDeckName) {
      toast({
        title: "Deck required",
        description: "Please select an existing deck or create a new one.",
        variant: "destructive",
      })
      return
    }

    let targetDeckId = selectedDeckId

    // Create new deck if needed
    if (!selectedDeckId && newDeckName) {
      const newDeck = {
        id: crypto.randomUUID(),
        name: newDeckName,
        description: `Generated from AI on ${new Date().toLocaleDateString()}`,
        tags: ["ai-generated"],
        cardCount: 0,
        createdAt: new Date().toISOString(),
        lastReviewed: null,
      }

      addDeck(newDeck)
      targetDeckId = newDeck.id
    }

    // Add selected cards to the deck
    const cardsToAdd = Array.from(selectedCards).map((index) => generatedCards[index])

    cardsToAdd.forEach((card) => {
      addCard({
        id: crypto.randomUUID(),
        deckId: targetDeckId,
        front: card.front,
        back: card.back,
        difficulty: 0.3, // Initial difficulty
        nextReview: new Date().toISOString(),
        reviewHistory: [],
        createdAt: new Date().toISOString(),
      })
    })

    toast({
      title: "Cards saved",
      description: `Successfully added ${cardsToAdd.length} cards to your deck.`,
    })

    // Reset state
    setGeneratedCards([])
    setSelectedCards(new Set())
    setInputText("")

    // Navigate to the deck
    router.push(`/decks/${targetDeckId}`)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would process the file
    // For now, we'll just show a toast
    toast({
      title: "File uploaded",
      description: "This is a mock implementation. In a real app, the file would be processed.",
    })

    // Mock some text from the file
    setInputText(
      "This is sample text extracted from your uploaded document. In a real application, the actual content of your document would be processed and displayed here for generating flashcards.",
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Flashcard Generator</h1>
          <p className="text-muted-foreground mt-1">Generate flashcards from text or documents using AI</p>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="text">
              <FileText className="mr-2 h-4 w-4" />
              Text Input
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate from Text</CardTitle>
                <CardDescription>Paste text content to generate flashcards</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your text here... (e.g., lecture notes, article, book chapter)"
                  className="min-h-[200px]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerate} disabled={isGenerating || !inputText.trim()} className="ml-auto">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Generate Flashcards
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>Upload a PDF or text document to generate flashcards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                  <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Upload your document</h3>
                  <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOCX, and TXT files up to 10MB</p>
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Choose File
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {generatedCards.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Generated Flashcards</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCards(new Set(generatedCards.map((_, i) => i)))}
                >
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedCards(new Set())}>
                  Deselect All
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generatedCards.map((card, index) => (
                <GeneratedCard
                  key={index}
                  card={card}
                  isSelected={selectedCards.has(index)}
                  onToggleSelect={() => toggleCardSelection(index)}
                />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Save Selected Cards</CardTitle>
                <CardDescription>Choose a deck to save the selected cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="existing-deck">Add to existing deck</Label>
                    <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
                      <SelectTrigger id="existing-deck">
                        <SelectValue placeholder="Select a deck" />
                      </SelectTrigger>
                      <SelectContent>
                        {decks.map((deck) => (
                          <SelectItem key={deck.id} value={deck.id}>
                            {deck.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="mx-4 text-sm text-muted-foreground">OR</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  <div>
                    <Label htmlFor="new-deck">Create new deck</Label>
                    <Input
                      id="new-deck"
                      placeholder="Enter new deck name"
                      value={newDeckName}
                      onChange={(e) => setNewDeckName(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveCards}
                  disabled={selectedCards.size === 0 || (!selectedDeckId && !newDeckName)}
                  className="ml-auto"
                >
                  Save {selectedCards.size} Cards
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
