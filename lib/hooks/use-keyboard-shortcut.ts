"use client"

import { useEffect } from "react"

/**
 * Hook to handle keyboard shortcuts
 *
 * @param key The key to listen for
 * @param callback The function to call when the key is pressed
 * @param options Additional options
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrl?: boolean
    alt?: boolean
    shift?: boolean
    meta?: boolean
  } = {},
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        (options.ctrl ? e.ctrlKey : true) &&
        (options.alt ? e.altKey : true) &&
        (options.shift ? e.shiftKey : true) &&
        (options.meta ? e.metaKey : true)
      ) {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handler)

    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [key, callback, options])
}
