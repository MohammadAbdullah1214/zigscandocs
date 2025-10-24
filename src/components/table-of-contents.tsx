"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="hidden lg:block fixed right-60 top-40 w-48">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground mb-4">On this page</h3>
        <ul className="space-y-2">
          {items.map(({ id, label, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
              <Link
                href={`#${id}`}
                className={`text-sm transition-colors hover:text-foreground ${
                  activeId === id ? "text-blue-600 dark:text-blue-400 font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
