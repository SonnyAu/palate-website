"use client"

import { motion, useReducedMotion } from "framer-motion"

interface WaveBackgroundProps {
  className?: string
}

export function WaveBackground({ className }: WaveBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wave-background.png')" }}
        initial={{ scale: 1 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.01, 1], // Reduced from [1, 1.02, 1]
              }
        }
        transition={{
          duration: 25, // Increased from 20
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
