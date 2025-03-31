"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "framer-motion"

interface TypewriterCodeProps {
  code: string
  language?: string
  typingSpeed?: number
  className?: string
  showLineNumbers?: boolean
}

export function TypewriterCode({
  code,
  language = "javascript",
  typingSpeed = 30, // ms per character
  className = "",
  showLineNumbers = false,
}: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  // Calculate the maximum line length for width determination
  const maxLineLength = code.split("\n").reduce((max, line) => Math.max(max, line.length), 0)

  // Format code with syntax highlighting
  const formatCode = (text: string) => {
    // First, escape HTML entities
    let highlighted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    // Highlight the URL
    highlighted = highlighted.replace(
      /(fetch\()("https:\/\/api\.example\.com\/v1\/restaurants")/,
      '$1<span style="color: #ecc94b">$2</span>',
    )

    // Highlight the method
    highlighted = highlighted.replace(/("GET")/, '<span style="color: #f56565">$1</span>')

    // Highlight the header keys and values
    highlighted = highlighted.replace(
      /("Authorization")(:)(\s*)("Bearer YOUR_API_KEY")/,
      '<span style="color: #ecc94b">$1</span>$2$3<span style="color: #ecc94b">$4</span>',
    )

    highlighted = highlighted.replace(
      /("Content-Type")(:)(\s*)("application\/json")/,
      '<span style="color: #ecc94b">$1</span>$2$3<span style="color: #ecc94b">$4</span>',
    )

    // Highlight method and keywords
    highlighted = highlighted.replace(/\b(method|headers)\b/g, '<span style="color: #63b3ed">$1</span>')
    highlighted = highlighted.replace(
      /\b(fetch|then|response|json|data|console|log)\b/g,
      '<span style="color: #63b3ed">$1</span>',
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

    // Type out the code character by character
    if (currentIndex < code.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else if (currentIndex >= code.length) {
      setIsTyping(false)
    }
  }, [code, currentIndex, isTyping, typingSpeed, isInView, prefersReducedMotion])

  // Generate line numbers if needed
  const lineNumbers = showLineNumbers
    ? code.split("\n").map((_, i) => (
        <div key={i} className="select-none text-gray-500 text-right pr-4 w-8">
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
      className={`font-mono text-sm rounded-lg bg-[#27292A] p-6 shadow-2xl hover:shadow-2xl/80 transition-shadow duration-300 ${className}`}
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      <div className="flex">
        {showLineNumbers && <div className="flex flex-col flex-shrink-0">{lineNumbers}</div>}
        <div className="overflow-x-auto" style={{ width: `${codeWidth}ch` }}>
          <pre className="text-white whitespace-pre" style={{ width: "100%" }}>
            <code dangerouslySetInnerHTML={{ __html: formatCode(displayedCode) }} />
            {isTyping && isInView && !prefersReducedMotion && (
              <motion.span
                className="inline-block w-2 h-4 bg-white ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}

