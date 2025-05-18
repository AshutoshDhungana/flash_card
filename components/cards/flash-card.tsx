"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface FlashCardProps {
  front: string
  back: string
  isFlipped: boolean
  onFlip: () => void
}

export function FlashCard({ front, back, isFlipped, onFlip }: FlashCardProps) {
  const [mounted, setMounted] = useState(false)

  // Prevent animation on initial render
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-full max-w-xl perspective-1000 cursor-pointer" onClick={onFlip}>
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d ${
          mounted && isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <AnimatePresence>
          <Card className="w-full min-h-[300px] backface-hidden premium-flashcard">
            <CardContent className="flex items-center justify-center p-8 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                key={`front-${isFlipped}`}
                className="text-xl font-medium"
              >
                {front}
              </motion.div>
            </CardContent>
          </Card>
        </AnimatePresence>

        <Card
          className="absolute inset-0 w-full min-h-[300px] backface-hidden rotate-y-180 premium-flashcard"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardContent className="flex items-center justify-center p-8 h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.9 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-xl"
            >
              {back}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Card flip indicator */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: !isFlipped ? 1.2 : 1,
              backgroundColor: !isFlipped ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
          ></motion.div>
          <motion.div
            animate={{
              scale: isFlipped ? 1.2 : 1,
              backgroundColor: isFlipped ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
            className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
          ></motion.div>
        </div>
      </div>
    </div>
  )
}
