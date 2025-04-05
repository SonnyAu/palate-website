"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  // Ref to track if we're currently doing a programmatic scroll
  const isProgrammaticScrolling = useRef(false)
  // Timeout ref for debouncing scroll events
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll for shadow effect and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow when scrolled
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Skip section detection if we're in the middle of a programmatic scroll
      if (isProgrammaticScrolling.current) return

      // Only track active section on home page
      if (isHomePage) {
        // Clear any existing timeout to debounce scroll events
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Set a new timeout to update the active section after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          // Determine active section
          const sections = [
            "features",
            "diets",
            "party",
            "about",
            "api",
            "contact",
          ]
          const scrollPosition = window.scrollY + 100 // Offset for header

          // First check if we're in the party section specifically
          const dietsElement = document.getElementById("diets")
          const partyMarker = document.getElementById("party")

          if (dietsElement && partyMarker) {
            const dietsHeight = dietsElement.offsetHeight
            const dietsTop = dietsElement.offsetTop
            const scrollProgress = (scrollPosition - dietsTop) / dietsHeight

            // If we're more than 50% through the diets section, activate the party section
            if (scrollProgress > 0.5 && scrollProgress < 1.2) {
              setActiveSection("party")
              return // Exit early if we've determined we're in the party section
            }
          }

          // For all other sections, use standard detection
          for (const section of sections) {
            // Skip party section as we've already handled it specially above
            if (section === "party") continue

            const element = document.getElementById(section)
            if (element) {
              const offsetTop = element.offsetTop
              const offsetHeight = element.offsetHeight

              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(section)
                break
              }
            }
          }
        }, 50) // Small delay to debounce scroll events
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isHomePage])

  // Handle window resize to close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Apply overflow hidden to body when menu is open
      document.body.style.overflow = "hidden"
    } else {
      // Restore normal overflow when menu is closed
      document.body.style.overflow = ""
    }

    // Cleanup function to ensure overflow is restored if component unmounts
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Navigation handler that works on both home and contact pages
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault()

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Set active section immediately to avoid flicker
    setActiveSection(sectionId)

    // If we're on the home page, scroll to the section
    if (isHomePage) {
      const section = document.getElementById(sectionId)
      if (section) {
        // Get navbar height to offset scroll position
        const navbarHeight = document.querySelector("header")?.offsetHeight || 0

        // Calculate position accounting for navbar height
        const sectionPosition = section.offsetTop - navbarHeight

        // Set flag to prevent scroll handler from changing active section during programmatic scroll
        isProgrammaticScrolling.current = true

        // Smooth scroll to section
        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        })

        // Reset the flag after the scroll animation is likely to be complete
        setTimeout(() => {
          isProgrammaticScrolling.current = false
        }, 1000) // 1 second should cover most scroll animations
      }
    } else {
      // If we're on another page, navigate to home page with the section hash
      router.push(`/#${sectionId}`)
    }
  }

  // Navigation links array for reusability
  const navLinks = [
    { href: "#features", id: "features", label: "Features" },
    { href: "#diets", id: "diets", label: "Supported Diets" },
    { href: "#party", id: "party", label: "Party System" },
    { href: "#about", id: "about", label: "About Us" },
    { href: "#api", id: "api", label: "API" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "shadow-md" : ""
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        {/* Flexbox layout for better spacing control */}
        <div className="flex h-20 items-center justify-between">
          {/* Logo - Left section with fixed width */}
          <div className="min-w-[150px] shrink-0 pr-4 md:pr-6 lg:min-w-[180px] lg:pr-8">
            <Link
              href="/"
              className="flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132]"
              aria-label="PalAte Home"
            >
              <div className="relative shrink-0">
                <Image
                  src="/logo.png"
                  alt="PalAte Logo"
                  width={180}
                  height={50}
                  className="max-h-10 w-auto object-contain"
                  style={{ height: "auto" }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Nav Links - Center section with flex-grow */}
          <nav
            className="hidden grow items-center justify-center px-4 xl:flex"
            aria-label="Main navigation"
          >
            <ul
              className="flex items-center justify-center space-x-6 xl:space-x-8"
              role="menubar"
            >
              {navLinks.map((link) => (
                <li key={link.id} className="relative shrink-0" role="none">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative block rounded-md px-3 py-2 text-center text-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] xl:text-xl ${
                      activeSection === link.id
                        ? "text-[#288132]"
                        : "text-[#27292A] hover:text-[#288132]"
                    }`}
                    role="menuitem"
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
                  >
                    {link.label}
                    {isHomePage && (
                      <motion.div
                        className="absolute -bottom-1 h-0.5 bg-[#288132]"
                        layoutId="navIndicator"
                        initial={{ width: 0 }}
                        animate={{
                          width: activeSection === link.id ? "100%" : 0,
                          opacity: 1,
                        }}
                        style={{
                          left: 0,
                          right: 0,
                          originX: 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons or Hamburger - Right section with fixed width */}
          <div className="flex shrink-0 items-center justify-end pl-4 md:pl-6 lg:pl-8">
            {/* Mobile/tablet hamburger button - show on medium screens and below */}
            <div className="xl:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="relative z-[10000] rounded-md hover:bg-[#FFD8B5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132]"
              >
                {isMenuOpen ? (
                  <X className="size-6" aria-hidden="true" />
                ) : (
                  <Menu className="size-6" aria-hidden="true" />
                )}
              </Button>
            </div>

            {/* Desktop buttons - only show on large screens */}
            <div className="hidden items-center space-x-3 xl:flex">
              <span
                className="inline-flex cursor-default items-center justify-center whitespace-nowrap rounded-md bg-[#288132] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#288132]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2 xl:px-5 xl:text-base"
                aria-label="PalAte app coming soon"
              >
                Coming Soon
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-[#288132] bg-transparent px-4 py-2 text-sm font-medium text-[#288132] shadow-sm transition-colors hover:bg-[#288132]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2 xl:px-5 xl:text-base"
                aria-label="Contact PalAte support"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu - animated slide-in panel with full-screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div
            className="fixed left-0 top-0 z-[9999] h-[100vh] w-[100vw]"
            style={{
              backgroundColor: "#FFD8B5",
              opacity: 1,
            }}
          >
            <motion.div
              id="mobile-menu"
              className="fixed left-0 top-0 flex h-full w-full flex-col"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex h-full flex-col space-y-4 px-4 pb-6 pt-20">
                <nav
                  className="flex flex-col space-y-4"
                  aria-label="Mobile navigation"
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className={`relative rounded-md px-4 py-3 text-center text-xl font-medium hover:bg-[#FFD8B5]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] ${
                        activeSection === link.id && isHomePage
                          ? "text-[#288132]"
                          : "text-[#27292A] hover:text-[#288132]"
                      }`}
                      aria-current={
                        activeSection === link.id ? "page" : undefined
                      }
                    >
                      {link.label}
                      {isHomePage && (
                        <motion.div
                          className="absolute -bottom-1 h-0.5 bg-[#288132]"
                          layoutId="mobileNavIndicator"
                          initial={{ width: 0 }}
                          animate={{
                            width: activeSection === link.id ? "100%" : 0,
                            opacity: 1,
                          }}
                          style={{
                            left: 0,
                            right: 0,
                            originX: 0,
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto space-y-3 pt-4">
                  <span
                    className="flex w-full cursor-default items-center justify-center rounded-md bg-[#288132] px-4 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#288132]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2"
                    aria-label="PalAte app coming soon"
                  >
                    Coming Soon
                  </span>
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded-md border border-[#288132] bg-transparent px-4 py-2.5 text-base font-medium text-[#288132] shadow-sm transition-colors hover:bg-[#288132]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2"
                    aria-label="Contact PalAte support"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
