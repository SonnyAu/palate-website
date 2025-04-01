"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Apple,
  ArrowRight,
  Database,
  ExternalLink,
  Leaf,
  Lock,
  Utensils,
} from "lucide-react"
import { FloatingShape } from "@/components/animations/floating-shape"
import { MotionButton } from "@/components/animations/motion-button"
import { MotionHeading } from "@/components/animations/motion-heading"
import { MotionParagraph } from "@/components/animations/motion-paragraph"
import { MotionSection } from "@/components/animations/motion-section"
import { TypewriterCode } from "@/components/animations/typewriter-code"
import { WavyGradientBackground } from "@/components/animations/wavy-gradient-background"
import { MainNav } from "@/components/main-nav"
import { Input } from "@/components/ui/input"

export default function Home() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const apiCodeExample = `fetch("https://api.example.com/v1/restaurants", {
method: "GET",
headers: {
"Authorization": "Bearer YOUR_API_KEY",
"Content-Type": "application/json"
}
})
.then(response => response.json())
.then(data => console.log(data));`

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
          <WavyGradientBackground />
          <FloatingShape
            type="blob"
            size={300}
            color="#288132"
            className="right-[5%] top-20 opacity-5"
            duration={25}
          />
          <FloatingShape
            type="circle"
            size={150}
            color="#3f301d"
            className="bottom-20 left-[10%] opacity-5"
            delay={1}
            duration={20}
          />
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <MotionSection>
                  <div className="space-y-2">
                    <MotionHeading
                      as="h1"
                      className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-5xl xl:text-6xl/none"
                    >
                      Eat What&apos;s Right For You
                    </MotionHeading>
                    <MotionParagraph
                      className="max-w-[600px] text-[#27292A] md:text-xl"
                      delay={0.1}
                    >
                      Personalized restaurant recommendations tailored to your
                      diet. Find places that cater to your specific dietary
                      needs, all in one app.
                    </MotionParagraph>
                  </div>
                </MotionSection>
                <div className="mt-6 flex justify-center sm:justify-start">
                  <div className="flex flex-col items-center">
                    <MotionButton
                      className="cursor-default rounded-xl bg-[#288132] px-8 py-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#288132]/90 hover:shadow-xl"
                      delay={0.2}
                    >
                      <span className="flex items-center justify-center gap-3 text-xl font-bold sm:text-2xl">
                        App Launching Soon
                        <ArrowRight className="size-6" />
                      </span>
                    </MotionButton>
                    <span className="mt-2 text-sm text-[#27292A]">
                      Available soon on iOS
                    </span>
                  </div>
                </div>
              </div>
              <MotionSection
                delay={0.4}
                className="flex items-center justify-center"
              >
                <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[2.5rem] border-8 border-[#27292A] shadow-2xl">
                  <Image
                    src="/app-preview.png"
                    alt="PalAte App Preview"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="relative w-full py-12 md:py-24 lg:py-32"
        >
          <FloatingShape
            type="square"
            size={200}
            color="#288132"
            className="left-[5%] top-40 opacity-5"
            delay={0.5}
          />
          <FloatingShape
            type="blob"
            size={250}
            color="#3f301d"
            className="bottom-40 right-[5%] opacity-5"
            delay={1.5}
            duration={22}
          />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <MotionSection>
                <div className="space-y-2">
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    How PalAte Works
                  </MotionHeading>
                  <MotionParagraph
                    className="max-w-[900px] text-[#27292A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    delay={0.1}
                  >
                    Our intelligent app makes finding the perfect restaurant for
                    your dietary needs simple and stress-free.
                  </MotionParagraph>
                </div>
              </MotionSection>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <MotionSection
                delay={0.2}
                className="flex h-full flex-col justify-between rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/70 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#288132] text-white">
                    <Leaf className="size-6" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-bold text-[#3f301d]">
                      Choose Your Preferences
                    </h3>
                    <p className="text-[#27292A]">
                      Select from our curated list of dietary options including
                      vegan, keto, halal, gluten-free, and many more.
                    </p>
                  </div>
                </div>
              </MotionSection>
              <MotionSection
                delay={0.3}
                className="flex h-full flex-col justify-between rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/70 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#288132] text-white">
                    <Utensils className="size-6" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-bold text-[#3f301d]">
                      Finds Restaurants
                    </h3>
                    <p className="text-[#27292A]">
                      Recommends nearby restaurants with menus that comply with
                      your specific dietary needs and preferences.
                    </p>
                  </div>
                </div>
              </MotionSection>
              <MotionSection
                delay={0.4}
                className="flex h-full flex-col justify-between rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/70 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#288132] text-white">
                    <Apple className="size-6" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-xl font-bold text-[#3f301d]">
                      Personalized Results
                    </h3>
                    <p className="text-[#27292A]">
                      Get customized menu suggestions based on your preferences,
                      not generic recommendations that ignore your dietary
                      needs.
                    </p>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>
        <section
          id="party"
          className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32"
        >
          <WavyGradientBackground baseColor="#FFEBB5" />{" "}
          {/* Using the same warm pastel gold as other sections for consistency */}
          <FloatingShape
            type="circle"
            size={200}
            color="#288132"
            className="left-[15%] top-40 opacity-5"
            delay={0.5}
            duration={22}
          />
          <FloatingShape
            type="blob"
            size={180}
            color="#3f301d"
            className="bottom-20 right-[10%] opacity-5"
            delay={1.3}
            duration={19}
          />
          <div className="container relative px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <MotionSection>
                <div className="space-y-4">
                  <div className="mb-2 inline-block rounded-lg bg-[#288132] px-3 py-1 text-sm text-white">
                    Party System
                  </div>
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    Dine Together, Eat Right
                  </MotionHeading>
                  <MotionParagraph
                    className="text-[#27292A] md:text-xl"
                    delay={0.1}
                  >
                    Create a party, share your dietary needs, and get
                    group-friendly restaurant suggestions that match
                    everyone&apos;s preferences.
                  </MotionParagraph>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#288132] text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-[#3f301d]">
                          Invite Friends
                        </h3>
                      </div>
                      <p className="text-sm text-[#27292A]">
                        Easily invite friends to join your dining party with a
                        simple link.
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#288132] text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-[#3f301d]">
                          Combine Preferences
                        </h3>
                      </div>
                      <p className="text-sm text-[#27292A]">
                        Our app automatically combines everyone&apos;s dietary
                        needs into one search.
                      </p>
                    </div>
                  </div>
                </div>
              </MotionSection>

              <MotionSection
                delay={0.3}
                className="flex items-center justify-center"
              >
                <div className="relative aspect-[9/18] w-[300px] rounded-[2rem] border-8 border-[#27292A] bg-[#27292A] shadow-lg md:w-[340px]">
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[1.75rem] bg-gray-100">
                    <Image
                      src="/party.jpg"
                      alt="PalAte Party System"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 300px, 340px"
                      priority
                    />
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        <section
          id="diets"
          className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32"
        >
          <WavyGradientBackground baseColor="#FFEBB5" />{" "}
          {/* Using the same warm pastel gold for consistency */}
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
          <div className="container relative px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <MotionSection
                delay={0.3}
                className="flex items-center justify-center"
              >
                <div className="relative aspect-[9/20] w-[300px] rounded-[2rem] border-8 border-[#27292A] bg-[#27292A] shadow-lg md:w-[340px]">
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[1.75rem] bg-white">
                    <Image
                      src="/preferences-screen.png"
                      alt="PalAte Dietary Preferences Screen"
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: "top center",
                      }}
                      sizes="(max-width: 768px) 300px, 340px"
                      priority
                    />
                  </div>
                </div>
              </MotionSection>

              <MotionSection>
                <div className="space-y-4">
                  <div className="mb-2 inline-block rounded-lg bg-[#288132] px-3 py-1 text-sm text-white">
                    Dietary Preferences
                  </div>
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    Tailored to Your Diet
                  </MotionHeading>
                  <MotionParagraph
                    className="text-[#27292A] md:text-xl"
                    delay={0.1}
                  >
                    Choose your dietary preferences and we&apos;ll find
                    restaurants that match your specific needs, whether
                    you&apos;re vegan, gluten-free, or have religious dietary
                    requirements.
                  </MotionParagraph>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#288132] text-white">
                          <Leaf className="size-4" />
                        </div>
                        <h3 className="font-semibold text-[#3f301d]">
                          Dietary Restrictions
                        </h3>
                      </div>
                      <p className="text-sm text-[#27292A]">
                        From allergies to lifestyle choices, we account for all
                        your dietary needs.
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-full bg-[#288132] text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-[#3f301d]">
                          Religious Diets
                        </h3>
                      </div>
                      <p className="text-sm text-[#27292A]">
                        We respect all religious dietary practices including
                        Halal, Kosher, and more.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/scoring"
                      className="inline-flex items-center font-medium text-[#288132] hover:text-[#288132]/80"
                    >
                      Learn more about how we generate restaurant scores
                      <ExternalLink className="ml-2 size-4" />
                    </Link>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        <section id="about" className="relative w-full py-12 md:py-24 lg:py-32">
          <FloatingShape
            type="blob"
            size={280}
            color="#288132"
            className="left-[10%] top-20 opacity-5"
            delay={0.3}
            duration={24}
          />
          <FloatingShape
            type="square"
            size={160}
            color="#3f301d"
            className="bottom-20 right-[15%] opacity-5"
            delay={1.8}
            duration={19}
          />
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <MotionSection>
                <div className="space-y-4">
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    Who We Are
                  </MotionHeading>
                  <MotionParagraph
                    className="text-[#27292A] md:text-xl"
                    delay={0.1}
                  >
                    Founded in 2023, PalAte was born from a simple idea:
                    everyone deserves to enjoy dining out, regardless of their
                    dietary restrictions.
                  </MotionParagraph>
                  <MotionParagraph className="text-[#27292A]" delay={0.2}>
                    Our team of nutritionists, food enthusiasts, and tech
                    experts have created a platform that bridges the gap between
                    diners with specific needs and restaurants that can
                    accommodate them.
                  </MotionParagraph>
                  <MotionParagraph className="text-[#27292A]" delay={0.3}>
                    We&apos;re committed to making food discovery accessible,
                    accurate, and enjoyable for all dietary preferences.
                  </MotionParagraph>
                </div>
              </MotionSection>
              <MotionSection
                delay={0.4}
                className="flex items-center justify-center"
              >
                <Image
                  src="/team.png"
                  alt="PalAte Team"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover shadow-lg transition-shadow duration-300 hover:shadow-xl"
                />
              </MotionSection>
            </div>
          </div>
        </section>

        <section
          id="api"
          className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32"
        >
          <WavyGradientBackground baseColor="#FFEEC2" />{" "}
          {/* Using rich cream color for this section */}
          <FloatingShape
            type="circle"
            size={200}
            color="#288132"
            className="right-[10%] top-40 opacity-5"
            delay={0.6}
            duration={21}
          />
          <FloatingShape
            type="triangle"
            size={150}
            color="#3f301d"
            className="bottom-60 left-[15%] opacity-5"
            delay={1.4}
            duration={26}
          />
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <MotionSection
                delay={0.2}
                className="flex items-center justify-center"
              >
                <TypewriterCode
                  code={apiCodeExample}
                  typingSpeed={25}
                  showLineNumbers={true}
                />
              </MotionSection>
              <MotionSection>
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-[#288132] px-3 py-1 text-sm text-white">
                    For Developers
                  </div>
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    PalAte API
                  </MotionHeading>
                  <MotionParagraph
                    className="text-[#27292A] md:text-xl"
                    delay={0.1}
                  >
                    Integrate our powerful restaurant recommendation engine into
                    your own applications.
                  </MotionParagraph>
                  <ul className="space-y-2 text-[#27292A]">
                    <li className="flex items-center gap-2">
                      <Database className="size-5 text-[#288132]" />
                      <span>
                        Access our database of diet-friendly restaurants
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Utensils className="size-5 text-[#288132]" />
                      <span>
                        Get detailed menu information with dietary flags
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lock className="size-5 text-[#288132]" />
                      <span>Secure, reliable, and scalable infrastructure</span>
                    </li>
                  </ul>
                  <div className="flex flex-col items-start">
                    <MotionButton
                      className="cursor-default bg-[#288132] text-white hover:bg-[#288132]/90"
                      delay={0.3}
                    >
                      API Access Coming Soon
                    </MotionButton>
                    <span className="mt-1 text-xs text-[#27292A]">
                      Developer documentation in development
                    </span>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32">
          <FloatingShape
            type="blob"
            size={250}
            color="#288132"
            className="right-[5%] top-20 opacity-5"
            delay={0.4}
            duration={22}
          />
          <FloatingShape
            type="circle"
            size={180}
            color="#3f301d"
            className="bottom-40 left-[10%] opacity-5"
            delay={1.1}
            duration={25}
          />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <MotionSection>
                <div className="space-y-2">
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    Ready to Find Your Perfect Meal?
                  </MotionHeading>
                  <MotionParagraph
                    className="max-w-[600px] text-[#27292A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    delay={0.1}
                  >
                    Download the PalAte app today and discover restaurants that
                    cater to your dietary needs.
                  </MotionParagraph>
                </div>
              </MotionSection>
              <MotionSection delay={0.2} className="w-full max-w-sm space-y-2">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Input
                    type="email"
                    placeholder="Enter your email for launch updates"
                    className="max-w-lg flex-1 border-[#288132]"
                  />
                  <MotionButton className="cursor-default bg-[#288132] text-white hover:bg-[#288132]/90">
                    Join Waitlist
                  </MotionButton>
                </div>
                <p className="text-xs text-[#27292A]">
                  By signing up, you agree to our{" "}
                  <Link
                    href="/privacy"
                    className="text-[#288132] underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </MotionSection>
              <MotionSection
                delay={0.3}
                className="flex flex-col items-center pt-4"
              >
                <div className="inline-flex h-12 cursor-default items-center justify-center rounded-md bg-black px-10 text-base font-medium text-white shadow transition-colors hover:bg-black/90">
                  <svg
                    viewBox="0 0 24 24"
                    className="mr-2 size-6"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.91 3.57-.84 1.5.12 2.63.64 3.4 1.8-3.03 1.81-2.52 5.68.22 7.14-.62 1.64-1.42 3.27-2.27 4.07ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.26 2.01-1.76 4.04-3.74 4.25Z" />
                  </svg>
                  Coming Soon on the App Store
                </div>
                <span className="mt-2 text-sm text-[#27292A]">
                  Sign up above to be notified at launch
                </span>
              </MotionSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative w-full border-t bg-white py-6">
        <div className="container relative flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="PalAte Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm text-[#27292A]">
              © 2023 PalAte. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[#27292A] underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/scoring"
              className="text-sm text-[#27292A] underline-offset-4 hover:underline"
            >
              How We Score
            </Link>
            <Link
              href="/contact"
              className="text-sm text-[#27292A] underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
