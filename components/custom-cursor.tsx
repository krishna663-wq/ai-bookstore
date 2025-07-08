"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorState {
  variant: "default" | "hover" | "click" | "text" | "book" | "heart" | "sparkle"
  text?: string
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({ variant: "default" })
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Cursor variant handlers
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement

      if (target.matches('button, .cursor-hover, [role="button"], a')) {
        setCursorState({ variant: "hover" })
      } else if (target.matches("input, textarea, [contenteditable], .cursor-text")) {
        setCursorState({ variant: "text" })
      } else if (target.matches(".book-card, .book-item, .cursor-book")) {
        setCursorState({ variant: "book" })
      } else if (target.matches(".heart-button, .wishlist-button, .cursor-heart")) {
        setCursorState({ variant: "heart" })
      } else if (target.matches(".mood-badge, .sparkle-element, .cursor-sparkle")) {
        setCursorState({ variant: "sparkle" })
      } else {
        setCursorState({ variant: "default" })
      }
    }

    const handleMouseDown = () => setCursorState((prev) => ({ ...prev, variant: "click" }))
    const handleMouseUp = () =>
      setCursorState((prev) => ({ ...prev, variant: prev.variant === "click" ? "default" : prev.variant }))

    // Add event listeners
    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleElementHover)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleElementHover)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY])

  const getCursorVariants = () => {
    switch (cursorState.variant) {
      case "hover":
        return {
          scale: 1.5,
          backgroundColor: "rgba(147, 51, 234, 0.8)",
          border: "2px solid rgba(147, 51, 234, 1)",
          mixBlendMode: "difference" as const,
        }
      case "click":
        return {
          scale: 0.8,
          backgroundColor: "rgba(236, 72, 153, 0.9)",
          border: "3px solid rgba(236, 72, 153, 1)",
        }
      case "text":
        return {
          scaleX: 0.3,
          scaleY: 1.5,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          border: "2px solid rgba(59, 130, 246, 1)",
        }
      case "book":
        return {
          scale: 1.8,
          backgroundColor: "rgba(34, 197, 94, 0.7)",
          border: "2px solid rgba(34, 197, 94, 1)",
        }
      case "heart":
        return {
          scale: 1.6,
          backgroundColor: "rgba(244, 63, 94, 0.8)",
          border: "2px solid rgba(244, 63, 94, 1)",
        }
      case "sparkle":
        return {
          scale: 1.4,
          backgroundColor: "rgba(251, 191, 36, 0.8)",
          border: "2px solid rgba(251, 191, 36, 1)",
        }
      default:
        return {
          scale: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
        }
    }
  }

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null // Don't show custom cursor on mobile
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        button, .cursor-hover, [role="button"], a {
          cursor: none !important;
        }
        
        input, textarea, [contenteditable], .cursor-text {
          cursor: none !important;
        }
      `}</style>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          ...getCursorVariants(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "50%",
          translateY: "50%",
        }}
        animate={{
          scale: cursorState.variant === "click" ? 2 : 1,
          backgroundColor:
            cursorState.variant === "hover"
              ? "rgba(147, 51, 234, 0.3)"
              : cursorState.variant === "click"
                ? "rgba(236, 72, 153, 0.4)"
                : cursorState.variant === "text"
                  ? "rgba(59, 130, 246, 0.3)"
                  : cursorState.variant === "book"
                    ? "rgba(34, 197, 94, 0.3)"
                    : cursorState.variant === "heart"
                      ? "rgba(244, 63, 94, 0.3)"
                      : cursorState.variant === "sparkle"
                        ? "rgba(251, 191, 36, 0.3)"
                        : "rgba(255, 255, 255, 0.2)",
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          delay: 0.1,
        }}
      />

      {/* Sparkle effects for special cursors */}
      {cursorState.variant === "sparkle" && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 w-1 h-1 bg-yellow-400 rounded-full pointer-events-none z-[9997]"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              animate={{
                scale: [0, 1, 0],
                x: [0, (i - 1) * 20, (i - 1) * 40],
                y: [0, (i - 1) * 15, (i - 1) * 30],
                opacity: isVisible ? [0, 1, 0] : 0,
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}

      {/* Heart particles for heart cursor */}
      {cursorState.variant === "heart" && (
        <>
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 pointer-events-none z-[9997]"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
              animate={{
                scale: [0, 1, 0],
                y: [0, -20, -40],
                x: [0, (i - 0.5) * 10, (i - 0.5) * 20],
                opacity: isVisible ? [0, 1, 0] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            >
              <div className="w-2 h-2 bg-pink-500 transform rotate-45 relative">
                <div className="absolute w-2 h-2 bg-pink-500 rounded-full -left-1 top-0" />
                <div className="absolute w-2 h-2 bg-pink-500 rounded-full left-0 -top-1" />
              </div>
            </motion.div>
          ))}
        </>
      )}
    </>
  )
}
