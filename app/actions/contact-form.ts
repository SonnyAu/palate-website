"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

// Define the form schema using Zod for validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(100),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }).max(200),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(1000),
  honeypot: z.string().max(0, { message: "Bot detected" }).optional(),
  formToken: z.string().min(10, { message: "Invalid form submission" }),
  timestamp: z.string().transform((val) => new Date(val)),
})

// Type for the form data
export type ContactFormData = Omit<z.infer<typeof contactFormSchema>, "honeypot" | "formToken" | "timestamp">

// Type for the form response
export type ContactFormResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// Store for rate limiting (in a real app, use Redis or a database)
const submissionTracker = new Map<string, { count: number; lastSubmission: Date }>()

// Generate a CSRF token
export async function generateFormToken(): Promise<string> {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Store token in cookies with short expiration
  cookies().set("form_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 30, // 30 minutes
    path: "/",
  })

  return token
}

// Validate the form token
function validateFormToken(token: string): boolean {
  const storedToken = cookies().get("form_token")?.value

  // Clear the token after checking (one-time use)
  if (storedToken) {
    cookies().set("form_token", "", { maxAge: 0 })
  }

  return storedToken === token
}

export async function submitContactForm(
  formData: ContactFormData & {
    honeypot?: string
    formToken: string
    timestamp: string
  },
): Promise<ContactFormResponse> {
  try {
    // Parse and validate the form data
    const validationResult = contactFormSchema.safeParse(formData)

    // If validation fails, return the errors
    if (!validationResult.success) {
      const formattedErrors: Record<string, string[]> = {}

      // Format Zod errors into a more usable structure
      validationResult.error.issues.forEach((issue) => {
        const path = issue.path[0] as string
        if (!formattedErrors[path]) {
          formattedErrors[path] = []
        }
        formattedErrors[path].push(issue.message)
      })

      return {
        success: false,
        message: "Please fix the errors in the form",
        errors: formattedErrors,
      }
    }

    const validatedData = validationResult.data

    // Check for honeypot field (should be empty)
    if (validatedData.honeypot && validatedData.honeypot.length > 0) {
      // Don't reveal that this is a honeypot check
      return {
        success: false,
        message: "There was a problem with your submission. Please try again.",
      }
    }

    // Validate CSRF token
    if (!validateFormToken(validatedData.formToken)) {
      return {
        success: false,
        message: "Invalid form submission. Please refresh the page and try again.",
      }
    }

    // Check submission timestamp to prevent too-quick submissions
    const submissionTime = validatedData.timestamp
    const currentTime = new Date()
    const timeDifference = currentTime.getTime() - submissionTime.getTime()

    // If form was submitted in less than 2 seconds, likely a bot
    if (timeDifference < 2000) {
      return {
        success: false,
        message: "Your submission was too quick. Please try again.",
      }
    }

    // Implement rate limiting based on IP address
    // In a real app, you would use the user's IP address
    const userIdentifier = "user_ip_would_go_here"

    const userSubmissions = submissionTracker.get(userIdentifier) || { count: 0, lastSubmission: new Date(0) }
    const timeSinceLastSubmission = currentTime.getTime() - userSubmissions.lastSubmission.getTime()

    // Reset count if last submission was more than an hour ago
    if (timeSinceLastSubmission > 60 * 60 * 1000) {
      userSubmissions.count = 0
    }

    // Check if user has submitted too many forms recently
    if (userSubmissions.count >= 5) {
      return {
        success: false,
        message: "Too many submissions. Please try again later.",
      }
    }

    // Update submission tracker
    submissionTracker.set(userIdentifier, {
      count: userSubmissions.count + 1,
      lastSubmission: currentTime,
    })

    // Simulate server processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

   // In a real application, you would send an email, store in a database, etc.
    const resend = new Resend(process.env.RESEND_API_KEY!);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: validatedData.email,
      subject: `[Contact] ${validatedData.subject}`,
      text: `From: ${validatedData.name} <${validatedData.email}>\n\n${validatedData.message}`,
    });


    // Uncomment to simulate a random server error for testing
    // if (Math.random() > 0.7) {
    //   throw new Error("Random server error")
    // }

    // Clear form data from cache
    revalidatePath("/contact")

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    return {
      success: false,
      message: "There was a problem submitting your form. Please try again later.",
    }
  }
}

