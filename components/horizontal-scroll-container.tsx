"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
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
  const isMobile = useMobile()

  // Check if we've reached the end of horizontal scrolling
  function checkIfReachedEnd() {
    if (!containerRef.current) return false

    const container = containerRef.current
    // More precise end detection - we're at the end when scrollLeft is within 5px of the maximum possible scroll
    const maxScroll = container.scrollWidth - container.clientWidth
    const isAtEnd = Math.abs(maxScroll - container.scrollLeft) < 5

    if (isAtEnd !== reachedEnd) {
      setReachedEnd(isAtEnd)
    }
    return isAtEnd
  }

  // Handle wheel events to convert vertical scroll to horizontal
  function handleWheel(event: WheelEvent) {
    if (!containerRef.current || !isActive) return

    const container = containerRef.current
    const isAtBeginning = container.scrollLeft <= 10

    // If we've reached the end and scrolling down, allow normal vertical scrolling
    if (reachedEnd && event.deltaY > 0) {
      // When we've reached the end, deactivate the container to allow normal scrolling
      setIsActive(false)
      return
    }

    // If we're at the beginning and scrolling up, allow normal vertical scrolling
    if (isAtBeginning && event.deltaY < 0) {
      return
    }

    // Prevent default scroll behavior
    event.preventDefault()

    // Scroll horizontally based on vertical scroll input
    // Maintain the same direction (down = right, up = left)
    container.scrollLeft += event.deltaY

    // Check if we've reached the end after scrolling
    checkIfReachedEnd()
  }

  // Handle touch events for mobile
  function handleTouchStart(event: TouchEvent) {
    if (!containerRef.current || !isActive) return
    // Store the initial touch position
    const touchStartX = event.touches[0].clientX
    const touchStartY = event.touches[0].clientY

    // Store these values on the element
    containerRef.current.dataset.touchStartX = touchStartX.toString()
    containerRef.current.dataset.touchStartY = touchStartY.toString()
  }

  function handleTouchMove(event: TouchEvent) {
    if (!containerRef.current || !isActive) return

    const container = containerRef.current
    const touchStartX = Number.parseFloat(container.dataset.touchStartX || "0")
    const touchStartY = Number.parseFloat(container.dataset.touchStartY || "0")

    const currentX = event.touches[0].clientX
    const currentY = event.touches[0].clientY

    const deltaX = touchStartX - currentX
    const deltaY = touchStartY - currentY

    // If horizontal movement is greater than vertical, it's a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Let the browser handle horizontal swipes naturally
      return
    }

    // For vertical swipes, convert to horizontal scroll
    const isAtBeginning = container.scrollLeft <= 10
    const maxScroll = container.scrollWidth - container.clientWidth
    const isAtEnd = Math.abs(maxScroll - container.scrollLeft) < 5

    // If at beginning and swiping down (negative deltaY), or at end and swiping up (positive deltaY)
    // allow normal scrolling
    if ((isAtBeginning && deltaY < 0) || (isAtEnd && deltaY > 0)) {
      if (isAtEnd && deltaY > 0) {
        setIsActive(false)
      }
      return
    }

    // Otherwise, prevent default and scroll horizontally
    event.preventDefault()
    container.scrollLeft += deltaY

    // Update touch start position for continuous tracking
    container.dataset.touchStartX = currentX.toString()
    container.dataset.touchStartY = currentY.toString()

    // Check if we've reached the end
    checkIfReachedEnd()
  }

  // Handle scroll events on the container
  function handleContainerScroll() {
    checkIfReachedEnd()
  }

  // Check if container is in view and should be active
  function checkVisibility() {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // More flexible visibility detection that works better on various screen sizes
    const viewportHeight = window.innerHeight
    const elementHeight = rect.height
    const visibleThreshold = Math.min(viewportHeight * 0.6, elementHeight * 0.6)

    // Container is active when a significant portion is in the viewport
    const isSignificantlyVisible =
      rect.top <= viewportHeight * 0.3 &&
      rect.bottom >= viewportHeight * 0.7 &&
      rect.height >= visibleThreshold

    if (isSignificantlyVisible && !isActive) {
      setIsActive(true)
      // Reset reached end state when becoming active
      setReachedEnd(false)
    } else if (!isSignificantlyVisible && isActive && !reachedEnd) {
      // Only deactivate if we haven't reached the end
      setIsActive(false)
    }
  }

  useEffect(() => {
    // Add scroll event listener to check visibility
    window.addEventListener("scroll", checkVisibility, { passive: true })

    // Add resize event listener to handle window size changes
    window.addEventListener("resize", checkVisibility, { passive: true })

    // Initial check
    checkVisibility()

    // Clean up
    return () => {
      window.removeEventListener("scroll", checkVisibility)
      window.removeEventListener("resize", checkVisibility)
    }
  }, [isActive, isMobile])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add event listeners when active
    if (isActive) {
      // Mouse wheel events for desktop
      container.addEventListener("wheel", handleWheel, { passive: false })

      // Touch events for mobile
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      })
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })

      // Scroll events for both
      container.addEventListener("scroll", handleContainerScroll, {
        passive: true,
      })

      // Initial check for end position
      checkIfReachedEnd()
    }

    // Clean up
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("scroll", handleContainerScroll)
      }
    }
  }, [isActive, reachedEnd])

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
