"use client"

import { motion, useReducedMotion } from "framer-motion"

interface FloatingShapeProps {
  className?: string
  delay?: number
  duration?: number
  size?: number
  color?: string
  type?: "circle" | "square" | "triangle" | "blob"
}

export function FloatingShape({
  className,
  delay = 0,
  duration = 20,
  size = 100,
  color = "#288132",
  type = "blob",
}: FloatingShapeProps) {
  const prefersReducedMotion = useReducedMotion()

  const floatAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -10, 0], // Reduced from [0, -15, 0]
        x: [0, 5, 0], // Reduced from [0, 10, 0]
        rotate: [0, 3, 0], // Reduced from [0, 5, 0]
      }

  const getShape = () => {
    switch (type) {
      case "circle":
        return (
          <motion.div
            className={`rounded-full opacity-5 ${className}`} // Changed from opacity-10
            style={{ width: size, height: size, backgroundColor: color }}
          />
        )
      case "square":
        return (
          <motion.div
            className={`rounded-lg opacity-5 ${className}`} // Changed from opacity-10
            style={{ width: size, height: size, backgroundColor: color }}
          />
        )
      case "triangle":
        return (
          <motion.div
            className={`opacity-5 ${className}`} // Changed from opacity-10
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        )
      case "blob":
      default:
        return (
          <motion.svg
            viewBox="0 0 200 200"
            className={`opacity-5 ${className}`} // Changed from opacity-10
            style={{ width: size, height: size }}
          >
            <path
              fill={color}
              d="M42.7,-62.9C53.9,-52.7,61.2,-38.5,65.9,-23.7C70.5,-8.9,72.5,6.4,68.6,20.2C64.7,34,54.8,46.2,42.3,54.3C29.8,62.4,14.9,66.3,-0.2,66.6C-15.4,66.9,-30.8,63.5,-42.8,55.1C-54.8,46.7,-63.5,33.4,-68.1,18.1C-72.7,2.8,-73.3,-14.4,-67.1,-28.7C-60.9,-43,-48,-54.3,-34.5,-63.7C-21,-73.1,-7,-80.6,5.4,-78.1C17.8,-75.6,31.5,-73.1,42.7,-62.9Z"
              transform="translate(100 100)"
            />
          </motion.svg>
        )
    }
  }

  return (
    <motion.div
      className="pointer-events-none absolute z-0"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.1,
        ...floatAnimation,
      }}
      transition={{
        opacity: { duration: 1, delay },
        y: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration,
          ease: "easeInOut",
          delay,
        },
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: duration * 1.3,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: duration * 1.7,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {getShape()}
    </motion.div>
  )
}
