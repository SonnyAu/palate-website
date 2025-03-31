"use client"

import type React from "react"
import { useEffect, useState } from "react"
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

  // Handle scroll for shadow effect and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Add shadow when scrolled
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Only track active section on home page
      if (isHomePage) {
        // Determine active section
        const sections = ["features", "diets", "about", "api", "contact"]
        const scrollPosition = window.scrollY + 100 // Offset for header

        for (const section of sections) {
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
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

    // If we're on the home page, scroll to the section
    if (isHomePage) {
      const section = document.getElementById(sectionId)
      if (section) {
        // Get navbar height to offset scroll position
        const navbarHeight = document.querySelector("header")?.offsetHeight || 0

        // Calculate position accounting for navbar height
        const sectionPosition = section.offsetTop - navbarHeight

        // Smooth scroll to section
        window.scrollTo({
          top: sectionPosition,
          behavior: "smooth",
        })

        // Update active section
        setActiveSection(sectionId)
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
            className="hidden grow items-center justify-center px-4 lg:flex"
            aria-label="Main navigation"
          >
            <ul
              className="flex items-center justify-center space-x-6 xl:space-x-8"
              role="menubar"
            >
              {navLinks.map((link) => (
                <li key={link.id} className="shrink-0" role="none">
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
                    {activeSection === link.id && isHomePage && (
                      <span
                        className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#288132]"
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
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="relative z-50 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132]"
              >
                {isMenuOpen ? (
                  <X className="size-6" aria-hidden="true" />
                ) : (
                  <Menu className="size-6" aria-hidden="true" />
                )}
              </Button>
            </div>

            {/* Desktop buttons - only show on large screens */}
            <div className="hidden items-center space-x-3 lg:flex">
              <a
                href="https://appstore.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#288132] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#288132]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2 xl:px-5 xl:text-base"
                aria-label="Download the PalAte app"
              >
                Download App
              </a>
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

      {/* Mobile navigation menu - animated slide-in panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-background pt-16 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex h-full flex-col space-y-4 px-4 pb-6 pt-4">
              <nav
                className="flex flex-col space-y-4"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`rounded-md px-4 py-3 text-center text-xl font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] ${
                      activeSection === link.id && isHomePage
                        ? "text-[#288132]"
                        : "text-[#27292A] hover:text-[#288132]"
                    }`}
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
                  >
                    {link.label}
                    {activeSection === link.id && isHomePage && (
                      <span
                        className="ml-2 inline-block size-2 rounded-full bg-[#288132]"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-4">
                <a
                  href="https://appstore.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-md bg-[#288132] px-4 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#288132]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2"
                  aria-label="Download the PalAte app"
                >
                  Download App
                </a>
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
        )}
      </AnimatePresence>
    </header>
  )
}
