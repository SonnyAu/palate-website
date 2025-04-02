"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

interface HorizontalScrollContainerProps {
  children: React.ReactNode
  className?: string
}

export function HorizontalScrollContainer({
  children,
  className = "",
}: HorizontalScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [reachedBeginning, setReachedBeginning] = useState(true)
  const isMobile = useMobile()

  // Use refs for tracking scroll state to avoid re-renders
  const lastScrollY = useRef(0)
  const scrollingUp = useRef(false)
  const scrollingDown = useRef(false)
  const isAtEndRef = useRef(false)
  const isAtBeginningRef = useRef(true)

  // Scroll velocity tracking
  const scrollVelocity = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollTimestamps = useRef<number[]>([])
  const scrollPositions = useRef<number[]>([])

  // Activation threshold tracking
  const wasNearActivationThreshold = useRef(false)
  const activationTimeoutId = useRef<NodeJS.Timeout | null>(null)

  // Check if we've reached the end or beginning of horizontal scrolling
  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const maxScroll = container.scrollWidth - container.clientWidth

    // Use a smaller threshold for more precise detection
    const isAtEnd = Math.abs(maxScroll - container.scrollLeft) < 2
    const isAtBeginning = container.scrollLeft <= 2

    // Only update state if values have changed to prevent unnecessary re-renders
    if (isAtEnd !== isAtEndRef.current) {
      isAtEndRef.current = isAtEnd
      setReachedEnd(isAtEnd)
    }

    if (isAtBeginning !== isAtBeginningRef.current) {
      isAtBeginningRef.current = isAtBeginning
      setReachedBeginning(isAtBeginning)
    }
  }, [])

  // Handle wheel events to convert vertical scroll to horizontal
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!containerRef.current || !isActive) return

      // More aggressive end detection - only allow escape when truly at the end
      if (isAtEndRef.current && event.deltaY > 0) {
        // Add a small buffer to prevent accidental escapes
        const container = containerRef.current
        const maxScroll = container.scrollWidth - container.clientWidth
        const isReallyAtEnd = Math.abs(maxScroll - container.scrollLeft) < 1

        if (isReallyAtEnd) {
          setIsActive(false)
          return
        }
      }

      // More aggressive beginning detection
      if (isAtBeginningRef.current && event.deltaY < 0) {
        // Add a smaller buffer to prevent accidental escapes
        const isReallyAtBeginning = containerRef.current.scrollLeft <= 1

        if (isReallyAtBeginning) {
          return
        }
      }

      // Prevent default scroll behavior
      event.preventDefault()

      // Apply Apple-like damping and slower scrolling
      // Increase the multiplier for faster response
      const baseMultiplier = 0.8 // Increased for more responsive scrolling

      // Apply some damping based on scroll speed
      let damping = 1.0
      if (Math.abs(event.deltaY) > 60) {
        // For fast scrolls, add more resistance
        damping = 0.8
      } else if (Math.abs(event.deltaY) < 20) {
        // For slow, precise scrolls, be more responsive
        damping = 1.3
      }

      // Calculate the final scroll amount
      const scrollAmount = event.deltaY * baseMultiplier * damping

      // Apply the scroll
      containerRef.current.scrollLeft += scrollAmount

      // Check scroll position after scrolling
      checkScrollPosition()
    },
    [isActive, checkScrollPosition]
  )

  // Handle touch events for mobile
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!containerRef.current || !isActive) return

      const touchStartX = event.touches[0].clientX
      const touchStartY = event.touches[0].clientY

      containerRef.current.dataset.touchStartX = touchStartX.toString()
      containerRef.current.dataset.touchStartY = touchStartY.toString()
    },
    [isActive]
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!containerRef.current || !isActive) return

      const container = containerRef.current
      const touchStartX = Number.parseFloat(
        container.dataset.touchStartX || "0"
      )
      const touchStartY = Number.parseFloat(
        container.dataset.touchStartY || "0"
      )

      const currentX = event.touches[0].clientX
      const currentY = event.touches[0].clientY

      const deltaX = touchStartX - currentX
      const deltaY = touchStartY - currentY

      // If horizontal movement is greater, let browser handle it
      if (Math.abs(deltaX) > Math.abs(deltaY)) return

      // Allow normal scrolling at boundaries
      if (
        (isAtBeginningRef.current && deltaY < 0) ||
        (isAtEndRef.current && deltaY > 0)
      ) {
        if (isAtEndRef.current && deltaY > 0) {
          setIsActive(false)
        }
        return
      }

      // Prevent default and scroll horizontally
      event.preventDefault()

      // Apply Apple-like damping for touch
      const baseMultiplier = 0.5 // Slower for touch
      const scrollAmount = deltaY * baseMultiplier

      container.scrollLeft += scrollAmount

      // Update touch positions
      container.dataset.touchStartX = currentX.toString()
      container.dataset.touchStartY = currentY.toString()

      checkScrollPosition()
    },
    [isActive, checkScrollPosition]
  )

  // Calculate scroll velocity
  const updateScrollVelocity = useCallback(() => {
    const now = Date.now()
    const currentScrollY = window.scrollY

    // Add current timestamp and position to arrays
    scrollTimestamps.current.push(now)
    scrollPositions.current.push(currentScrollY)

    // Keep only the last 3 entries for velocity calculation (reduced from 5 for faster response)
    if (scrollTimestamps.current.length > 3) {
      scrollTimestamps.current.shift()
      scrollPositions.current.shift()
    }

    // Calculate velocity if we have at least 2 points
    if (scrollTimestamps.current.length >= 2) {
      const oldestIndex = 0
      const newestIndex = scrollTimestamps.current.length - 1

      const timeDiff =
        scrollTimestamps.current[newestIndex] -
        scrollTimestamps.current[oldestIndex]
      const posDiff =
        scrollPositions.current[newestIndex] -
        scrollPositions.current[oldestIndex]

      if (timeDiff > 0) {
        // Velocity in pixels per millisecond
        scrollVelocity.current = Math.abs(posDiff / timeDiff) * 1.5 // Amplify velocity for better detection
      }
    }

    lastScrollTime.current = now
  }, [])

  // Check if container is in view and should be active
  const checkVisibility = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // Calculate how much of the container is in the viewport
    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
    const visibleRatio = visibleHeight / rect.height

    // More strict activation threshold - only activate when container is ~90% in view
    const isSignificantlyVisible =
      visibleRatio > 0.9 && rect.top < viewportHeight * 0.1

    // Less aggressive threshold for fast scrolling - still require substantial visibility
    const isNearThreshold =
      visibleRatio > 0.7 && rect.top < viewportHeight * 0.3

    // Store current activation state to check if it changes
    const wasActive = isActive

    // More sensitive fast scrolling detection
    const isFastScrolling = scrollVelocity.current > 0.3 // Lower threshold to catch more fast scrolls

    // Clear any existing activation timeout
    if (activationTimeoutId.current) {
      clearTimeout(activationTimeoutId.current)
      activationTimeoutId.current = null
    }

    // Handle normal activation
    if (isSignificantlyVisible && !wasActive) {
      setIsActive(true)

      // When scrolling up and container is at the end, reset scroll position
      if (scrollingUp.current && containerRef.current && isAtEndRef.current) {
        containerRef.current.scrollLeft =
          containerRef.current.scrollWidth - containerRef.current.clientWidth
      }
    }
    // Handle fast scrolling - set a brief timeout to catch the container
    else if (isNearThreshold && !wasActive && isFastScrolling) {
      // Set a flag that we were near the threshold
      wasNearActivationThreshold.current = true

      // Set a timeout to activate the container if we're still near the threshold
      activationTimeoutId.current = setTimeout(() => {
        if (wasNearActivationThreshold.current) {
          // Force the container to be active for fast scrolling
          setIsActive(true)

          // Scroll to the beginning if scrolling down, or end if scrolling up
          if (containerRef.current) {
            if (scrollingDown.current) {
              containerRef.current.scrollLeft = 0
              setReachedBeginning(true)
              isAtBeginningRef.current = true
            } else if (scrollingUp.current) {
              containerRef.current.scrollLeft =
                containerRef.current.scrollWidth -
                containerRef.current.clientWidth
              setReachedEnd(true)
              isAtEndRef.current = true
            }
          }

          // Reset the flag
          wasNearActivationThreshold.current = false
        }
      }, 30) // Shorter timeout to catch fast scrolling more reliably
    }
    // Reset the near threshold flag if we're not near the threshold
    else if (!isNearThreshold) {
      wasNearActivationThreshold.current = false
    }

    // More aggressive deactivation logic - only deactivate when truly out of view or at the end
    if (
      (!isSignificantlyVisible && wasActive && !isAtEndRef.current) ||
      rect.top > viewportHeight * 0.9 ||
      rect.bottom < viewportHeight * 0.1
    ) {
      setIsActive(false)
    }
  }, [isActive])

  // Global scroll handler to detect scroll direction and position
  const handleGlobalScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // More aggressive scroll direction detection
    scrollingUp.current = currentScrollY < lastScrollY.current
    scrollingDown.current = currentScrollY > lastScrollY.current

    // Calculate instantaneous velocity for better fast scroll detection
    const now = Date.now()
    const timeDelta = now - lastScrollTime.current
    if (timeDelta > 0) {
      const instantVelocity =
        Math.abs(currentScrollY - lastScrollY.current) / timeDelta

      // Use a weighted average for smoother velocity tracking
      scrollVelocity.current =
        scrollVelocity.current * 0.7 + instantVelocity * 0.3
    }

    // Update scroll velocity with the traditional method too
    updateScrollVelocity()

    // Store current position for next comparison
    lastScrollY.current = currentScrollY
    lastScrollTime.current = now

    // Check if container should be active
    checkVisibility()
  }, [checkVisibility, updateScrollVelocity])

  // Set up scroll event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll, { passive: true })
    window.addEventListener("resize", checkVisibility, { passive: true })

    // Initial check
    lastScrollY.current = window.scrollY
    checkVisibility()

    return () => {
      window.removeEventListener("scroll", handleGlobalScroll)
      window.removeEventListener("resize", checkVisibility)

      // Clear any pending timeout
      if (activationTimeoutId.current) {
        clearTimeout(activationTimeoutId.current)
      }
    }
  }, [handleGlobalScroll, checkVisibility])

  // Set up container-specific event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isActive) {
      // Add event listeners with non-passive wheel to allow preventDefault
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      })
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      container.addEventListener("scroll", checkScrollPosition, {
        passive: true,
      })

      // Initial position check
      checkScrollPosition()
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("scroll", checkScrollPosition)
      }
    }
  }, [
    isActive,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    checkScrollPosition,
  ])

  return (
    <motion.div
      ref={containerRef}
      className={`horizontal-scroll-container ${className} ${isActive ? "active" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
