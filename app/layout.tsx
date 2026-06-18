import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://josephmanigo.dev"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Joseph Manigo | UI/UX & Frontend Developer Portfolio",
    template: "%s | Joseph Manigo",
  },
  description:
    "Portfolio of Joseph Manigo — a UI/UX designer and frontend developer from Davao City, Philippines. Specializing in React, Next.js, and TypeScript to craft modern, responsive web experiences.",
  keywords: [
    "Joseph Manigo",
    "UI/UX Designer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Developer Philippines",
    "Davao City Developer",
    "Portfolio",
    "JOSEPH.DEV",
  ],
  authors: [{ name: "Joseph Manigo", url: siteUrl }],
  creator: "Joseph Manigo",
  publisher: "Joseph Manigo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "JOSEPH.DEV",
    title: "Joseph Manigo | UI/UX & Frontend Developer",
    description:
      "UI/UX designer and frontend developer crafting modern, responsive web experiences with React, Next.js, and TypeScript.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joseph Manigo — UI/UX & Frontend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Manigo | UI/UX & Frontend Developer",
    description:
      "UI/UX designer and frontend developer crafting modern, responsive web experiences with React, Next.js, and TypeScript.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/favicon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Joseph Manigo",
              url: siteUrl,
              image: `${siteUrl}/images/mascot.png`,
              jobTitle: "UI/UX Designer & Frontend Developer",
              description:
                "Third-year BSIT student from Davao City, Philippines, specializing in UI/UX and front-end development.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Davao City",
                addressCountry: "PH",
              },
              knowsAbout: [
                "UI/UX Design",
                "Frontend Development",
                "React",
                "Next.js",
                "TypeScript",
                "Web Development",
              ],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
