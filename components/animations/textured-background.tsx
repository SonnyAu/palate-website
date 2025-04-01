"use client"

import { motion, useReducedMotion } from "framer-motion"

interface TexturedBackgroundProps {
  className?: string
  baseColor?: string
}

export function TexturedBackground({
  className,
  baseColor = "#FDE8C5",
}: TexturedBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: baseColor }}
      />
      <motion.div
        className="absolute inset-0 h-full w-full opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23333333' fillOpacity='0.08' fillRule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
        initial={{ opacity: 0.03 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                opacity: [0.08, 0.12, 0.08],
              }
        }
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 h-full w-full opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.06) 0%, transparent 60%), 
                radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.04) 0%, transparent 60%)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0.03 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                opacity: [0.06, 0.1, 0.06],
              }
        }
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
