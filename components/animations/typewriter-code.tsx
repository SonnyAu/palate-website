"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface TypewriterCodeProps {
  code?: string
  language?: string
  typingSpeed?: number
  className?: string
  showLineNumbers?: boolean
  loop?: boolean
  pauseBetweenLoops?: number
}

export function TypewriterCode({
  code = `fetch("https://api.example.com/v1/restaurants", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
  language = "javascript",
  typingSpeed = 30, // ms per character
  className = "",
  showLineNumbers = false,
  loop = false,
  pauseBetweenLoops = 3000, // ms to pause before restarting the loop
}: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  const [loopCount, setLoopCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Calculate the maximum line length for width determination
  const maxLineLength = code
    .split("\n")
    .reduce((max, line) => Math.max(max, line.length), 0)

  // Format code with syntax highlighting
  const formatCode = (text: string) => {
    // First, escape HTML entities
    let highlighted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")

    // Highlight the URL
    highlighted = highlighted.replace(
      /(fetch\()("https:\/\/api\.example\.com\/v1\/restaurants")/,
      '$1<span style="color: #ecc94b">$2</span>'
    )

    // Highlight the method
    highlighted = highlighted.replace(
      /("GET")/,
      '<span style="color: #f56565">$1</span>'
    )

    // Highlight the header keys and values
    highlighted = highlighted.replace(
      /("Authorization")(:)(\s*)("Bearer YOUR_API_KEY")/,
      '<span style="color: #ecc94b">$1</span>$2$3<span style="color: #ecc94b">$4</span>'
    )

    highlighted = highlighted.replace(
      /("Content-Type")(:)(\s*)("application\/json")/,
      '<span style="color: #ecc94b">$1</span>$2$3<span style="color: #ecc94b">$4</span>'
    )

    // Highlight method and keywords
    highlighted = highlighted.replace(
      /\b(method|headers)\b/g,
      '<span style="color: #63b3ed">$1</span>'
    )
    highlighted = highlighted.replace(
      /\b(fetch|then|response|json|data|console|log)\b/g,
      '<span style="color: #63b3ed">$1</span>'
    )

    return highlighted
  }

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setDisplayedCode(code)
      setIsTyping(false)
      return
    }

    // Only start typing when in view
    if (!isInView) return

    // Reset if code changes
    if (currentIndex === 0) {
      setDisplayedCode("")
    }

    // If paused between loops, don't type
    if (isPaused) return

    // Type out the code character by character
    if (currentIndex < code.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (currentIndex >= code.length) {
      // Finished typing
      setIsTyping(false)

      // If looping is enabled, reset after pause
      if (loop) {
        const pauseTimeout = setTimeout(() => {
          setIsPaused(true)
          setLoopCount((prev) => prev + 1)

          // After pause, reset and start typing again
          const resetTimeout = setTimeout(() => {
            setCurrentIndex(0)
            setDisplayedCode("")
            setIsTyping(true)
            setIsPaused(false)
          }, pauseBetweenLoops)

          return () => clearTimeout(resetTimeout)
        }, 1000) // Short pause before clearing

        return () => clearTimeout(pauseTimeout)
      }
    }
  }, [
    code,
    currentIndex,
    isTyping,
    typingSpeed,
    isInView,
    prefersReducedMotion,
    loop,
    pauseBetweenLoops,
    isPaused,
  ])

  // Generate line numbers if needed
  const lineNumbers = showLineNumbers
    ? code.split("\n").map((_, i) => (
        <div key={i} className="w-8 select-none pr-4 text-right text-gray-500">
          {i + 1}
        </div>
      ))
    : null

  // Calculate approximate width based on character count (ch unit)
  // Add some padding to account for syntax highlighting elements
  const codeWidth = maxLineLength + 2

  return (
    <div
      ref={containerRef}
      className={`hover:shadow-2xl/80 rounded-lg bg-[#27292A] p-4 font-mono text-xs shadow-2xl transition-shadow duration-300 sm:p-6 sm:text-sm ${className}`}
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      <div className="flex">
        {showLineNumbers && (
          <div className="flex shrink-0 flex-col">{lineNumbers}</div>
        )}
        <div
          className="overflow-x-auto"
          style={{ width: `${codeWidth}ch`, maxWidth: "100%" }}
        >
          <pre className="whitespace-pre text-white" style={{ width: "100%" }}>
            <code
              dangerouslySetInnerHTML={{ __html: formatCode(displayedCode) }}
            />
            {isTyping && isInView && !prefersReducedMotion && (
              <motion.span
                className="ml-0.5 inline-block h-4 w-2 bg-white"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
