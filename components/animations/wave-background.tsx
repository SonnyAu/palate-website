"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

interface WaveBackgroundProps {
  className?: string
}

export function WaveBackground({ className }: WaveBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wave-background.png')" }}
        initial={{ scale: 1 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.02, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

