"use client"

import { motion, useReducedMotion } from "framer-motion"

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
  const lighterShade = "#FFF6E0" // Lighter shade of warm pastel gold
  const darkerShade = "#FFD890" // Light honey shade for contrast

  return (
    <div
      className={`absolute inset-0 bottom-0 left-0 right-0 top-0 -z-10 h-full w-full overflow-hidden ${className}`}
      style={{ margin: 0, padding: 0, boxSizing: "border-box" }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: baseColor }}
      />

      {/* Wavy gradient overlay */}
      <motion.div
        className="absolute inset-0 h-full w-full"
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
          maskImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 350 Q 150 250 300 350 Q 450 450 600 350 Q 750 250 900 350 Q 1050 450 1200 350 L 1200 600 L 0 600 Z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: "130% 130%",
          maskRepeat: "repeat",
          maskPosition: "center",
          opacity: 0.4, // Reduced from 0.6
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
        className="absolute inset-0 h-full w-full"
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
          maskImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 200 Q 150 300 300 200 Q 450 100 600 200 Q 750 300 900 200 Q 1050 100 1200 200 L 1200 0 L 0 0 Z' fill='black'/%3E%3C/svg%3E")`,
          maskSize: "150% 150%",
          maskRepeat: "repeat",
          maskPosition: "center",
          opacity: 0.3, // Reduced from 0.5
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
