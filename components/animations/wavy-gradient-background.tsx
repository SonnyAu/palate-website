"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

interface WavyGradientBackgroundProps {
  className?: string
  baseColor?: string
}

export function WavyGradientBackground({
  className,
  baseColor = "#FFEBB5", // Updated from #FFF8E8 to warm pastel gold
}: WavyGradientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  // Slightly darker and lighter shades of the base color for the gradient
  const lighterShade = "#FFF2D0" // Lighter shade of warm pastel gold
  const darkerShade = "#FFE1A8" // Light honey shade for contrast

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ backgroundColor: baseColor }} />

      {/* Wavy gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
        linear-gradient(
          to right,
          ${lighterShade} 0%,
          ${darkerShade} 25%,
          ${lighterShade} 50%,
          ${darkerShade} 75%,
          ${lighterShade} 100%
        )
      `,
          maskImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 300 Q 150 150 300 300 Q 450 450 600 300 Q 750 150 900 300 Q 1050 450 1200 300 L 1200 600 L 0 600 Z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          opacity: 0.4,
        }}
        initial={{ opacity: 0.3 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 0%", "100% 0%"],
                opacity: [0.3, 0.4, 0.3],
              }
        }
        transition={{
          backgroundPosition: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          },
          opacity: {
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />

      {/* Second wavy layer with different wave pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
        linear-gradient(
          to left,
          ${lighterShade} 0%,
          ${darkerShade} 25%,
          ${lighterShade} 50%,
          ${darkerShade} 75%,
          ${lighterShade} 100%
        )
      `,
          maskImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 150 Q 150 300 300 150 Q 450 0 600 150 Q 750 300 900 150 Q 1050 0 1200 150 L 1200 0 L 0 0 Z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: "120% 120%",
          maskRepeat: "no-repeat",
          opacity: 0.3,
        }}
        initial={{ opacity: 0.2 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 0%", "100% 0%"],
                opacity: [0.2, 0.3, 0.2],
              }
        }
        transition={{
          backgroundPosition: {
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          },
          opacity: {
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      />
    </div>
  )
}

