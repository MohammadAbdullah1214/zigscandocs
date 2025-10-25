"use client"

import { useEffect, useState } from "react"
import { ListTree, X, Text } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TOCItem {
  id: string
  label: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Intersection Observer to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <>
      {/* 🖥️ Desktop / Large screens */}
      <nav className="hidden lg:block fixed right-50 top-36 w-56 border-l border-[#f778a788] pl-5">
        <div className="space-y-2">
          <div className="relative mb-3">
            <Text className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(338,89%,72%)] opacity-80" />
                <h3 className="text-sm font-semibold text-foreground pl-2">On this page</h3>
          </div>
          <ul className="space-y-2">
            {items.map(({ id, label, level }) => (
              <li key={id} style={{ paddingLeft: `${(level - 1) * 16}px` }}>
                <Link
                  href={`#${id}`}
                  className={`text-sm transition-colors hover:text-foreground ${
                    activeId === id
                      ? "text-chart-3 dark:text-chart-3 font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 📱 Mobile / Tablet Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg bg-primary text-primary-foreground"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <ListTree className="h-5 w-5" />}
        </Button>
      </div>

      {/* 📋 Mobile TOC Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden">
          <div className="absolute bottom-20 right-4 left-4 rounded-xl bg-card border border-border shadow-lg p-4 max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <h3 className="text-sm font-semibold text-foreground mb-3">On this page</h3>
            <ul className="space-y-2">
              {items.map(({ id, label, level }) => (
                <li
                  key={id}
                  style={{ paddingLeft: `${(level - 1) * 14}px` }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Link
                    href={`#${id}`}
                    className={`text-sm transition-colors hover:text-foreground ${
                      activeId === id
                        ? "text-chart-3 dark:text-chart-3 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
