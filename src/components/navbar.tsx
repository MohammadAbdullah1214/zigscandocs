"use client"

import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Pricing", href: "#" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <img className="w-30 h-auto" src="/assets/zigscanlogo.webp" alt=""/>

          {/* Search Bar - Center */}
          <div className="hidden flex-1 items-center justify-center px-4 md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="w-full bg-muted pl-10 pr-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Sign In Button */}
            <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-border bg-background py-4 lg:hidden">
            <div className="mb-4 px-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full bg-muted pl-10 pr-4 py-2 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
