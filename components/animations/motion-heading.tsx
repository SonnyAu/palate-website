"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface MotionHeadingProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function MotionHeading({ children, className, delay = 0, as = "h2" }: MotionHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const Component = motion[as]

  return (
    <Component
      ref={ref}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

