"use client"

import dynamic from "next/dynamic"

const LightRays = dynamic(() => import("./light-rays"), { ssr: false })

export function BackgroundRays() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <LightRays
        raysOrigin="top-center"
        raysColor="#888888"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
      />
    </div>
  )
}
