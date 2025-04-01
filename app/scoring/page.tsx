"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle,
  Database,
  Egg,
  Leaf,
  Shield,
  Utensils,
  Wheat,
} from "lucide-react"
import { FloatingShape } from "@/components/animations/floating-shape"
import { MotionHeading } from "@/components/animations/motion-heading"
import { MotionParagraph } from "@/components/animations/motion-paragraph"
import { MotionSection } from "@/components/animations/motion-section"
import { WavyGradientBackground } from "@/components/animations/wavy-gradient-background"
import { MainNav } from "@/components/main-nav"

export default function ScoringPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-12 md:py-24">
          <WavyGradientBackground baseColor="#FFEBB5" />
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
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-[#288132] transition-colors hover:text-[#288132]/80"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to Home
              </Link>
            </div>

            <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
              <MotionSection>
                <div className="space-y-2">
                  <MotionHeading className="text-3xl font-bold tracking-tighter text-[#3f301d] sm:text-4xl md:text-5xl">
                    How We Score Restaurants
                  </MotionHeading>
                  <MotionParagraph
                    className="max-w-[800px] text-[#27292A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    delay={0.1}
                  >
                    Our proprietary scoring system helps you find restaurants
                    that truly match your dietary needs.
                  </MotionParagraph>
                </div>
              </MotionSection>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
              <div className="prose prose-lg max-w-none">
                {/* Section 1: Scoring Overview */}
                <MotionSection delay={0.2}>
                  <div className="mb-12">
                    <div className="mb-4 flex items-center">
                      <Database className="mr-3 size-6 text-[#288132]" />
                      <h2 className="text-2xl font-bold text-[#3f301d]">
                        Scoring Overview
                      </h2>
                    </div>
                    <p className="text-[#27292A]">
                      We use a data-driven scoring system to recommend
                      restaurants that align with your dietary preferences.
                    </p>
                    <p className="mt-4 text-[#27292A]">
                      Our approach combines advanced technology with human
                      expertise to ensure you receive accurate, reliable
                      recommendations that respect your dietary needs. By
                      analyzing menu items, preparation methods, and restaurant
                      policies, we create a comprehensive profile for each
                      establishment in our database.
                    </p>
                    <p className="mt-4 text-[#27292A]">
                      When you set your dietary preferences in the app, our
                      system matches them against these restaurant profiles to
                      generate personalized recommendations that truly work for
                      you.
                    </p>
                  </div>
                </MotionSection>

                {/* Section 2: AI Tagging Process */}
                <MotionSection delay={0.3}>
                  <div className="mb-12">
                    <div className="mb-4 flex items-center">
                      <Bot className="mr-3 size-6 text-[#288132]" />
                      <h2 className="text-2xl font-bold text-[#3f301d]">
                        AI Tagging Process
                      </h2>
                    </div>
                    <p className="text-[#27292A]">
                      We use AI to analyze restaurant menus and content. Over 50
                      iterations are run per restaurant, and we extract the most
                      frequently occurring tags to ensure stable, consistent
                      labeling.
                    </p>
                    <p className="mt-4 text-[#27292A]">
                      This iterative approach helps eliminate anomalies and
                      ensures that our restaurant classifications are reliable
                      and consistent. Our system continuously learns and
                      improves based on new data and feedback.
                    </p>

                    <h3 className="mb-4 mt-8 text-xl font-semibold text-[#3f301d]">
                      Our Classification Tags
                    </h3>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {/* Religious Dietary Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <Shield className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Religious
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            halal
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            kosher
                          </span>
                        </div>
                      </div>

                      {/* Meat Types Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <Utensils className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Meat Types
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            has_meat
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            sea_food
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            red_meat
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            poultry
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            other_meat
                          </span>
                        </div>
                      </div>

                      {/* Animal Products Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <Egg className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Animal Products
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            eggs
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            dairy
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            honey
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            fish
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            shellfish
                          </span>
                        </div>
                      </div>

                      {/* Allergens Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <Wheat className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Allergens
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            tree_nut
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            peanut
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            soy
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            wheat
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            gluten
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            lactose
                          </span>
                        </div>
                      </div>

                      {/* Diet Types Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <Leaf className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Diet Types
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            mediterranean
                          </span>
                        </div>
                      </div>

                      {/* Nutritional Tags */}
                      <div className="rounded-lg border border-[#FFE1A8] bg-[#FFE1A8]/10 p-4">
                        <div className="mb-3 flex items-center">
                          <BarChart3 className="mr-2 size-5 text-[#288132]" />
                          <h4 className="font-semibold text-[#3f301d]">
                            Nutritional
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            low_sugar
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            carbs
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            protein
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            fat
                          </span>
                          <span className="inline-flex items-center rounded-full bg-[#288132]/10 px-2.5 py-0.5 text-sm font-medium text-[#288132]">
                            calories
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionSection>

                {/* Section 3: Manual Review Guarantee */}
                <MotionSection delay={0.4}>
                  <div className="mb-8">
                    <div className="mb-4 flex items-center">
                      <CheckCircle className="mr-3 size-6 text-[#288132]" />
                      <h2 className="text-2xl font-bold text-[#3f301d]">
                        Manual Review Guarantee
                      </h2>
                    </div>

                    <div className="my-4 rounded-lg border-2 border-[#288132] bg-[#288132]/5 p-6">
                      <div className="flex items-start">
                        <Shield className="mr-3 mt-1 size-6 text-[#288132]" />
                        <div>
                          <h3 className="text-lg font-semibold text-[#3f301d]">
                            Our Commitment to Accuracy
                          </h3>
                          <p className="mt-2 text-[#27292A]">
                            For all religious dietary tags and related
                            restaurant labels, we manually verify the data for
                            100% accuracy. AI is never used for religious
                            classifications.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[#27292A]">
                      We understand the importance of religious dietary
                      requirements and take our responsibility seriously. Our
                      team includes experts in various religious dietary
                      practices who review and verify all religious
                      classifications to ensure they meet the appropriate
                      standards.
                    </p>

                    <p className="mt-4 text-[#27292A]">
                      This human oversight ensures that when you see a
                      restaurant labeled as Halal or Kosher in our app, you can
                      trust that it has been properly vetted according to
                      religious standards.
                    </p>
                  </div>
                </MotionSection>

                <MotionSection delay={0.5}>
                  <div>
                    <div className="mb-4 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3 size-6 text-[#288132]"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      <h2 className="text-2xl font-bold text-[#3f301d]">
                        Continuous Improvement
                      </h2>
                    </div>
                    <p className="text-[#27292A]">
                      Our scoring system is constantly evolving. We regularly
                      update our algorithms based on:
                    </p>
                    <ul className="mt-2 list-disc space-y-2 pl-6 text-[#27292A]">
                      <li>User feedback and reported experiences</li>
                      <li>Restaurant menu changes</li>
                      <li>New dietary research and guidelines</li>
                      <li>Emerging dietary trends and requirements</li>
                    </ul>
                    <p className="mt-4 text-[#27292A]">
                      We believe in transparency and continuous improvement. If
                      you have suggestions for how we can make our scoring
                      system better, we welcome your feedback.
                    </p>
                  </div>
                </MotionSection>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-[#288132] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#288132]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#288132] focus-visible:ring-offset-2"
              >
                Return to Home
              </Link>
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
