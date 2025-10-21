"use client"

import type * as React from "react"
import { AudioWaveform, BookOpen, Frame, GalleryVerticalEnd, Key, Lock, Map, PieChart, Telescope, TerminalSquareIcon } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { Overview } from "@/components/overview"
import { ApiPages } from "@/components/api-pages"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "ZigScan API",
      url: "#",
      icon: TerminalSquareIcon,
      isActive: true,
    },
    {
      title: "Case Studies",
      url: "#",
      icon: BookOpen,
    },
  ],
  overview: [
    {
      name: "Authentication",
      url: "#",
      icon: Lock,
    },
    {
      name: "Endpoint Overview",
      url: "#",
      icon: Telescope,
    },
  ],
    apipages: [
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    },
    {
      name: "Ping",
      url: "#",
      icon: Lock,
    },
    {
      name: "Key",
      url: "#",
      icon: Key,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="mt-9" collapsible="icon" {...props}>
      <SidebarContent className="mt-12">
        <NavMain items={data.navMain} />
        <Overview overview={data.overview} />
        <ApiPages apipages={data.apipages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
