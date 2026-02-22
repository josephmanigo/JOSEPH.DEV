"use client"

import { TourGallery } from "@/components/tour-gallery"
import { BackgroundRays } from "@/components/background-rays"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowDown, ArrowUp } from "lucide-react"

export default function TourGalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundRays />

      {/* Header */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            href="/educational-tour"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Educational Tour
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 text-foreground"
        >
          Tour Memories
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-12"
        >
          A visual journey through our educational tour in Cebu and Bohol - November 2025
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm uppercase tracking-widest">Scroll down to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gallery */}
      <TourGallery />

      {/* Footer */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowUp className="h-6 w-6 text-muted-foreground" />
          </motion.div>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Scroll up to see more</span>

          <h2 className="text-3xl md:text-4xl font-bold mt-8 text-foreground">Thank You for Viewing</h2>
          <p className="text-muted-foreground max-w-md">
            These memories capture the essence of our educational journey through Cebu and Bohol.
          </p>

          <Link
            href="/educational-tour"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Educational Tour
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
