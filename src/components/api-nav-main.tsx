"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
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
import { API_CATEGORIES } from "@/lib/api-config"
import Link from "next/link"

export function ApiNavMain() {
  const [openCategory, setOpenCategory] = React.useState<string | null>("ping")
  const searchParams = useSearchParams()
  const activeEndpoint = searchParams.get("endpoint")

  const handleTriggerClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault()
    setOpenCategory(openCategory === key ? null : key)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>API Endpoints</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(API_CATEGORIES).map(([key, category]) => {
          return (
            <Collapsible key={key} asChild open={openCategory === key} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={category.title} onClick={(e) => handleTriggerClick(e, key)}>
                    <span>{category.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
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
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
