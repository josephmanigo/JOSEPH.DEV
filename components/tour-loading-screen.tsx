"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function TourLoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Show loader for 2.2 seconds, then trigger exit transition
    const timer = setTimeout(() => {
      setIsExiting(true)
      // Call parent onLoadingComplete after the slide up transition finishes
      const exitTimer = setTimeout(() => {
        onLoadingComplete()
      }, 900) // matches transition duration (0.85s) + buffer
      return () => clearTimeout(exitTimer)
    }, 2200)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: isExiting ? "-100%" : "0%" }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1], // Custom premium ease (power4.inOut equivalent)
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] text-white select-none overflow-hidden"
    >
      {/* Main Title Center Block - Stacked vertically */}
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* CEBU & BOHOL. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1], // Deceleration curve
            delay: 0.2,
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter font-serif text-white leading-none px-4"
        >
          CEBU & BOHOL
        </motion.div>

        {/* TOUR (Under CEBU & BOHOL, bigger) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
            delay: 0.4,
          }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-[0.25em] font-sans text-white/50 mt-2 md:mt-4 leading-none"
        >
          TOUR
        </motion.div>
      </div>

      {/* Bottom Motto Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
        className="absolute bottom-12 font-sans text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-white/90"
      >
        EDUCATIONAL JOURNEY
      </motion.div>
    </motion.div>
  )
}
