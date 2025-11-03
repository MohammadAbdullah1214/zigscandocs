"use client"
import { ChevronRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

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
import Link from "next/link"

export function ApiNavMain() {
  const searchParams = useSearchParams()
  const activeEndpoint = searchParams.get("endpoint")

  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(["ping"]))

  const toggleCategory = (key: string) => {
    const newSet = new Set(openCategories)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setOpenCategories(newSet)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>API Endpoints</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(API_CATEGORIES).map(([key, category]) => {
          const isOpen = openCategories.has(key)

          return (
            <div key={key}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleCategory(key)}
                  tooltip={category.title}
                  className="cursor-pointer"
                >
                  <span>{category.title}</span>
                  <ChevronRight className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isOpen && (
                <SidebarMenuSub>
                  {category.endpoints.map((endpoint) => {
                    const isActive = activeEndpoint === endpoint.path

                    return (
                      <SidebarMenuSubItem key={endpoint.path}>
                        <SidebarMenuSubButton asChild className={isActive ? "text-primary" : ""}>
                          <Link href={`/api-docs/${key}?endpoint=${encodeURIComponent(endpoint.path)}`}>
                            <span className="px-2 py-1 rounded-full text-[9px] font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100">
                              {endpoint.method}
                            </span>
                            <span className="ml-2 truncate text-sm">{endpoint.name}</span>
                          </Link>
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
