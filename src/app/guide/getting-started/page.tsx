import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Users } from "lucide-react";
import { TableOfContents } from "@/components/table-of-contents";

export default function GettingStartedPage() {
  const tocItems = [
    { id: "overview", label: "Overview", level: 2 },
    { id: "whatiszigscan", label: "What is ZIGScan?", level: 2 },
    { id: "status", label: "Status", level: 2 },
    { id: "audience", label: "Who should use ZIGScan?", level: 2 },
    { id: "next-steps", label: "Next Steps", level: 2 },
  ];

  return (
    <>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 mt-9">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/guide">Documentation</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-5">
          {/* Hero Section */}
          <div className="space-y-2">
            <h1 id="overview" className="text-3xl font-bold tracking-tight">
              Overview
            </h1>
            <p className="text-md text-muted-foreground">
              Get started with ZIGScan and understand the ecosystem
            </p>
          </div>

          {/* What is ZIGScan */}
          <Card
            id="whatiszigscan"
            className="border-l-4 border-l-blue-500 dark:border-l-4 w-[685px]"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                What is ZIGScan?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                ZIGScan is the ecosystem's dedicated block explorer of ZIGChain.
                It provides access and visibility into the ZIGChain's data,
                allowing anyone to explore and interact with blockchain
                information.
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Key Features:</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">
                      View blocks and block details
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">
                      Inspect transactions (status, sender, receiver, fees)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">
                      Explore wallet balances and history
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">
                      Track token and asset details
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">
                      Monitor validator statistics
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-sm">Export data to CSV</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card id="status" className="border-l-4 border-l-amber-500 w-[685px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 dark:bg-green-500 dark:text-green-100"
                    >
                      Live
                    </Badge>
                    <span className="font-semibold">Testnet</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ZIGScan is currently live on the testnet. You can start
                    exploring and testing the platform.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Coming Soon</Badge>
                    <span className="font-semibold">Mainnet</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mainnet deployment is coming soon. Stay tuned for the
                    official launch.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Who should use ZIGScan */}
          <Card
            id="audience"
            className="border-l-4 border-l-purple-500 w-[685px]"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                Who should use ZIGScan?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Users */}
                <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Users
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Check balances</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>View tokens</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Track transactions</span>
                    </li>
                  </ul>
                </div>

                {/* Validators */}
                <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    Validators
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Monitor uptime</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Track commission</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>View performance</span>
                    </li>
                  </ul>
                </div>

                {/* Developers */}
                <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    Developers
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Integrate data</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Access APIs</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Build applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div id="next-steps" className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold">Next Steps</h2>
            <div className="grid gap-4 md:grid-cols-2 w-[685px]">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Start Guide</CardTitle>
                  <CardDescription>Learn the basics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get started with viewing blocks, transactions, wallets, and
                    validators.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">API Documentation</CardTitle>
                  <CardDescription>For developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explore our comprehensive API endpoints and integrate
                    ZIGChain data into your applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <TableOfContents
          items={tocItems}
          className={tocItems[0] ? "text-white" : "text-muted-foreground"}
        />
      </SidebarInset>
    </>
  );
}
