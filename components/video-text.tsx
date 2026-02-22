"use client"

import type React from "react"
import { useRef, useEffect, useState, useId } from "react"
import { cn } from "@/lib/utils"

interface VideoTextProps {
  src: string
  children: React.ReactNode
  className?: string
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function VideoText({ src, children, className }: VideoTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [fontSize, setFontSize] = useState(100)
  const uniqueId = useId()
  const maskId = `textMask-${uniqueId.replace(/:/g, "")}`

  const youtubeId = getYouTubeId(src)

  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setFontSize(width * 0.15)
      }
    }

    updateFontSize()
    window.addEventListener("resize", updateFontSize)
    return () => window.removeEventListener("resize", updateFontSize)
  }, [])

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 pointer-events-none"
          style={{
            border: 0,
            width: "300%",
            height: "300%",
            top: "-100%",
            left: "-100%",
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="black"
              style={{ fontSize: `${fontSize}px`, fontWeight: 700 }}
            >
              {children}
            </text>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="hsl(var(--background))" mask={`url(#${maskId})`} />
      </svg>
    </div>
  )
}
