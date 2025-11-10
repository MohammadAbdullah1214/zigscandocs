"use client"

import { useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { API_CATEGORIES, type ApiCategory } from "@/lib/api-config"
import { ApiTester } from "@/components/api-tester"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    category: string
  }
}

export default function ApiDocsPage({ params }: PageProps) {
  const searchParams = useSearchParams()
  const endpointPath = searchParams.get("endpoint")

  const category = params.category as ApiCategory
  const categoryData = API_CATEGORIES[category]

  if (!categoryData) {
    notFound()
  }

  const endpoint = categoryData.endpoints.find((e) => e.path === endpointPath) || categoryData.endpoints[0]

  return (
    <>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 mt-9">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/api-docs">API Documentation</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={`/api-docs/${category}`}>{categoryData.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{endpoint.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
            <ApiTester endpoint={endpoint} category={category} />
          </div>
        </SidebarInset>
    </>
  )
}
