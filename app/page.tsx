"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"

import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BackgroundRays } from "@/components/background-rays"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <main
        className={`min-h-screen relative z-10 ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
      >
        <BackgroundRays />
        <Navbar />
        <HeroSection />
        <AboutSection />

        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
