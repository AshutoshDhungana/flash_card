/**
 * Implements a simplified version of the SuperMemo-2 (SM-2) algorithm
 * for spaced repetition.
 */

/**
 * Calculate the next review date based on card difficulty and review result
 *
 * @param difficulty Current difficulty of the card (0 to 1)
 * @param isCorrect Whether the review was correct
 * @returns ISO string date for next review
 */
export function calculateNextReview(difficulty: number, isCorrect: boolean): string {
  const now = new Date()

  // Base interval in days
  let interval: number

  if (isCorrect) {
    // If correct, interval increases based on difficulty
    if (difficulty < 0.3) {
      interval = 1 // 1 day
    } else if (difficulty < 0.5) {
      interval = 3 // 3 days
    } else if (difficulty < 0.7) {
      interval = 7 // 1 week
    } else if (difficulty < 0.9) {
      interval = 14 // 2 weeks
    } else {
      interval = 30 // 1 month
    }
  } else {
    // If incorrect, review again soon
    interval = 0.25 + Math.random() * 0.5 // 6-18 hours
  }

  // Add some randomness to prevent cards from always being reviewed together
  const randomFactor = 0.85 + Math.random() * 0.3 // 0.85 to 1.15
  interval *= randomFactor

  // Calculate next review date
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000)

  return nextReview.toISOString()
}
