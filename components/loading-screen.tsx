"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Code2, Terminal, Braces, FileCode, Database, Cpu, Globe } from "lucide-react"
import { BackgroundRays } from "@/components/background-rays"

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onLoadingComplete, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  const icons = [
    { Icon: Github, delay: 0 },
    { Icon: Code2, delay: 0.1 },
    { Icon: Terminal, delay: 0.2 },
    { Icon: Braces, delay: 0.3 },
    { Icon: FileCode, delay: 0.4 },
    { Icon: Database, delay: 0.5 },
    { Icon: Cpu, delay: 0.6 },
    { Icon: Globe, delay: 0.7 },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <BackgroundRays />

          {/* Coding Icons */}
          <div className="flex gap-4 mb-12 relative z-10">
            {icons.map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    delay: delay + 0.5,
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="w-8 h-8 text-gray-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Welcome Text */}
          <div className="text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent"
            >
              Welcome To
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent mt-2"
            >
              JOSEPH.DEV
            </motion.h1>
          </div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative z-10"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.4, duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
