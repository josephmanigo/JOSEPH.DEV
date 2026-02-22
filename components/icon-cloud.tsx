"use client"

import React from "react"

import { useEffect, useMemo, useState, useRef } from "react"
import { Cloud, fetchSimpleIcons, type ICloud, renderSimpleIcon, type SimpleIcon } from "react-icon-cloud"

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

const renderCustomIcon = (icon: SimpleIcon, isDarkMode: boolean) => {
  const bgHex = isDarkMode ? "#080510" : "#f3f2ef"
  const fallbackHex = isDarkMode ? "#ffffff" : "#6e6e73"
  const minContrastRatio = isDarkMode ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  })
}

type IconCloudProps = {
  iconSlugs: string[]
  children?: React.ReactNode // Added children prop for center content
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export const IconCloud = React.memo(function IconCloud({ iconSlugs, children }: IconCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const slugsKey = useMemo(() => iconSlugs.join(","), [iconSlugs])

  useEffect(() => {
    if (hasFetched.current) {
      return
    }

    setIsLoading(true)
    setError(null)
    fetchSimpleIcons({ slugs: iconSlugs })
      .then((result) => {
        setData(result)
        setIsLoading(false)
        hasFetched.current = true
      })
      .catch((err) => {
        console.error("Error fetching icons:", err)
        setError("Failed to load icons")
        setIsLoading(false)
      })
  }, [slugsKey, iconSlugs])

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const renderedIcons = useMemo(() => {
    if (!data) return null
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, isDarkMode))
  }, [data, isDarkMode])

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
        {children && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]">{children}</div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
        <span className="text-gray-400">{error}</span>
        {children && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50]">{children}</div>
        )}
      </div>
    )
  }

  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
      {children && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[50] pointer-events-none">
          {children}
        </div>
      )}
      <Cloud {...cloudProps}>{renderedIcons}</Cloud>
    </div>
  )
})
