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

  // Refs for tracking scroll state to avoid re-renders
  const lastScrollY = useRef(window.scrollY)
  const scrollingUp = useRef(false)
  const scrollingDown = useRef(false)
  const isAtEndRef = useRef(false)
  const isAtBeginningRef = useRef(true)
  const isScrollingHorizontally = useRef(false)
  const lastHorizontalScrollTime = useRef(0)
  const unlockTimeout = useRef<NodeJS.Timeout | null>(null)

  // Scroll velocity tracking
  const scrollVelocity = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollTimestamps = useRef<number[]>([])
  const scrollPositions = useRef<number[]>([])

  // Progress tracking for forced scroll (unused after snapping removal)
  const horizontalProgress = useRef(0)
  const isForceScrolling = useRef(false)
  const forceScrollDirection = useRef<"forward" | "backward" | null>(null)

  // Check the horizontal scroll position and update edge flags
  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const maxScroll = container.scrollWidth - container.clientWidth

    horizontalProgress.current = Math.max(
      0,
      Math.min(1, container.scrollLeft / maxScroll)
    )

    // Use a relaxed threshold (10px) to detect edges
    const isAtEnd = Math.abs(maxScroll - container.scrollLeft) < 10
    const isAtBeginning = container.scrollLeft < 10

    if (isAtEnd !== isAtEndRef.current) {
      isAtEndRef.current = isAtEnd
      setReachedEnd(isAtEnd)
    }

    if (isAtBeginning !== isAtBeginningRef.current) {
      isAtBeginningRef.current = isAtBeginning
      setReachedBeginning(isAtBeginning)
    }

    lastHorizontalScrollTime.current = Date.now()
    isScrollingHorizontally.current = true

    setTimeout(() => {
      if (Date.now() - lastHorizontalScrollTime.current > 200) {
        isScrollingHorizontally.current = false
      }
    }, 200)
  }, [])

  // Smooth scrolling remains available if needed but is not auto-triggered
  const smoothScrollTo = useCallback(
    (targetScroll: number, duration = 300) => {
      if (!containerRef.current) return

      const container = containerRef.current
      const startScroll = container.scrollLeft
      const distance = targetScroll - startScroll
      const startTime = performance.now()

      isForceScrolling.current = true

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime

        if (elapsedTime >= duration) {
          container.scrollLeft = targetScroll
          isForceScrolling.current = false
          checkScrollPosition()
          return
        }

        const progress = elapsedTime / duration
        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

        container.scrollLeft = startScroll + distance * easeProgress
        requestAnimationFrame(animateScroll)
      }

      requestAnimationFrame(animateScroll)
    },
    [checkScrollPosition]
  )

  // Handle wheel events to convert vertical scroll to horizontal
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!containerRef.current || !isActive) return

      // If at an edge and scrolling further in that direction, simply disable horizontal mode
      if (
        (isAtEndRef.current && event.deltaY > 0) ||
        (isAtBeginningRef.current && event.deltaY < 0)
      ) {
        setIsActive(false)
        return
      }

      event.preventDefault()

      const container = containerRef.current
      const maxScroll = container.scrollWidth - container.clientWidth
      const baseMultiplier = 0.8

      let damping = 1.0
      if (Math.abs(event.deltaY) > 50) {
        damping = 0.65
      } else if (Math.abs(event.deltaY) < 15) {
        damping = 1.2
      }

      const scrollAmount = event.deltaY * baseMultiplier * damping
      container.scrollLeft += scrollAmount

      if (container.scrollLeft < 10) {
        container.scrollLeft = 0
      } else if (container.scrollLeft > maxScroll - 10) {
        container.scrollLeft = maxScroll
      }

      checkScrollPosition()
    },
    [isActive, checkScrollPosition]
  )

  // Handle touch events for mobile scrolling
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

      if (Math.abs(deltaX) > Math.abs(deltaY)) return

      if (isAtEndRef.current && deltaY > 0) {
        setIsActive(false)
        return
      }

      if (isAtBeginningRef.current && deltaY < 0) {
        setIsActive(false)
        return
      }

      event.preventDefault()

      const baseMultiplier = 0.6
      const scrollAmount = deltaY * baseMultiplier

      container.scrollLeft += scrollAmount

      container.dataset.touchStartX = currentX.toString()
      container.dataset.touchStartY = currentY.toString()

      checkScrollPosition()
    },
    [isActive, checkScrollPosition]
  )

  // Calculate scroll velocity (for future use)
  const updateScrollVelocity = useCallback(() => {
    const now = Date.now()
    const currentScrollY = window.scrollY

    scrollTimestamps.current.push(now)
    scrollPositions.current.push(currentScrollY)

    if (scrollTimestamps.current.length > 4) {
      scrollTimestamps.current.shift()
      scrollPositions.current.shift()
    }

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
        scrollVelocity.current = Math.abs(posDiff / timeDiff) * 2.0
      }
    }

    lastScrollTime.current = now
  }, [])

  // Always allow vertical scroll
  const preventVerticalScroll = useCallback(() => false, [])

  // Activate horizontal mode based solely on visibility.
  // When scrolling quickly, use a slightly lower threshold.
  // Added hysteresis so that once active it remains active until a lower threshold is reached.
  const checkVisibility = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    if (isForceScrolling.current) return

    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
    const visibleRatio = visibleHeight / rect.height

    const activationThreshold = scrollVelocity.current > 0.5 ? 0.85 : 0.9
    const deactivationThreshold = scrollVelocity.current > 0.5 ? 0.8 : 0.85

    if (visibleRatio >= activationThreshold && !isActive) {
      setIsActive(true)
    } else if (visibleRatio < deactivationThreshold && isActive) {
      setIsActive(false)
    }
  }, [isActive])

  // Global scroll handler to update scroll direction, slow vertical scrolling, and check visibility
  const handleGlobalScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (isForceScrolling.current) return

    if (isScrollingHorizontally.current && isActive) {
      if (
        (isAtEndRef.current && scrollingDown.current) ||
        (isAtBeginningRef.current && scrollingUp.current)
      ) {
        // Do nothing
      } else {
        if (preventVerticalScroll()) return
      }
    }

    scrollingUp.current = currentScrollY < lastScrollY.current
    scrollingDown.current = currentScrollY > lastScrollY.current

    const now = Date.now()
    const timeDelta = now - lastScrollTime.current
    if (timeDelta > 0) {
      const instantVelocity =
        Math.abs(currentScrollY - lastScrollY.current) / timeDelta
      scrollVelocity.current =
        scrollVelocity.current * 0.6 + instantVelocity * 0.4
    }

    updateScrollVelocity()

    // Just update the reference without modifying scroll behavior
    lastScrollY.current = currentScrollY
    lastScrollTime.current = now

    checkVisibility()
  }, [checkVisibility, updateScrollVelocity, preventVerticalScroll])

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll, { passive: true })
    window.addEventListener("resize", checkVisibility, { passive: true })

    lastScrollY.current = window.scrollY
    setTimeout(checkVisibility, 100)

    return () => {
      window.removeEventListener("scroll", handleGlobalScroll)
      window.removeEventListener("resize", checkVisibility)
      if (unlockTimeout.current) clearTimeout(unlockTimeout.current)
    }
  }, [handleGlobalScroll, checkVisibility])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isActive) {
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

      checkScrollPosition()
      document.body.classList.add("horizontal-scroll-active")
    } else {
      document.body.classList.remove("horizontal-scroll-active")
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("scroll", checkScrollPosition)
      }
      document.body.classList.remove("horizontal-scroll-active")
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
      initial={{ opacity: 0.9, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  )
}
