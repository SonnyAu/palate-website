"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide the indicator after a period
    const hideTimeout = setTimeout(() => {
      setIsVisible(false)
    }, 6000) // 6 seconds

    return () => {
      clearTimeout(hideTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center rounded-full bg-[#288132] p-3 text-white shadow-lg">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2 }}
            >
              <ChevronRight size={24} />
            </motion.div>
          </div>
          <div className="mt-2 rounded-full bg-[#288132] px-3 py-1 text-sm font-medium text-white shadow-sm">
            Scroll to navigate
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
