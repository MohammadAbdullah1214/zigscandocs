"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
import { API_CATEGORIES, type ApiCategory } from "@/lib/api-config"
import Link from "next/link"

export function ApiNavMain() {
  const [activeCategory, setActiveCategory] = React.useState<ApiCategory | null>("ping")
  const searchParams = useSearchParams()
  const activeEndpoint = searchParams.get("endpoint")

  return (
    <SidebarGroup>
      <SidebarGroupLabel>API Endpoints</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(API_CATEGORIES).map(([key, category]) => {
          const IconComponent = (LucideIcons as Record<string, LucideIcon>)[category.icon] || LucideIcons.Code

          return (
            <Collapsible key={key} asChild defaultOpen={activeCategory === key} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={category.title}
                    onClick={() => setActiveCategory(activeCategory === key ? null : (key as ApiCategory))}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {category.endpoints.map((endpoint) => {
                    const isActive = activeEndpoint === endpoint.path
                    
                    return(
                      <SidebarMenuSubItem key={endpoint.path}>
                        <SidebarMenuSubButton asChild className={isActive ? "rounded-full bg-blue-200 text-blue-900" : ""}>
                          <Link href={`/api-docs/${key}?endpoint=${encodeURIComponent(endpoint.path)}`}>
                            <span className="text-xs font-mono">{endpoint.method}</span>
                            <span className="ml-2 truncate text-sm">{endpoint.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
