"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Facebook, Github, Instagram } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center w-full px-4 sm:px-6 transition-all duration-300">
      <div
        className={`flex items-center w-full max-w-6xl px-5 sm:px-8 h-16 rounded-[2rem] transition-all duration-300 border ${isScrolled
          ? "bg-white/10 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10"
          : "bg-transparent border-transparent shadow-none"
          }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-lg sm:text-xl font-black tracking-wide uppercase relative group cursor-pointer mr-auto py-2"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">JOSEPH.DEV</span>
          <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-full"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden min-[900px]:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {["Home", "About", "Projects", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-all duration-300 relative group py-2"
            >
              {item}
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-white to-gray-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Right side items */}
        <div className="hidden min-[900px]:flex items-center gap-4 ml-auto">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/jsphgg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://github.com/josephmanigo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.instagram.com/jsph.mng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-secondary h-9 w-9 text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}


        </div>

        {/* Mobile Menu Button */}
        <div className="hidden max-[899px]:flex items-center gap-2 ml-auto">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="hidden max-[899px]:block bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-6 space-y-4">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <a
                href="https://www.facebook.com/jsphgg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://github.com/josephmanigo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/jsph.mng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
