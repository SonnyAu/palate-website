"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
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

  // Calculate container height based on viewport
  useEffect(() => {
    // Set container height to 2x viewport height to ensure enough scroll space
    setContainerHeight(window.innerHeight * 2)

    const handleResize = () => {
      setContainerHeight(window.innerHeight * 2)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add this after the existing useEffect
  useEffect(() => {
    // Position the party section marker at the right spot
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
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            {/* Phone container - fixed on the left, properly sized */}
            <div className="flex w-[30%] min-w-[200px] max-w-[280px] items-center justify-center">
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[40px] bg-black shadow-xl">
                <div className="absolute inset-[3px] overflow-hidden rounded-[36px] bg-black">
                  {/* First screen - Dietary Preferences */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ opacity: preferenceOpacity }}
                  >
                    <Image
                      src={preferencesScreen.image || "/placeholder.svg"}
                      alt="PalAte Dietary Preferences Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "top center" }}
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 280px"
                      priority
                    />
                  </motion.div>

                  {/* Second screen - Party System */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ opacity: partyOpacity }}
                  >
                    <Image
                      src={partyScreen.image || "/placeholder.svg"}
                      alt="PalAte Party System"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center center" }}
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, 280px"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Description container - scrolls with page, always on the right */}
            <div className="h-full w-[70%] overflow-y-auto pl-6">
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
                  <h2 className="mb-3 text-2xl font-bold tracking-tighter text-[#3f301d] sm:text-3xl">
                    {preferencesScreen.title}
                  </h2>
                  <div className="mb-4 max-w-[600px] text-sm text-[#27292A] md:text-base">
                    {preferencesScreen.description}{" "}
                    <Link
                      href="/scoring"
                      className="text-[#288132] hover:underline"
                    >
                      Learn how we score restaurants →
                    </Link>
                  </div>

                  <div className="mt-2 flex flex-wrap justify-start gap-3">
                    {preferencesScreen.features.map((feature, index) => (
                      <div
                        key={index}
                        className="min-w-[200px] max-w-[275px] flex-1 rounded-lg bg-white p-4 shadow-md"
                      >
                        <h3 className="mb-1 font-semibold text-[#3f301d]">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#27292A]">
                          {feature.description}
                        </p>
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
                  <h2 className="mb-3 text-2xl font-bold tracking-tighter text-[#3f301d] sm:text-3xl">
                    {partyScreen.title}
                  </h2>
                  <div className="mb-4 max-w-[600px] text-sm text-[#27292A] md:text-base">
                    {partyScreen.description}
                  </div>

                  <div className="mt-2 flex flex-wrap justify-start gap-3">
                    {partyScreen.features.map((feature, index) => (
                      <div
                        key={index}
                        className="min-w-[200px] max-w-[275px] flex-1 rounded-lg bg-white p-4 shadow-md"
                      >
                        <h3 className="mb-1 font-semibold text-[#3f301d]">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-[#27292A]">
                          {feature.description}
                        </p>
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
