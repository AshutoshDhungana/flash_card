"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface GeneratedCardProps {
  card: {
    front: string
    back: string
  }
  isSelected: boolean
  onToggleSelect: () => void
}

export function GeneratedCard({ card, isSelected, onToggleSelect }: GeneratedCardProps) {
  return (
    <Card className={`overflow-hidden transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardContent className="p-0">
        <div className="flex items-center p-2 bg-muted/50">
          <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect()} className="mr-2" />
          <span className="text-sm font-medium">{isSelected ? "Selected" : "Select card"}</span>
        </div>

        <div className="grid grid-cols-1 divide-y">
          <div className="p-4">
            <div className="text-sm font-medium text-muted-foreground mb-1">Front</div>
            <div className="min-h-[60px]">{card.front}</div>
          </div>
          <div className="p-4">
            <div className="text-sm font-medium text-muted-foreground mb-1">Back</div>
            <div className="min-h-[60px]">{card.back}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
