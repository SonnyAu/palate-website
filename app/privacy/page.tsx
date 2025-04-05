"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FloatingShape } from "@/components/animations/floating-shape"
import { MotionHeading } from "@/components/animations/motion-heading"
import { MotionParagraph } from "@/components/animations/motion-paragraph"
import { MotionSection } from "@/components/animations/motion-section"
import { WavyGradientBackground } from "@/components/animations/wavy-gradient-background"
import { MainNav } from "@/components/main-nav"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-12 md:py-24">
          <WavyGradientBackground baseColor="#FFD8B5" />
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
                    Privacy Policy
                  </MotionHeading>
                  <MotionParagraph
                    className="max-w-[800px] text-[#27292A] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    delay={0.1}
                  >
                    Last updated March 28, 2025
                  </MotionParagraph>
                </div>
              </MotionSection>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  This Privacy Notice for PalAte (&quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), describes how and why we
                  might access, collect, store, use, and/or share
                  (&quot;process&quot;) your personal information when you use
                  our services (&quot;Services&quot;), including when you:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Visit our website at
                    https://termly.io/faq/what-is-a-privacy-policy-url/, or any
                    website of ours that links to this Privacy Notice
                  </li>
                  <li>
                    Use PalAte. A mobile application that recommends you and
                    your friends&apos; restaurants based on everyone&apos;s
                    dietary restrictions or preferences.
                  </li>
                  <li>
                    Engage with us in other related ways, including any sales,
                    marketing, or events
                  </li>
                </ul>

                <p className="mt-6 font-medium">
                  Questions or concerns? Reading this Privacy Notice will help
                  you understand your privacy rights and choices. We are
                  responsible for making decisions about how your personal
                  information is processed. If you do not agree with our
                  policies and practices, please do not use our Services. If you
                  still have any questions or concerns, please contact us at{" "}
                  <a
                    href="mailto:info@pal-ate.com"
                    className="text-[#288132] hover:underline"
                  >
                    info@pal-ate.com
                  </a>
                  .
                </p>

                <h2 className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]">
                  SUMMARY OF KEY POINTS
                </h2>
                <p>
                  This summary provides key points from our Privacy Notice, but
                  you can find out more details about any of these topics by
                  clicking the link following each key point or by using our
                  table of contents below to find the section you are looking
                  for.
                </p>

                <p className="mt-4 font-medium">
                  What personal information do we process?
                </p>
                <p>
                  When you visit, use, or navigate our Services, we may process
                  personal information depending on how you interact with us and
                  the Services, the choices you make, and the products and
                  features you use. Learn more about personal information you
                  disclose to us.
                </p>

                <p className="mt-4 font-medium">
                  Do we process any sensitive personal information?
                </p>
                <p>
                  Some of the information may be considered &quot;special&quot;
                  or &quot;sensitive&quot; in certain jurisdictions, for example
                  your racial or ethnic origins, sexual orientation, and
                  religious beliefs. We may process sensitive personal
                  information when necessary with your consent or as otherwise
                  permitted by applicable law. Learn more about sensitive
                  information we process.
                </p>

                <p className="mt-4 font-medium">
                  Do we collect any information from third parties?
                </p>
                <p>We do not collect any information from third parties.</p>

                <p className="mt-4 font-medium">
                  How do we process your information?
                </p>
                <p>
                  We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                  We process your information only when we have a valid legal
                  reason to do so. Learn more about how we process your
                  information.
                </p>

                <p className="mt-4 font-medium">
                  In what situations and with which parties do we share personal
                  information?
                </p>
                <p>
                  We may share information in specific situations and with
                  specific third parties. Learn more about when and with whom we
                  share your personal information.
                </p>

                <p className="mt-4 font-medium">
                  How do we keep your information safe?
                </p>
                <p>
                  We have adequate organizational and technical processes and
                  procedures in place to protect your personal information.
                  However, no electronic transmission over the internet or
                  information storage technology can be guaranteed to be 100%
                  secure, so we cannot promise or guarantee that hackers,
                  cybercriminals, or other unauthorized third parties will not
                  be able to defeat our security and improperly collect, access,
                  steal, or modify your information. Learn more about how we
                  keep your information safe.
                </p>

                <p className="mt-4 font-medium">What are your rights?</p>
                <p>
                  Depending on where you are located geographically, the
                  applicable privacy law may mean you have certain rights
                  regarding your personal information. Learn more about your
                  privacy rights.
                </p>

                <p className="mt-4 font-medium">
                  How do you exercise your rights?
                </p>
                <p>
                  The easiest way to exercise your rights is by submitting a
                  data subject access request, or by contacting us. We will
                  consider and act upon any request in accordance with
                  applicable data protection laws.
                </p>

                <p>
                  Want to learn more about what we do with any information we
                  collect? Review the Privacy Notice in full.
                </p>

                <h2 className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]">
                  TABLE OF CONTENTS
                </h2>
                <ol className="list-decimal space-y-2 pl-6">
                  <li>
                    <a
                      href="#section1"
                      className="text-[#288132] hover:underline"
                    >
                      WHAT INFORMATION DO WE COLLECT?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section2"
                      className="text-[#288132] hover:underline"
                    >
                      HOW DO WE PROCESS YOUR INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section3"
                      className="text-[#288132] hover:underline"
                    >
                      WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section4"
                      className="text-[#288132] hover:underline"
                    >
                      DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section5"
                      className="text-[#288132] hover:underline"
                    >
                      DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section6"
                      className="text-[#288132] hover:underline"
                    >
                      HOW LONG DO WE KEEP YOUR INFORMATION?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section7"
                      className="text-[#288132] hover:underline"
                    >
                      HOW DO WE KEEP YOUR INFORMATION SAFE?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section8"
                      className="text-[#288132] hover:underline"
                    >
                      DO WE COLLECT INFORMATION FROM MINORS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section9"
                      className="text-[#288132] hover:underline"
                    >
                      WHAT ARE YOUR PRIVACY RIGHTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section10"
                      className="text-[#288132] hover:underline"
                    >
                      CONTROLS FOR DO-NOT-TRACK FEATURES
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section11"
                      className="text-[#288132] hover:underline"
                    >
                      DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section12"
                      className="text-[#288132] hover:underline"
                    >
                      DO WE MAKE UPDATES TO THIS NOTICE?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section13"
                      className="text-[#288132] hover:underline"
                    >
                      HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section14"
                      className="text-[#288132] hover:underline"
                    >
                      HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                      FROM YOU?
                    </a>
                  </li>
                </ol>

                <h2
                  id="section1"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  1. WHAT INFORMATION DO WE COLLECT?
                </h2>
                <p className="font-medium">
                  Personal information you disclose to us
                </p>
                <p>
                  <em>
                    In Short: We collect personal information that you provide
                    to us.
                  </em>
                </p>
                <p>
                  We collect personal information that you voluntarily provide
                  to us when you register on the Services, express an interest
                  in obtaining information about us or our products and
                  Services, when you participate in activities on the Services,
                  or otherwise when you contact us.
                </p>

                <p className="mt-4 font-medium">
                  Personal Information Provided by You.
                </p>
                <p>
                  The personal information that we collect depends on the
                  context of your interactions with us and the Services, the
                  choices you make, and the products and features you use. The
                  personal information we collect may include the following:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>debit/credit card numbers</li>
                  <li>billing addresses</li>
                  <li>contact or authentication data</li>
                  <li>contact preferences</li>
                  <li>passwords</li>
                  <li>usernames</li>
                </ul>

                <p className="mt-4 font-medium">Sensitive Information.</p>
                <p>
                  When necessary, with your consent or as otherwise permitted by
                  applicable law, we process the following categories of
                  sensitive information:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>health data</li>
                  <li>
                    information revealing religious or philosophical beliefs
                  </li>
                </ul>
                <p>
                  All personal information that you provide to us must be true,
                  complete, and accurate, and you must notify us of any changes
                  to such personal information.
                </p>

                <p className="mt-4 font-medium">
                  Information automatically collected
                </p>
                <p>
                  <em>
                    In Short: Some information — such as your Internet Protocol
                    (IP) address and/or browser and device characteristics — is
                    collected automatically when you visit our Services.
                  </em>
                </p>
                <p>
                  We automatically collect certain information when you visit,
                  use, or navigate the Services. This information does not
                  reveal your specific identity (like your name or contact
                  information) but may include device and usage information,
                  such as your IP address, browser and device characteristics,
                  operating system, language preferences, referring URLs, device
                  name, country, location, information about how and when you
                  use our Services, and other technical information. This
                  information is primarily needed to maintain the security and
                  operation of our Services, and for our internal analytics and
                  reporting purposes.
                </p>
                <p>
                  Like many businesses, we also collect information through
                  cookies and similar technologies. The information we collect
                  includes:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <span className="font-medium">Device Data.</span> We collect
                    device data such as information about your computer, phone,
                    tablet, or other device you use to access the Services.
                    Depending on the device used, this device data may include
                    information such as your IP address (or proxy server),
                    device and application identification numbers, location,
                    browser type, hardware model, Internet service provider
                    and/or mobile carrier, operating system, and system
                    configuration information.
                  </li>
                  <li>
                    <span className="font-medium">Location Data.</span> We
                    collect location data such as information about your
                    device&apos;s location, which can be either precise or
                    imprecise. How much information we collect depends on the
                    type and settings of the device you use to access the
                    Services. For example, we may use GPS and other technologies
                    to collect geolocation data that tells us your current
                    location (based on your IP address). You can opt out of
                    allowing us to collect this information either by refusing
                    access to the information or by disabling your Location
                    setting on your device. However, if you choose to opt out,
                    you may not be able to use certain aspects of the Services.
                  </li>
                </ul>

                <p className="mt-4 font-medium">Google API</p>
                <p>
                  Our use of information received from Google APIs will adhere
                  to{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#288132] hover:underline"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#288132] hover:underline"
                  >
                    Limited Use requirements
                  </a>
                  .
                </p>

                <h2
                  id="section2"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  2. HOW DO WE PROCESS YOUR INFORMATION?
                </h2>
                <p>
                  <em>
                    In Short: We process your information to provide, improve,
                    and administer our Services, communicate with you, for
                    security and fraud prevention, and to comply with law. We
                    may also process your information for other purposes with
                    your consent.
                  </em>
                </p>
                <p>
                  We process your personal information for a variety of reasons,
                  depending on how you interact with our Services, including:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <span className="font-medium">
                      To facilitate account creation and authentication and
                      otherwise manage user accounts.
                    </span>{" "}
                    We may process your information so you can create and log in
                    to your account, as well as keep your account in working
                    order.
                  </li>
                  <li>
                    <span className="font-medium">
                      To deliver and facilitate delivery of services to the
                      user.
                    </span>{" "}
                    We may process your information to provide you with the
                    requested service.
                  </li>
                  <li>
                    <span className="font-medium">
                      To fulfill and manage your orders.
                    </span>{" "}
                    We may process your information to fulfill and manage your
                    orders, payments, returns, and exchanges made through the
                    Services.
                  </li>
                  <li>
                    <span className="font-medium">
                      To enable user-to-user communications.
                    </span>{" "}
                    We may process your information if you choose to use any of
                    our offerings that allow for communication with another
                    user.
                  </li>
                  <li>
                    <span className="font-medium">
                      To send you marketing and promotional communications.
                    </span>{" "}
                    We may process the personal information you send to us for
                    our marketing purposes, if this is in accordance with your
                    marketing preferences. You can opt out of our marketing
                    emails at any time. For more information, see &quot;WHAT ARE
                    YOUR PRIVACY RIGHTS?&quot; below.
                  </li>
                  <li>
                    <span className="font-medium">To post testimonials.</span>{" "}
                    We post testimonials on our Services that may contain
                    personal information.
                  </li>
                  <li>
                    <span className="font-medium">
                      To evaluate and improve our Services, products, marketing,
                      and your experience.
                    </span>{" "}
                    We may process your information when we believe it is
                    necessary to identify usage trends, determine the
                    effectiveness of our promotional campaigns, and to evaluate
                    and improve our Services, products, marketing, and your
                    experience.
                  </li>
                </ul>

                <h2
                  id="section3"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h2>
                <p>
                  <em>
                    In Short: We may share information in specific situations
                    described in this section and/or with the following third
                    parties.
                  </em>
                </p>
                <p>
                  We may need to share your personal information in the
                  following situations:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <span className="font-medium">Business Transfers.</span> We
                    may share or transfer your information in connection with,
                    or during negotiations of, any merger, sale of company
                    assets, financing, or acquisition of all or a portion of our
                    business to another company.
                  </li>
                  <li>
                    <span className="font-medium">
                      When we use Google Maps Platform APIs.
                    </span>{" "}
                    We may share your information with certain Google Maps
                    Platform APIs (e.g., Google Maps API, Places API). Google
                    Maps uses GPS, Wi-Fi, and cell towers to estimate your
                    location. GPS is accurate to about 20 meters, while Wi-Fi
                    and cell towers help improve accuracy when GPS signals are
                    weak, like indoors. This data helps Google Maps provide
                    directions, but it is not always perfectly precise. We
                    obtain and store on your device (&quot;cache&quot;) your
                    location. You may revoke your consent anytime by contacting
                    us at the contact details provided at the end of this
                    document.
                  </li>
                  <li>
                    <span className="font-medium">Other Users.</span> When you
                    share personal information (for example, by posting
                    comments, contributions, or other content to the Services)
                    or otherwise interact with public areas of the Services,
                    such personal information may be viewed by all users and may
                    be publicly made available outside the Services in
                    perpetuity. Similarly, other users will be able to view
                    descriptions of your activity, communicate with you within
                    our Services, and view your profile.
                  </li>
                </ul>

                <h2
                  id="section4"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </h2>
                <p>
                  <em>
                    In Short: We may use cookies and other tracking technologies
                    to collect and store your information.
                  </em>
                </p>
                <p>
                  We may use cookies and similar tracking technologies (like web
                  beacons and pixels) to gather information when you interact
                  with our Services. Some online tracking technologies help us
                  maintain the security of our Services and your account,
                  prevent crashes, fix bugs, save your preferences, and assist
                  with basic site functions.
                </p>
                <p>
                  We also permit third parties and service providers to use
                  online tracking technologies on our Services for analytics and
                  advertising, including to help manage and display
                  advertisements, to tailor advertisements to your interests, or
                  to send abandoned shopping cart reminders (depending on your
                  communication preferences). The third parties and service
                  providers use their technology to provide advertising about
                  products and services tailored to your interests which may
                  appear either on our Services or on other websites.
                </p>
                <p>
                  To the extent these online tracking technologies are deemed to
                  be a &quot;sale&quot;/&quot;sharing&quot; (which includes
                  targeted advertising, as defined under the applicable laws)
                  under applicable US state laws, you can opt out of these
                  online tracking technologies by submitting a request as
                  described below under section &quot;DO UNITED STATES RESIDENTS
                  HAVE SPECIFIC PRIVACY RIGHTS?&quot;
                </p>
                <p>
                  Specific information about how we use such technologies and
                  how you can refuse certain cookies is set out in our Cookie
                  Notice.
                </p>

                <h2
                  id="section5"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  5. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                </h2>
                <p>
                  <em>
                    In Short: We offer products, features, or tools powered by
                    artificial intelligence, machine learning, or similar
                    technologies.
                  </em>
                </p>
                <p>
                  As part of our Services, we offer products, features, or tools
                  powered by artificial intelligence, machine learning, or
                  similar technologies (collectively, &quot;AI Products&quot;).
                  These tools are designed to enhance your experience and
                  provide you with innovative solutions. The terms in this
                  Privacy Notice govern your use of the AI Products within our
                  Services.
                </p>

                <p className="mt-4 font-medium">Use of AI Technologies</p>
                <p>
                  We provide the AI Products through third-party service
                  providers (&quot;AI Service Providers&quot;), including
                  Anthropic. As outlined in this Privacy Notice, your input,
                  output, and personal information will be shared with and
                  processed by these AI Service Providers to enable your use of
                  our AI Products for purposes outlined in &quot;WHEN AND WITH
                  WHOM DO WE SHARE YOUR PERSONAL INFORMATION?&quot; You must not
                  use the AI Products in any way that violates the terms or
                  policies of any AI Service Provider.
                </p>

                <p className="mt-4 font-medium">Our AI Products</p>
                <p>Our AI Products are designed for the following functions:</p>
                <ul className="list-disc pl-6">
                  <li>AI predictive analytics</li>
                </ul>

                <p className="mt-4 font-medium">
                  How We Process Your Data Using AI
                </p>
                <p>
                  All personal information processed using our AI Products is
                  handled in line with our Privacy Notice and our agreement with
                  third parties. This ensures high security and safeguards your
                  personal information throughout the process, giving you peace
                  of mind about your data&apos;s safety.
                </p>

                <h2
                  id="section6"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  6. HOW LONG DO WE KEEP YOUR INFORMATION?
                </h2>
                <p>
                  <em>
                    In Short: We keep your information for as long as necessary
                    to fulfill the purposes outlined in this Privacy Notice
                    unless otherwise required by law.
                  </em>
                </p>
                <p>
                  We will only keep your personal information for as long as it
                  is necessary for the purposes set out in this Privacy Notice,
                  unless a longer retention period is required or permitted by
                  law (such as tax, accounting, or other legal requirements). No
                  purpose in this notice will require us keeping your personal
                  information for longer than the period of time in which users
                  have an account with us.
                </p>
                <p>
                  When we have no ongoing legitimate business need to process
                  your personal information, we will either delete or anonymize
                  such information, or, if this is not possible (for example,
                  because your personal information has been stored in backup
                  archives), then we will securely store your personal
                  information and isolate it from any further processing until
                  deletion is possible.
                </p>

                <h2
                  id="section7"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                </h2>
                <p>
                  <em>
                    In Short: We aim to protect your personal information
                    through a system of organizational and technical security
                    measures.
                  </em>
                </p>
                <p>
                  We have implemented appropriate and reasonable technical and
                  organizational security measures designed to protect the
                  security of any personal information we process. However,
                  despite our safeguards and efforts to secure your information,
                  no electronic transmission over the Internet or information
                  storage technology can be guaranteed to be 100% secure, so we
                  cannot promise or guarantee that hackers, cybercriminals, or
                  other unauthorized third parties will not be able to defeat
                  our security and improperly collect, access, steal, or modify
                  your information. Although we will do our best to protect your
                  personal information, transmission of personal information to
                  and from our Services is at your own risk. You should only
                  access the Services within a secure environment.
                </p>

                <h2
                  id="section8"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  8. DO WE COLLECT INFORMATION FROM MINORS?
                </h2>
                <p>
                  <em>
                    In Short: We do not knowingly collect data from or market to
                    children under 18 years of age.
                  </em>
                </p>
                <p>
                  We do not knowingly collect, solicit data from, or market to
                  children under 18 years of age, nor do we knowingly sell such
                  personal information. By using the Services, you represent
                  that you are at least 18 or that you are the parent or
                  guardian of such a minor and consent to such minor
                  dependent&apos;s use of the Services. If we learn that
                  personal information from users less than 18 years of age has
                  been collected, we will deactivate the account and take
                  reasonable measures to promptly delete such data from our
                  records. If you become aware of any data we may have collected
                  from children under age 18, please contact us at{" "}
                  <a
                    href="mailto:info@pal-ate.com"
                    className="text-[#288132] hover:underline"
                  >
                    info@pal-ate.com
                  </a>
                  .
                </p>

                <h2
                  id="section9"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  9. WHAT ARE YOUR PRIVACY RIGHTS?
                </h2>
                <p>
                  <em>
                    In Short: You may review, change, or terminate your account
                    at any time, depending on your country, province, or state
                    of residence.
                  </em>
                </p>
                <p className="font-medium">Withdrawing your consent:</p>
                <p>
                  If we are relying on your consent to process your personal
                  information, which may be express and/or implied consent
                  depending on the applicable law, you have the right to
                  withdraw your consent at any time. You can withdraw your
                  consent at any time by contacting us by using the contact
                  details provided in the section &quot;HOW CAN YOU CONTACT US
                  ABOUT THIS NOTICE?&quot; below.
                </p>
                <p>
                  However, please note that this will not affect the lawfulness
                  of the processing before its withdrawal nor, when applicable
                  law allows, will it affect the processing of your personal
                  information conducted in reliance on lawful processing grounds
                  other than consent.
                </p>

                <p className="mt-4 font-medium">
                  Opting out of marketing and promotional communications:
                </p>
                <p>
                  You can unsubscribe from our marketing and promotional
                  communications at any time by clicking on the unsubscribe link
                  in the emails that we send, or by contacting us using the
                  details provided in the section &quot;HOW CAN YOU CONTACT US
                  ABOUT THIS NOTICE?&quot; below. You will then be removed from
                  the marketing lists. However, we may still communicate with
                  you — for example, to send you service-related messages that
                  are necessary for the administration and use of your account,
                  to respond to service requests, or for other non-marketing
                  purposes.
                </p>

                <p className="mt-4 font-medium">Account Information</p>
                <p>
                  If you would at any time like to review or change the
                  information in your account or terminate your account, you
                  can:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    Log in to your account settings and update your user
                    account.
                  </li>
                  <li>Contact us using the contact information provided.</li>
                </ul>
                <p>
                  Upon your request to terminate your account, we will
                  deactivate or delete your account and information from our
                  active databases. However, we may retain some information in
                  our files to prevent fraud, troubleshoot problems, assist with
                  any investigations, enforce our legal terms and/or comply with
                  applicable legal requirements.
                </p>

                <p className="mt-4 font-medium">
                  Cookies and similar technologies:
                </p>
                <p>
                  Most Web browsers are set to accept cookies by default. If you
                  prefer, you can usually choose to set your browser to remove
                  cookies and to reject cookies. If you choose to remove cookies
                  or reject cookies, this could affect certain features or
                  services of our Services. cookies, this could affect certain
                  features or services of our Services.
                </p>
                <p>
                  If you have questions or comments about your privacy rights,
                  you may email us at
                  <a
                    href="mailto:info@pal-ate.com"
                    className="ml-1 text-[#288132] hover:underline"
                  >
                    info@pal-ate.com
                  </a>
                  .
                </p>

                <h2
                  id="section10"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  10. CONTROLS FOR DO-NOT-TRACK FEATURES
                </h2>
                <p>
                  Most web browsers and some mobile operating systems and mobile
                  applications include a Do-Not-Track (&quot;DNT&quot;) feature
                  or setting you can activate to signal your privacy preference
                  not to have data about your online browsing activities
                  monitored and collected. At this stage, no uniform technology
                  standard for recognizing and implementing DNT signals has been
                  finalized. As such, we do not currently respond to DNT browser
                  signals or any other mechanism that automatically communicates
                  your choice not to be tracked online. If a standard for online
                  tracking is adopted that we must follow in the future, we will
                  inform you about that practice in a revised version of this
                  Privacy Notice.
                </p>
                <p>
                  California law requires us to let you know how we respond to
                  web browser DNT signals. Because there currently is not an
                  industry or legal standard for recognizing or honoring DNT
                  signals, we do not respond to them at this time.
                </p>

                <h2
                  id="section11"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </h2>
                <p>
                  <em>
                    In Short: If you are a resident of California, you may have
                    the right to request access to and receive details about the
                    personal information we maintain about you and how we have
                    processed it, correct inaccuracies, get a copy of, or delete
                    your personal information. You may also have the right to
                    withdraw your consent to our processing of your personal
                    information. These rights may be limited in some
                    circumstances by applicable law. More information is
                    provided below.
                  </em>
                </p>

                <p className="mt-4 font-medium">
                  Categories of Personal Information We Collect
                </p>
                <p>
                  We have collected the following categories of personal
                  information in the past twelve (12) months:
                </p>

                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border border-gray-200 bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border-b px-4 py-2 text-left">
                          Category
                        </th>
                        <th className="border-b px-4 py-2 text-left">
                          Examples
                        </th>
                        <th className="border-b px-4 py-2 text-center">
                          Collected
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          A. Identifiers
                        </td>
                        <td className="border-b px-4 py-2">
                          Contact details, such as real name, alias, postal
                          address, telephone or mobile contact number, unique
                          personal identifier, online identifier, Internet
                          Protocol address, email address, and account name
                        </td>
                        <td className="border-b px-4 py-2 text-center">YES</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          B. Personal information as defined in the California
                          Customer Records statute
                        </td>
                        <td className="border-b px-4 py-2">
                          Name, contact information, education, employment,
                          employment history, and financial information
                        </td>
                        <td className="border-b px-4 py-2 text-center">YES</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          C. Protected classification characteristics under
                          state or federal law
                        </td>
                        <td className="border-b px-4 py-2">
                          Gender, age, date of birth, race and ethnicity,
                          national origin, marital status, and other demographic
                          data
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          D. Commercial information
                        </td>
                        <td className="border-b px-4 py-2">
                          Transaction information, purchase history, financial
                          details, and payment information
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          E. Biometric information
                        </td>
                        <td className="border-b px-4 py-2">
                          Fingerprints and voiceprints
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          F. Internet or other similar network activity
                        </td>
                        <td className="border-b px-4 py-2">
                          Browsing history, search history, online behavior,
                          interest data, and interactions with our and other
                          websites, applications, systems, and advertisements
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          G. Geolocation data
                        </td>
                        <td className="border-b px-4 py-2">Device location</td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          H. Audio, electronic, sensory, or similar information
                        </td>
                        <td className="border-b px-4 py-2">
                          Images and audio, video or call recordings created in
                          connection with our business activities
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          I. Professional or employment-related information
                        </td>
                        <td className="border-b px-4 py-2">
                          Business contact details in order to provide you our
                          Services at a business level or job title, work
                          history, and professional qualifications if you apply
                          for a job with us
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          J. Education Information
                        </td>
                        <td className="border-b px-4 py-2">
                          Student records and directory information
                        </td>
                        <td className="border-b px-4 py-2 text-center">NO</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          K. Inferences drawn from collected personal
                          information
                        </td>
                        <td className="border-b px-4 py-2">
                          Inferences drawn from any of the collected personal
                          information listed above to create a profile or
                          summary about, for example, an individual&apos;s
                          preferences and characteristics
                        </td>
                        <td className="border-b px-4 py-2 text-center">YES</td>
                      </tr>
                      <tr>
                        <td className="border-b px-4 py-2 font-medium">
                          L. Sensitive personal information
                        </td>
                        <td className="border-b px-4 py-2">
                          Health data, account login information and religious
                          or philosophical beliefs
                        </td>
                        <td className="border-b px-4 py-2 text-center">YES</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">
                  We only collect sensitive personal information, as defined by
                  applicable privacy laws or the purposes allowed by law or with
                  your consent. Sensitive personal information may be used, or
                  disclosed to a service provider or contractor, for additional,
                  specified purposes. You may have the right to limit the use or
                  disclosure of your sensitive personal information. We do not
                  collect or process sensitive personal information for the
                  purpose of inferring characteristics about you.
                </p>

                <p className="mt-4">
                  We may also collect other personal information outside of
                  these categories through instances where you interact with us
                  in person, online, or by phone or mail in the context of:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Receiving help through our customer support channels;</li>
                  <li>Participation in customer surveys or contests; and</li>
                  <li>
                    Facilitation in the delivery of our Services and to respond
                    to your inquiries.
                  </li>
                </ul>

                <p className="mt-4">
                  We will use and retain the collected personal information as
                  needed to provide the Services or for:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    Category A – As long as the user has an account with us
                  </li>
                  <li>
                    Category B – As long as the user has an account with us
                  </li>
                  <li>
                    Category K – As long as the user has an account with us
                  </li>
                  <li>
                    Category L – As long as the user has an account with us
                  </li>
                </ul>

                <p className="mt-4 font-medium">
                  Sources of Personal Information
                </p>
                <p>
                  Learn more about the sources of personal information we
                  collect in &quot;WHAT INFORMATION DO WE COLLECT?&quot;
                </p>

                <p className="mt-4 font-medium">
                  How We Use and Share Personal Information
                </p>
                <p>
                  Learn more about how we use your personal information in the
                  section, &quot;HOW DO WE PROCESS YOUR INFORMATION?&quot;
                </p>

                <p className="mt-4 font-medium">
                  Will your information be shared with anyone else?
                </p>
                <p>
                  We may disclose your personal information with our service
                  providers pursuant to a written contract between us and each
                  service provider. Learn more about how we disclose personal
                  information in the section, &quot;WHEN AND WITH WHOM DO WE
                  SHARE YOUR PERSONAL INFORMATION?&quot;
                </p>
                <p>
                  We may use your personal information for our own business
                  purposes, such as for undertaking internal research for
                  technological development and demonstration. This is not
                  considered to be &quot;selling&quot; of your personal
                  information.
                </p>
                <p>
                  We have not disclosed, sold, or shared any personal
                  information to third parties for a business or commercial
                  purpose in the preceding twelve (12) months. We will not sell
                  or share personal information in the future belonging to
                  website visitors, users, and other consumers.
                </p>

                <p className="mt-4 font-medium">Your Rights</p>
                <p>
                  You have rights under certain US state data protection laws.
                  However, these rights are not absolute, and in certain cases,
                  we may decline your request as permitted by law. These rights
                  include:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    Right to know whether or not we are processing your personal
                    data
                  </li>
                  <li>Right to access your personal data</li>
                  <li>Right to correct inaccuracies in your personal data</li>
                  <li>Right to request the deletion of your personal data</li>
                  <li>
                    Right to obtain a copy of the personal data you previously
                    shared with us
                  </li>
                  <li>
                    Right to non-discrimination for exercising your rights
                  </li>
                  <li>
                    Right to opt out of the processing of your personal data if
                    it is used for targeted advertising (or sharing as defined
                    under California&apos;s privacy law), the sale of personal
                    data, or profiling in furtherance of decisions that produce
                    legal or similarly significant effects
                    (&quot;profiling&quot;)
                  </li>
                </ul>

                <p className="mt-4">
                  Depending upon the state where you live, you may also have the
                  following rights:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    Right to obtain a list of the categories of third parties to
                    which we have disclosed personal data (as permitted by
                    applicable law, including the privacy law in California)
                  </li>
                  <li>
                    Right to limit use and disclosure of sensitive personal data
                    (as permitted by applicable law, including the privacy law
                    in California)
                  </li>
                </ul>

                <p className="mt-4 font-medium">How to Exercise Your Rights</p>
                <p>
                  To exercise these rights, you can contact us by submitting a
                  data subject access request, by emailing us at{" "}
                  <a
                    href="mailto:info@pal-ate.com"
                    className="text-[#288132] hover:underline"
                  >
                    info@pal-ate.com
                  </a>
                  , by calling toll-free at 1-949-562-5265, by visiting
                  contactthesenute.com, or by referring to the contact details
                  at the bottom of this document.
                </p>
                <p>
                  Under certain US state data protection laws, you can designate
                  an authorized agent to make a request on your behalf. We may
                  deny a request from an authorized agent that does not submit
                  proof that they have been validly authorized to act on your
                  behalf in accordance with applicable laws.
                </p>

                <p className="mt-4 font-medium">Request Verification</p>
                <p>
                  Upon receiving your request, we will need to verify your
                  identity to determine you are the same person about whom we
                  have the information in our system. We will only use personal
                  information provided in your request to verify your identity
                  or authority to make the request. However, if we cannot verify
                  your identity from the information already maintained by us,
                  we may request that you provide additional information for the
                  purposes of verifying your identity and for security or
                  fraud-prevention purposes.
                </p>
                <p>
                  If you submit the request through an authorized agent, we may
                  need to collect additional information to verify your identity
                  before processing your request and the agent will need to
                  provide a written and signed permission from you to submit
                  such request on your behalf.
                </p>

                <p className="mt-4 font-medium">
                  California &quot;Shine The Light&quot; Law
                </p>
                <p>
                  California Civil Code Section 1798.83, also known as the
                  &quot;Shine The Light&quot; law, permits our users who are
                  California residents to request and obtain from us, once a
                  year and free of charge, information about categories of
                  personal information (if any) we disclosed to third parties
                  for direct marketing purposes and the names and addresses of
                  all third parties with which we shared personal information in
                  the immediately preceding calendar year. If you are a
                  California resident and would like to make such a request,
                  please submit your request in writing to us by using the
                  contact details provided in the section &quot;HOW CAN YOU
                  CONTACT US ABOUT THIS NOTICE?&quot;
                </p>

                <h2
                  id="section12"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  12. DO WE MAKE UPDATES TO THIS NOTICE?
                </h2>
                <p>
                  <em>
                    In Short: Yes, we will update this notice as necessary to
                    stay compliant with relevant laws.
                  </em>
                </p>
                <p>
                  We may update this Privacy Notice from time to time. The
                  updated version will be indicated by an updated
                  &quot;Revised&quot; date at the top of this Privacy Notice. If
                  we make material changes to this Privacy Notice, we may notify
                  you either by prominently posting a notice of such changes or
                  by directly sending you a notification. We encourage you to
                  review this Privacy Notice frequently to be informed of how we
                  are protecting your information.
                </p>

                <h2
                  id="section13"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </h2>
                <p>
                  If you have questions or comments about this notice, you may
                  email us at{" "}
                  <a
                    href="mailto:info@pal-ate.com"
                    className="text-[#288132] hover:underline"
                  >
                    info@pal-ate.com
                  </a>
                  or contact us by post at:
                </p>
                <p>
                  PalAte
                  <br />
                  [Blank Address]
                  <br />
                  United States
                </p>

                <h2
                  id="section14"
                  className="mb-4 mt-8 text-2xl font-bold text-[#3f301d]"
                >
                  14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </h2>
                <p>
                  Based on the applicable laws of your country or state of
                  residence in the US, you may have the right to request access
                  to the personal information we collect from you, details about
                  how we have processed it, correct inaccuracies, or delete your
                  personal information. You may also have the right to withdraw
                  your consent to our processing of your personal information.
                  These rights may be limited in some circumstances by
                  applicable law. To request to review, update, or delete your
                  personal information, please fill out and submit a data
                  subject access request.
                </p>
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
