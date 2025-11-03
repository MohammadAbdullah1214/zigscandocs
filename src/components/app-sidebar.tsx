"use client"

import type * as React from "react"
import { ChevronRight } from "lucide-react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { ApiNavMain } from "@/components/api-nav-main"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const guideNavigation = [
  {
    title: "ZigScan API",
    url: "/guide",
  },
  {
    title: "Overview",
    items: [
      {
        name: "What is ZIGScan?",
        url: "/guide/getting-started",
      },
      {
        name: "Status",
        url: "/guide/getting-started",
      },
      {
        name: "Who should use ZIGScan?",
        url: "/guide/getting-started",
      },
    ],
  },
  {
    title: "Quick Start Guide",
    items: [
      {
        name: "Viewing Blocks",
        url: "/guide",
      },
      {
        name: "Viewing Transactions",
        url: "/guide",
      },
      {
        name: "Checking Wallets",
        url: "/guide",
      },
      {
        name: "Validators",
        url: "/guide",
      },
    ],
  },
  {
    title: "Endpoint Overview",
    url: "#",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showApiNav, setShowApiNav] = useState(false)
  const [openGuideCategories, setOpenGuideCategories] = useState<Set<string>>(new Set(["Overview"]))
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.includes("/api-docs")) {
      setShowApiNav(true)
    }
  }, [pathname])

  const toggleGuideCategory = (title: string) => {
    const newSet = new Set(openGuideCategories)
    if (newSet.has(title)) {
      newSet.delete(title)
    } else {
      newSet.add(title)
    }
    setOpenGuideCategories(newSet)
  }

  return (
    <Sidebar className="mt-9" collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher /> */}</SidebarHeader>
      <SidebarContent className="mt-12">
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarMenu>
            {guideNavigation.map((item) => {
              if (item.items) {
                const isOpen = openGuideCategories.has(item.title)
                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleGuideCategory(item.title)}
                        tooltip={item.title}
                        className="cursor-pointer"
                      >
                        <span>{item.title}</span>
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isOpen && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.name}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </div>
                )
              }

              if (item.title === "Endpoint Overview") {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} onClick={() => setShowApiNav(!showApiNav)}>
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {showApiNav && <ApiNavMain />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
