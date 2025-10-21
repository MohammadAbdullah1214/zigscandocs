"use client"
import { LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[] // Keep the subitems for future use, but not render them as dropdowns
  }[]
}) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Overview</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
            {/* Optional: Render subitems as normal links without dropdowns */}
            {item.items && (
              <div className="pl-4">
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuItem>
                ))}
              </div>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
