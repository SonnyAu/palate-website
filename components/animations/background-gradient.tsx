"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

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
    return <div className={`absolute inset-0 -z-10 ${className}`} style={{ backgroundColor: colorStart }} />
  }

  return (
    <motion.div
      className={`absolute inset-0 -z-10 ${className}`}
      animate={{
        background: [
          `radial-gradient(circle at 20% 30%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 40% 70%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 60% 20%, ${colorStart} 0%, ${colorEnd} 100%)`,
          `radial-gradient(circle at 20% 30%, ${colorStart} 0%, ${colorEnd} 100%)`,
        ],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  )
}

