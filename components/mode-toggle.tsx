"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative overflow-hidden group">
        <span className="sr-only">Toggle theme</span>
        <div className="h-[1.2rem] w-[1.2rem] bg-muted rounded-full"></div>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group bg-background border-border hover:bg-accent hover:text-accent-foreground"
        >
          {currentTheme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all duration-300" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all duration-300" />
          )}
          <span className="sr-only">Toggle theme</span>
          <span className="absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-10 bg-primary"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-0 zoom-in-95 duration-100 border border-border bg-popover shadow-lg rounded-lg p-1"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${currentTheme === "light" ? "bg-accent" : "hover:bg-accent"}`}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${currentTheme === "dark" ? "bg-accent" : "hover:bg-accent"}`}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${theme === "system" ? "bg-accent" : "hover:bg-accent"}`}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M14 15v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 15v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 19h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
