"use client"

import { Facebook, Github, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JOSEPH.DEV
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating beautiful and functional web experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 mx-5">

          </div>

          {/* Social */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/jsphgg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/josephmanigo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/not.josph/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JOSEPH.DEV. All rights reserved.</p>

        </div>
      </div>
    </footer>
  )
}
