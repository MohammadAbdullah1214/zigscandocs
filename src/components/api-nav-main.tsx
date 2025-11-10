"use client"
import { ChevronRight } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { API_CATEGORIES } from "@/lib/api-config"
// import Link from "next/link"
// import { url } from "inspector"

export function ApiNavMain() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeEndpoint = searchParams.get("endpoint")

  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['ping']))

  // Load saved state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('openCategories')
    if (saved) {
      setOpenCategories(new Set(JSON.parse(saved)))
    }
  }, [])

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(href, { scroll: false })
  }

  const toggleCategory = (key: string) => {
    const newSet = new Set<string>()
    if (!openCategories.has(key)) {
      newSet.add(key)
    }
    setOpenCategories(newSet)
    localStorage.setItem('openCategories', JSON.stringify(Array.from(newSet)))
  }

  return (
    <SidebarGroup className="-mt-3">
      <SidebarMenu>
        {Object.entries(API_CATEGORIES).map(([key, category]) => {
          const isOpen = openCategories.has(key)
          return (
            <div key={key}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleCategory(key)}
                  tooltip={category.title}
                  className="cursor-pointer py-5 text-muted-foreground"
                >
                  <span>{category.title}</span>
                  <ChevronRight className={`mr-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isOpen && (
                <SidebarMenuSub>
                  {category.endpoints.map((endpoint) => {
                    const isActive = activeEndpoint === endpoint.path
                    const href = `/api-docs/${key}?endpoint=${encodeURIComponent(endpoint.path)}`

                    return (
                      <SidebarMenuSubItem key={endpoint.path}>
                        <SidebarMenuSubButton asChild 
                          className={`py-4 ${isActive ? "text-primary" : ""}`}>
                          <a
                            href={href}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => handleNavigation(href, e)}
                          >
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-green-100 text-green-700 dark:bg-green-500 dark:text-green-100">
                              {endpoint.method}
                            </span>
                            <span className="ml-2 truncate text-sm">{endpoint.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              )}
            </div>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
