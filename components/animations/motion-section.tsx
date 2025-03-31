"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface MotionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

