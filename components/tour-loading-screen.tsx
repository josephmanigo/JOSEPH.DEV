"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, MapPin, Camera, Mountain, Globe2, Ship, Landmark } from "lucide-react"
import { BackgroundRays } from "@/components/background-rays"

export function TourLoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const phase1 = setTimeout(() => setCurrentPhase(1), 600)
    const phase2 = setTimeout(() => setCurrentPhase(2), 1200)
    const phase3 = setTimeout(() => setCurrentPhase(3), 1800)
    const phase4 = setTimeout(() => setCurrentPhase(4), 2400)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 800)
    }, 4000)

    return () => {
      clearTimeout(phase1)
      clearTimeout(phase2)
      clearTimeout(phase3)
      clearTimeout(phase4)
      clearTimeout(timer)
    }
  }, [onLoadingComplete])

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  const destinations = [
    { name: "Cebu City", icon: Landmark },
    { name: "Bohol", icon: Mountain },
    { name: "Chocolate Hills", icon: Mountain },
    { name: "Basilica", icon: Landmark },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <BackgroundRays />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/20"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Animated globe with orbit ring */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
          >
            {/* Outer orbit ring */}
            <motion.div
              className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Inner orbit ring */}
            <motion.div
              className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-primary/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Globe */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Globe2 className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] text-foreground" strokeWidth={0.3} />
            </motion.div>
          </motion.div>

          {/* Orbiting travel icons on the rings */}
          {[
            { Icon: Plane, radius: 250, duration: 8, startAngle: 0 },
            { Icon: Ship, radius: 250, duration: 8, startAngle: 180 },
            { Icon: Camera, radius: 175, duration: 6, startAngle: 90 },
            { Icon: MapPin, radius: 175, duration: 6, startAngle: 270 },
          ].map(({ Icon, radius, duration, startAngle }, index) => (
            <motion.div
              key={index}
              className="absolute pointer-events-none"
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  left: "50%",
                  top: 0,
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
              >
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
          ))}

          {/* Flying plane with trail */}
          <motion.div
            className="absolute pointer-events-none"
            initial={{ x: "-10vw", y: "20vh", opacity: 0, rotate: -15 }}
            animate={{
              x: ["0vw", "30vw", "50vw", "70vw", "110vw"],
              y: ["20vh", "10vh", "15vh", "5vh", "10vh"],
              opacity: [0, 1, 1, 1, 0],
              rotate: [-15, -20, -10, -25, -15],
            }}
            transition={{
              duration: 3.5,
              delay: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Trail effect */}
              <motion.div
                className="absolute -left-20 top-1/2 -translate-y-1/2 w-20 h-0.5 bg-gradient-to-l from-primary/50 to-transparent"
                animate={{ width: [20, 40, 20] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              />
              <Plane className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          {/* Main text container */}
          <div className="text-center relative z-10 px-4">
            {/* "Welcome To My" - Letter by letter reveal */}
            <div className="overflow-hidden mb-2">
              <motion.div className="flex justify-center flex-wrap gap-x-3 md:gap-x-4">
                {"Welcome To My".split(" ").map((word, wordIndex) => (
                  <div key={wordIndex} className="flex">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0, rotateX: -90 }}
                        animate={{
                          y: currentPhase >= 1 ? 0 : 100,
                          opacity: currentPhase >= 1 ? 1 : 0,
                          rotateX: currentPhase >= 1 ? 0 : -90,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground/80"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* "Educational Tour" - Big dramatic reveal */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 120, opacity: 0, scale: 0.8 }}
                animate={{
                  y: currentPhase >= 2 ? 0 : 120,
                  opacity: currentPhase >= 2 ? 1 : 0,
                  scale: currentPhase >= 2 ? 1 : 0.8,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black">
                  <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                    EDUCATIONAL
                  </span>
                </h1>
                <motion.h1
                  className="text-4xl md:text-7xl lg:text-8xl font-black -mt-1 md:-mt-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: currentPhase >= 2 ? 1 : 0,
                    x: currentPhase >= 2 ? 0 : -50,
                  }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
                    TOUR
                  </span>
                </motion.h1>
              </motion.div>
            </div>

            {/* Decorative line */}
            <motion.div
              className="mx-auto mt-6 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: currentPhase >= 3 ? 200 : 0,
                opacity: currentPhase >= 3 ? 1 : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Destination cards */}
          <motion.div
            className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentPhase >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.name}
                className="flex flex-col items-center gap-2"
                initial={{ y: 40, opacity: 0, scale: 0.8 }}
                animate={{
                  y: currentPhase >= 3 ? 0 : 40,
                  opacity: currentPhase >= 3 ? 1 : 0,
                  scale: currentPhase >= 3 ? 1 : 0.8,
                }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 20px 5px rgba(59, 130, 246, 0.2)",
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                >
                  <dest.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <span className="text-xs md:text-sm text-muted-foreground font-medium whitespace-nowrap">
                  {dest.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated loading bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: currentPhase >= 4 ? 1 : 0, y: currentPhase >= 4 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 md:w-64"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.5, duration: 1.3, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary via-blue-400 to-cyan-400 rounded-full"
              />
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="mt-3 text-xs md:text-sm text-muted-foreground text-center"
            >
              Loading adventure...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
