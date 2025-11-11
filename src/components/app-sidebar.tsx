"use client";

import type * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ApiNavMain } from "@/components/api-nav-main";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const guideNavigation = [
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
  // {
  //   title: "Endpoint Overview",
  //   url: "#",
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const [showApiNav, setShowApiNav] = useState(true);
  const [openGuideCategories, setOpenGuideCategories] = useState<Set<string>>(
    new Set()
  );

  // // Persist open categories across navigations
  // useEffect(() => {
  //   const savedCategories = localStorage.getItem("guideOpenCategories");
  //   if (savedCategories) {
  //     setOpenGuideCategories(new Set(JSON.parse(savedCategories)));
  //   }
  // }, []);

  const toggleGuideCategory = (title: string) => {
    const newSet = new Set(openGuideCategories);
    if (newSet.has(title)) {
      newSet.delete(title);
    } else {
      newSet.add(title);
    }
    setOpenGuideCategories(newSet);
    localStorage.setItem(
      "guideOpenCategories",
      JSON.stringify(Array.from(newSet))
    );
  };

  // Use shallow routing to prevent full page refresh
  const handleNavigation = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(url);
  };

  return (
    <Sidebar className="mt-10" collapsible="icon" {...props}>
      <SidebarContent className="mt-10">
        <SidebarGroup className="mb-1 mt-3">
          <h6 className="mb-3 mt-3">ZigScan API</h6>
          {/* <SidebarGroupLabel>Documentation</SidebarGroupLabel> */}
          <SidebarMenu>
            {guideNavigation.map((item) => {
              if (item.items) {
                const isOpen = openGuideCategories.has(item.title);
                
                return (
                  <div key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleGuideCategory(item.title)}
                        tooltip={item.title}
                        className="cursor-pointer py-5 text-muted-foreground"  
                      >
                        <span>{item.title}</span>
                        <ChevronRight
                          className={`mr-auto transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {isOpen && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.name}
                            className="mb-1 py-1"
                          >
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => handleNavigation(subItem.url, e)}
                              >
                                <span>{subItem.name}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </div>
                  
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <span className="text-[0.9rem] pl-2 font-semibold">
                    {item.title}
                  </span>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        {showApiNav && <ApiNavMain />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
