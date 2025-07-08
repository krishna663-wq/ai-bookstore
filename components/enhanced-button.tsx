"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  colorScheme?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "rainbow"
  glowEffect?: boolean
  rippleEffect?: boolean
  children: React.ReactNode
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, colorScheme = "primary", glowEffect = false, rippleEffect = true, children, ...props }, ref) => {
    const colorSchemes = {
      primary: {
        gradient: "from-primary to-purple-600 hover:from-purple-600 hover:to-pink-600",
        glow: "shadow-primary/50",
        text: "text-white",
      },
      secondary: {
        gradient: "from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800",
        glow: "shadow-gray-500/50",
        text: "text-white",
      },
      success: {
        gradient: "from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600",
        glow: "shadow-green-500/50",
        text: "text-white",
      },
      warning: {
        gradient: "from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-red-500",
        glow: "shadow-yellow-500/50",
        text: "text-white",
      },
      danger: {
        gradient: "from-red-500 to-pink-600 hover:from-pink-600 hover:to-rose-600",
        glow: "shadow-red-500/50",
        text: "text-white",
      },
      info: {
        gradient: "from-blue-500 to-cyan-600 hover:from-cyan-600 hover:to-teal-600",
        glow: "shadow-blue-500/50",
        text: "text-white",
      },
      rainbow: {
        gradient:
          "from-pink-500 via-purple-500 to-indigo-500 hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
        glow: "shadow-purple-500/50",
        text: "text-white",
      },
    }

    const scheme = colorSchemes[colorScheme]

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            `bg-gradient-to-r ${scheme.gradient}`,
            scheme.text,
            glowEffect && `shadow-lg hover:shadow-xl ${scheme.glow}`,
            "border-0",
            className,
          )}
          {...props}
        >
          {/* Animated background overlay - only on hover */}
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%", skewX: -15 }}
            whileHover={{
              x: "100%",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          />

          {/* Ripple effect - only on tap */}
          {rippleEffect && (
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{
                scale: 4,
                opacity: [0, 1, 0],
                transition: { duration: 0.4 },
              }}
            />
          )}

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center">{children}</span>

          {/* Glow effect - only on hover */}
          {glowEffect && (
            <motion.div
              className="absolute inset-0 rounded-md opacity-0"
              style={{
                background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
              }}
              whileHover={{
                opacity: 1,
                x: ["-100%", "100%"],
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
            />
          )}
        </Button>
      </motion.div>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"
