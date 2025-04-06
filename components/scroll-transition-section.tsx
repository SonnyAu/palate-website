"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle, Shield } from "lucide-react"
import { FloatingShape } from "@/components/animations/floating-shape"
import { WavyGradientBackground } from "@/components/animations/wavy-gradient-background"

// Update the interface to support multiple feature cards
interface ScrollTransitionSectionProps {
  children?: React.ReactNode
  preferencesScreen: {
    image: string
    title: string
    description: React.ReactNode
    tag: string
    features: Array<{
      title: string
      description: string
      icon?: React.ReactNode
    }>
  }
  partyScreen: {
    image: string
    title: string
    description: React.ReactNode
    tag: string
    features: Array<{
      title: string
      description: string
      icon?: React.ReactNode
    }>
  }
}

// Update the component to include feature cards and reduce open space
export function ScrollTransitionSection({
  children,
  preferencesScreen,
  partyScreen,
}: ScrollTransitionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Set up scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transform values for animations
  const preferenceOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [1, 1, 0]
  )
  const partyOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1])

  // Transform values for slide-in animations
  const preferenceY = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, -50])
  const partyY = useTransform(scrollYProgress, [0.4, 0.6, 1], [50, 0, 0])

  // Calculate container height based on viewport and check for mobile
  useEffect(() => {
    const updateSizes = () => {
      // Check if mobile
      setIsMobile(window.innerWidth < 768)

      // Set container height - adjust based on screen size for smoother scrolling
      let height
      if (window.innerWidth < 640) {
        // For small screens, consider both width and height
        if (window.innerHeight > 800) {
          height = window.innerHeight * 2.6 // Extra height for tall mobile screens
        } else {
          height = window.innerHeight * 2.4 // Extra height on small mobile
        }
      } else if (window.innerWidth < 768) {
        height = window.innerHeight * 2.2 // More height on mobile
      } else if (window.innerWidth < 1024) {
        height = window.innerHeight * 2.1 // Slightly more on tablets
      } else {
        height = window.innerHeight * 2 // Default for desktop
      }

      setContainerHeight(height)
    }

    updateSizes()
    window.addEventListener("resize", updateSizes)
    return () => window.removeEventListener("resize", updateSizes)
  }, [])

  // Position the party section marker
  useEffect(() => {
    const updatePartyMarker = () => {
      const partyMarker = document.getElementById("party")
      const container = containerRef.current

      if (partyMarker && container) {
        // Position the party marker about 60% through the scroll container
        const containerTop =
          container.getBoundingClientRect().top + window.scrollY
        const markerPosition = containerTop + containerHeight * 0.6

        // Set the position using style
        partyMarker.style.position = "absolute"
        partyMarker.style.top = `${markerPosition}px`
      }
    }

    updatePartyMarker()
    window.addEventListener("resize", updatePartyMarker)

    return () => {
      window.removeEventListener("resize", updatePartyMarker)
    }
  }, [containerHeight])

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background elements */}
        <WavyGradientBackground baseColor="#FFD8B5" />
        <FloatingShape
          type="triangle"
          size={180}
          color="#288132"
          className="right-[15%] top-60 opacity-5"
          delay={0.7}
          duration={18}
        />
        <FloatingShape
          type="circle"
          size={120}
          color="#3f301d"
          className="bottom-40 left-[20%] opacity-5"
          delay={1.2}
          duration={23}
        />

        <div className="container mx-auto flex h-full items-center justify-center px-4 py-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between md:flex-row">
            {/* Phone container - responsive sizing */}
            <div className="mb-8 flex w-full min-w-[140px] max-w-[180px] items-center justify-center sm:max-w-[240px] md:mb-0 md:w-[30%] lg:max-w-[280px] xl:max-w-[320px]">
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[40px] bg-black shadow-xl">
                <div className="absolute inset-[3px] overflow-hidden rounded-[36px] bg-black">
                  {/* First screen - Dietary Preferences */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      opacity: preferenceOpacity,
                      y: preferenceY,
                    }}
                  >
                    <Image
                      src={preferencesScreen.image || "/placeholder.svg"}
                      alt="PalAte Dietary Preferences Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "top center" }}
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1280px) 240px, 320px"
                      priority
                    />
                  </motion.div>

                  {/* Second screen - Party System */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      opacity: partyOpacity,
                      y: partyY,
                    }}
                  >
                    <Image
                      src={partyScreen.image || "/placeholder.svg"}
                      alt="PalAte Party System"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center center" }}
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1280px) 240px, 320px"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Description container - responsive layout */}
            <div className="h-full w-full overflow-y-auto md:w-[70%] md:pl-6">
              <div
                className="flex h-full flex-col justify-center"
                style={{ position: "relative" }}
              >
                {/* First description - Dietary Preferences */}
                <motion.div
                  className="relative z-10 w-full"
                  style={{
                    opacity: preferenceOpacity,
                    pointerEvents: "auto",
                  }}
                >
                  <div className="mb-1 inline-block w-auto max-w-fit whitespace-nowrap rounded-lg bg-[#288132] px-2 py-1 text-xs text-white">
                    {preferencesScreen.tag}
                  </div>
                  <h2 className="mb-2 text-xl font-bold tracking-tighter text-[#3f301d] sm:mb-3 sm:text-2xl md:mb-3 md:text-2xl lg:text-3xl">
                    {preferencesScreen.title}
                  </h2>
                  <div className="mb-4 max-w-[600px] text-sm text-[#27292A] sm:text-base md:mb-4 md:text-base">
                    {preferencesScreen.description}{" "}
                    <Link
                      href="/scoring"
                      className="text-[#288132] hover:underline"
                    >
                      Learn how we score restaurants →
                    </Link>
                  </div>

                  <div className="mt-3 hidden flex-wrap justify-start gap-3 sm:flex md:gap-4">
                    {preferencesScreen.features.map((feature, index) => (
                      <div
                        key={index}
                        className="feature-card min-w-[150px] max-w-full flex-1 rounded-lg border-2 border-[#288132] bg-[#F6FBF8] p-3 md:min-w-[200px] md:max-w-[275px] md:p-4"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 text-[#288132]">
                            {feature.icon || <CheckCircle className="size-5" />}
                          </div>
                          <div>
                            <h3 className="mb-1 text-xs font-semibold text-[#3f301d] sm:text-sm md:text-base">
                              {feature.title}
                            </h3>
                            <p className="text-xs text-[#27292A] md:text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Second description - Party System */}
                <motion.div
                  className="absolute top-1/2 z-0 w-full -translate-y-1/2 transform"
                  style={{
                    opacity: partyOpacity,
                    pointerEvents: "auto",
                  }}
                >
                  <div className="mb-1 inline-block w-auto max-w-fit whitespace-nowrap rounded-lg bg-[#288132] px-2 py-1 text-xs text-white">
                    {partyScreen.tag}
                  </div>
                  <h2 className="mb-2 text-xl font-bold tracking-tighter text-[#3f301d] sm:mb-3 sm:text-2xl md:mb-3 md:text-2xl lg:text-3xl">
                    {partyScreen.title}
                  </h2>
                  <div className="mb-4 max-w-[600px] text-sm text-[#27292A] sm:text-base md:mb-4 md:text-base">
                    {partyScreen.description}
                  </div>

                  <div className="mt-3 hidden flex-wrap justify-start gap-3 sm:flex md:gap-4">
                    {partyScreen.features.map((feature, index) => (
                      <div
                        key={index}
                        className="feature-card min-w-[150px] max-w-full flex-1 rounded-lg border-2 border-[#288132] bg-[#F6FBF8] p-3 md:min-w-[200px] md:max-w-[275px] md:p-4"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1 text-[#288132]">
                            {feature.icon || <Shield className="size-5" />}
                          </div>
                          <div>
                            <h3 className="mb-1 text-xs font-semibold text-[#3f301d] sm:text-sm md:text-base">
                              {feature.title}
                            </h3>
                            <p className="text-xs text-[#27292A] md:text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
