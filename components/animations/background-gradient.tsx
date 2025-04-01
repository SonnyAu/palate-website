"use client"

import { motion, useReducedMotion } from "framer-motion"

interface BackgroundGradientProps {
  className?: string
  colorStart?: string
  colorEnd?: string
  duration?: number
}

export function BackgroundGradient({
  className,
  colorStart = "#FDE8C5",
  colorEnd = "#F5D9B0",
  duration = 10,
}: BackgroundGradientProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 -z-10 h-full w-full ${className}`}
        style={{ backgroundColor: colorStart }}
      />
    )
  }

  return (
    <motion.div
      className={`absolute inset-0 -z-10 h-full w-full ${className}`}
      animate={{
        background: [
          `radial-gradient(circle at 15% 25%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 45% 60%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 75% 35%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 15% 25%, ${colorStart} 0%, ${colorEnd} 100%)`,
        ],
      }}
      transition={{
        duration: 15, // Increased from 10
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  )
}
