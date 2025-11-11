"use client"

import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md mt-12 w-full">
      <div className="max-w-[1440px] px-2 sm:px-4 md:px-6 lg:px-8 py-8">
        <div className="grid align-content:flex-end grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          {/* <div className="space-y-3">
            <h3 className="text-lg font-semibold">ZigScan</h3>
            <p className="text-sm text-muted-foreground">
              Explore and interact with the ZigScan blockchain.
            </p>
          </div> */}

          {/* Documentation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Documentation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Follow</h4>
            <div className="flex gap-3">
              <Link
                href="#"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} ZigScan. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}