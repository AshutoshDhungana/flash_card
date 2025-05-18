"use client"

import { useState } from "react"
import { Moon, Sun, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/lib/stores/user-store"
import { useDeckStore } from "@/lib/stores/deck-store"
import { useCardStore } from "@/lib/stores/card-store"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { resetUserData } = useUserStore()
  const { resetDeckData } = useDeckStore()
  const { resetCardData } = useCardStore()

  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true)
  const [autoAdvance, setAutoAdvance] = useState(false)
  const [showHints, setShowHints] = useState(true)
  const [reviewsPerSession, setReviewsPerSession] = useState(20)

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or a backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    })
  }

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      resetUserData()
      resetDeckData()
      resetCardData()

      toast({
        title: "Data reset",
        description: "All your data has been reset to default.",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="container mx-auto p-4 md:p-6">
      <motion.div variants={item} className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Customize your RecallMaster experience</p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Review Settings
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Data Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-4">
            <motion.div variants={item}>
              <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how RecallMaster looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme-mode">Theme Mode</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setTheme("light")}
                          className="h-10 w-10 rounded-full transition-all duration-300 relative overflow-hidden group"
                        >
                          <Sun className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                          <span className="sr-only">Light Mode</span>
                          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setTheme("dark")}
                          className="h-10 w-10 rounded-full transition-all duration-300 relative overflow-hidden group"
                        >
                          <Moon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                          <span className="sr-only">Dark Mode</span>
                          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          size="icon"
                          onClick={() => setTheme("system")}
                          className="h-10 w-10 rounded-full transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="text-xs font-medium transition-transform duration-200 group-hover:scale-110">
                            OS
                          </span>
                          <span className="sr-only">System Theme</span>
                          <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} className="ml-auto group relative overflow-hidden">
                    Save Changes
                    <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-white"></span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="review" className="mt-4">
            <motion.div variants={item}>
              <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Review Settings</CardTitle>
                  <CardDescription>Customize your flashcard review experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="keyboard-shortcuts">Keyboard Shortcuts</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable keyboard shortcuts during review (K, D, Space)
                        </p>
                      </div>
                      <Switch
                        id="keyboard-shortcuts"
                        checked={keyboardShortcuts}
                        onCheckedChange={setKeyboardShortcuts}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-advance">Auto Advance</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically advance to next card after answering
                        </p>
                      </div>
                      <Switch
                        id="auto-advance"
                        checked={autoAdvance}
                        onCheckedChange={setAutoAdvance}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-hints">Show Hints</Label>
                        <p className="text-sm text-muted-foreground">Display hints and keyboard shortcut reminders</p>
                      </div>
                      <Switch
                        id="show-hints"
                        checked={showHints}
                        onCheckedChange={setShowHints}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reviews-per-session">Cards per Review Session: {reviewsPerSession}</Label>
                    <Slider
                      id="reviews-per-session"
                      min={5}
                      max={50}
                      step={5}
                      value={[reviewsPerSession]}
                      onValueChange={(value) => setReviewsPerSession(value[0])}
                      className="py-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum number of cards to review in a single session
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} className="ml-auto group relative overflow-hidden">
                    Save Changes
                    <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-white"></span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <motion.div variants={item}>
              <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
                <CardHeader className="bg-muted/30 pb-2">
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your flashcard data and application settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Export Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Download all your flashcards and decks as a JSON file
                    </p>
                    <Button variant="outline" className="group relative overflow-hidden">
                      Export All Data
                      <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Import Data</h3>
                    <p className="text-sm text-muted-foreground">Import flashcards and decks from a JSON file</p>
                    <Button variant="outline" className="group relative overflow-hidden">
                      Import Data
                      <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Reset Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Delete all your data and reset the application to default settings
                    </p>
                    <Button variant="destructive" onClick={handleResetData} className="group relative overflow-hidden">
                      Reset All Data
                      <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-white"></span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div variants={item}>
          <Card className="overflow-hidden border transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:border-primary/20">
            <CardHeader className="bg-muted/30 pb-2">
              <CardTitle>About RecallMaster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">RecallMaster</h3>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  v1.0.0
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A spaced repetition flashcard engine designed for students and lifelong learners. Built with Next.js,
                React, and Tailwind CSS.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
