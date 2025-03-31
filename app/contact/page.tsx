"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MainNav } from "@/components/main-nav"
import { MotionSection } from "@/components/animations/motion-section"
import { MotionHeading } from "@/components/animations/motion-heading"
import { MotionParagraph } from "@/components/animations/motion-paragraph"
import { MotionButton } from "@/components/animations/motion-button"
import { FloatingShape } from "@/components/animations/floating-shape"
import { WavyGradientBackground } from "@/components/animations/wavy-gradient-background"
import { submitContactForm, generateFormToken, type ContactFormData } from "@/app/actions/contact-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Security state
  const [formToken, setFormToken] = useState("")
  const [formTimestamp, setFormTimestamp] = useState("")
  const [submissionAttempts, setSubmissionAttempts] = useState(0)
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  // Generate a new form token when the component mounts
  useEffect(() => {
    const initializeForm = async () => {
      try {
        const token = await generateFormToken()
        setFormToken(token)
        setFormTimestamp(new Date().toISOString())
      } catch (error) {
        console.error("Error generating form token:", error)
      }
    }

    initializeForm()
  }, [])

  // Client-side validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : ""
      case "email":
        return !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email address" : ""
      case "subject":
        return value.trim().length < 3 ? "Subject must be at least 3 characters" : ""
      case "message":
        return value.trim().length < 10 ? "Message must be at least 10 characters" : ""
      default:
        return ""
    }
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validate field if it's been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  // Handle field blur for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validate the field
    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  // Client-side form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    // Validate each field
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value as string)
      if (error) {
        newErrors[name] = error
        isValid = false
      }
    })

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })

    setTouched(allTouched)
    setErrors(newErrors)

    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset submission status
    setSubmitStatus(null)

    // Client-side validation
    if (!validateForm()) {
      return
    }

    // Check for rate limiting
    const now = Date.now()
    if (now - lastSubmissionTime < 10000) {
      // 10 seconds between submissions
      setSubmitStatus({
        success: false,
        message: "Please wait a moment before submitting again.",
      })
      return
    }

    // Check for too many submission attempts
    if (submissionAttempts >= 10) {
      setSubmitStatus({
        success: false,
        message: "Too many submission attempts. Please try again later.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmissionAttempts((prev) => prev + 1)
    setLastSubmissionTime(now)

    try {
      // Server-side validation and submission
      const response = await submitContactForm({
        ...formData,
        honeypot: "", // This should remain empty
        formToken,
        timestamp: formTimestamp,
      })

      if (response.success) {
        // Success
        setSubmitStatus({
          success: true,
          message: response.message,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset touched state
        setTouched({})

        // Generate a new form token for next submission
        try {
          const newToken = await generateFormToken()
          setFormToken(newToken)
          setFormTimestamp(new Date().toISOString())
        } catch (error) {
          console.error("Error generating new form token:", error)
        }
      } else {
        // Server validation errors
        if (response.errors) {
          const fieldErrors: Record<string, string> = {}

          // Format server errors for display
          Object.entries(response.errors).forEach(([field, messages]) => {
            fieldErrors[field] = messages[0] // Use the first error message
          })

          setErrors(fieldErrors)
        } else {
          // General server error
          setSubmitStatus({
            success: false,
            message: response.message,
          })
        }
      }
    } catch (error) {
      // Unexpected error
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <WavyGradientBackground baseColor="#FFEBB5" /> {/* Using warm pastel gold for contact page */}
          <FloatingShape type="blob" size={300} color="#288132" className="top-20 right-[5%] opacity-5" duration={25} />
          <FloatingShape
            type="circle"
            size={150}
            color="#3f301d"
            className="bottom-20 left-[10%] opacity-5"
            delay={1}
            duration={20}
          />
          <div className="container px-4 md:px-6 relative">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-[#288132] hover:text-[#288132]/80 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <MotionSection>
                <div className="space-y-2">
                  <MotionHeading className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#3f301d]">
                    Get in Touch
                  </MotionHeading>
                  <MotionParagraph
                    className="max-w-[800px] text-[#27292A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    delay={0.1}
                  >
                    Have questions, feedback, or partnership opportunities? We'd love to hear from you. Our team is here
                    to help you find the perfect dining experience for your dietary needs.
                  </MotionParagraph>
                </div>
              </MotionSection>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <MotionSection delay={0.2}>
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-[#3f301d] mb-4">Send Us a Message</h3>

                  {submitStatus && (
                    <Alert
                      className={`mb-6 ${submitStatus.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
                    >
                      {submitStatus.success ? (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-2" />
                      )}
                      <AlertTitle>{submitStatus.success ? "Success" : "Error"}</AlertTitle>
                      <AlertDescription>{submitStatus.message}</AlertDescription>
                    </Alert>
                  )}

                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-[#27292A]">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your name"
                          className={`border ${errors.name ? "border-red-500 focus-visible:ring-red-500" : "border-[#288132]"}`}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#27292A]">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your email"
                          className={`border ${errors.email ? "border-red-500 focus-visible:ring-red-500" : "border-[#288132]"}`}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-[#27292A]">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Message subject"
                        className={`border ${errors.subject ? "border-red-500 focus-visible:ring-red-500" : "border-[#288132]"}`}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        autoComplete="off"
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-[#27292A]">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your message"
                        className={`min-h-[150px] border ${errors.message ? "border-red-500 focus-visible:ring-red-500" : "border-[#288132]"}`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot field - hidden from users but might be filled by bots */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="honeypot">Leave this field empty</label>
                      <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
                    </div>

                    {/* Hidden fields for security */}
                    <input type="hidden" name="formToken" value={formToken} />
                    <input type="hidden" name="timestamp" value={formTimestamp} />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-[#27292A]">
                        <ShieldCheck className="h-4 w-4 mr-1 text-[#288132]" />
                        <span>Protected by spam prevention</span>
                      </div>

                      <MotionButton
                        type="submit"
                        className="bg-[#288132] hover:bg-[#288132]/90 text-white"
                        disabled={isSubmitting || !formToken}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </span>
                        )}
                      </MotionButton>
                    </div>
                  </form>
                </div>
              </MotionSection>

              <MotionSection delay={0.3}>
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <h3 className="text-xl font-bold text-[#3f301d] mb-4">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[#288132] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#3f301d]">Email</h4>
                        <p className="text-[#27292A]">support@palate.app</p>
                        <p className="text-[#27292A]">partnerships@palate.app</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#288132] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#3f301d]">Phone</h4>
                        <p className="text-[#27292A]">(555) 123-4567</p>
                        <p className="text-[#27292A]">Mon-Fri, 9am-5pm EST</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#288132] mt-1" />
                      <div>
                        <h4 className="font-medium text-[#3f301d]">Office</h4>
                        <p className="text-[#27292A]">123 Foodie Lane</p>
                        <p className="text-[#27292A]">San Francisco, CA 94103</p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100">
                      <h4 className="font-medium text-[#3f301d] mb-4">Frequently Asked Questions</h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-[#3f301d]">How quickly will I receive a response?</h5>
                          <p className="text-sm text-[#27292A]">
                            We typically respond to all inquiries within 24-48 business hours.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-[#3f301d]">Can I request a feature for the app?</h5>
                          <p className="text-sm text-[#27292A]">
                            We love hearing your ideas. Please include "Feature Request" in your subject line.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-[#3f301d]">Do you offer business partnerships?</h5>
                          <p className="text-sm text-[#27292A]">
                            Yes, we're always open to exploring partnerships with restaurants and other food service
                            businesses.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="font-medium text-[#3f301d] mb-2">Connect With Us</h4>
                      <div className="flex gap-4">
                        <a
                          href="https://www.instagram.com/official_palate_app?igsh=NTc4MTIwNjQ2YQ=="
                          className="text-[#288132] hover:text-[#288132]/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Follow PalAte on Instagram"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          </svg>
                        </a>
                        <a
                          href="https://www.linkedin.com/company/pal-ate/"
                          className="text-[#288132] hover:text-[#288132]/80 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Connect with PalAte on LinkedIn"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-white relative">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6 relative">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PalAte Logo" width={150} height={40} className="h-8 w-auto" />
            <p className="text-sm text-[#27292A]">© 2023 PalAte. All rights reserved.</p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-sm text-[#27292A] hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm text-[#27292A] hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

