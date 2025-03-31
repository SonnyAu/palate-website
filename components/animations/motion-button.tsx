"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { Slot } from "@radix-ui/react-slot"

interface MotionButtonProps extends ButtonProps {
  children: ReactNode
  delay?: number
  asChild?: boolean
}

export function MotionButton({ children, delay = 0, asChild = false, ...props }: MotionButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const Comp = asChild ? Slot : Button

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      className="inline-block"
    >
      <Comp {...props}>{children}</Comp>
    </motion.div>
  )
}

