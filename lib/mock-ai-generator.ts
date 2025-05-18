/**
 * Mock implementation of an AI flashcard generator
 * In a real app, this would call an AI service like OpenAI
 */

/**
 * Generate flashcards from text
 *
 * @param text The text to generate flashcards from
 * @returns Array of flashcards with front and back
 */
export async function mockGenerateFlashcards(text: string): Promise<Array<{ front: string; back: string }>> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate some mock flashcards based on the input text
  const cards = []

  // If the text contains certain keywords, generate relevant cards
  if (text.toLowerCase().includes("javascript")) {
    cards.push(
      {
        front: "What is a closure in JavaScript?",
        back: "A closure is a function that has access to its own scope, the scope of the outer function, and the global scope.",
      },
      {
        front: "What is the difference between let and var?",
        back: "let is block-scoped, while var is function-scoped. let was introduced in ES6 and is generally preferred over var.",
      },
      {
        front: "What is the purpose of the 'this' keyword in JavaScript?",
        back: "The 'this' keyword refers to the object it belongs to. In a method, 'this' refers to the owner object. In a function, 'this' refers to the global object.",
      },
    )
  }

  if (text.toLowerCase().includes("react")) {
    cards.push(
      {
        front: "What is JSX?",
        back: "JSX is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML in your React code.",
      },
      {
        front: "What is the virtual DOM?",
        back: "The virtual DOM is a lightweight copy of the actual DOM that React uses to improve performance by minimizing direct DOM manipulation.",
      },
      {
        front: "What are React hooks?",
        back: "Hooks are functions that let you use state and other React features in functional components instead of class components.",
      },
    )
  }

  if (text.toLowerCase().includes("python")) {
    cards.push(
      {
        front: "What is a list comprehension in Python?",
        back: "A list comprehension is a concise way to create lists in Python using a single line of code with a for loop and optional conditions.",
      },
      {
        front: "What is the difference between a tuple and a list in Python?",
        back: "Tuples are immutable (cannot be changed after creation) while lists are mutable. Tuples use parentheses () while lists use square brackets [].",
      },
      {
        front: "What are decorators in Python?",
        back: "Decorators are functions that modify the behavior of other functions or methods without changing their source code.",
      },
    )
  }

  // If no specific keywords were found or we need more cards, add generic ones
  if (cards.length < 5) {
    cards.push(
      {
        front: "What is spaced repetition?",
        back: "Spaced repetition is a learning technique that involves reviewing information at increasing intervals to improve long-term retention.",
      },
      {
        front: "What is the forgetting curve?",
        back: "The forgetting curve, discovered by Hermann Ebbinghaus, shows how information is lost over time when there is no attempt to retain it.",
      },
      {
        front: "What is active recall?",
        back: "Active recall is a learning principle that involves actively stimulating memory during the learning process, rather than passively reviewing information.",
      },
      {
        front: "What is interleaved practice?",
        back: "Interleaved practice involves mixing different topics or types of problems within a single study session, rather than focusing on one topic at a time.",
      },
      {
        front: "What is the testing effect?",
        back: "The testing effect is the finding that long-term memory is increased when some of the learning period is devoted to retrieving information from memory.",
      },
    )
  }

  // Return a random subset of cards (between 5 and 8)
  const numCards = Math.floor(Math.random() * 4) + 5
  return cards.slice(0, numCards)
}
