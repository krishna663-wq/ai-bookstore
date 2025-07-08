"use client"

import type { ReactNode } from "react"

interface CursorWrapperProps {
  children: ReactNode
  variant?: "hover" | "text" | "book" | "heart" | "sparkle"
  className?: string
}

export function CursorWrapper({ children, variant = "hover", className = "" }: CursorWrapperProps) {
  const getCursorClass = () => {
    switch (variant) {
      case "text":
        return "cursor-text"
      case "book":
        return "cursor-book"
      case "heart":
        return "cursor-heart"
      case "sparkle":
        return "cursor-sparkle"
      default:
        return "cursor-hover"
    }
  }

  return <div className={`${getCursorClass()} ${className}`}>{children}</div>
}
