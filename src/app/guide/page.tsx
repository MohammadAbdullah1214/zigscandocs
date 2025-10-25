import { Navbar } from "@/components/navbar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TableOfContents } from "@/components/table-of-contents"

export default function GuidePage() {
  const tocItems = [
    { id: "quick-start", label: "Quick Start Guide", level: 1 },
    { id: "viewing-blocks", label: "Viewing Blocks", level: 2 },
    { id: "viewing-transactions", label: "Viewing Transactions", level: 2 },
    { id: "checking-wallets", label: "Checking Wallets", level: 2 },
    { id: "validators", label: "Validators", level: 2 },
    { id: "key-concepts", label: "Key Concepts", level: 2 },
  ]

  return (
    <>
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/guide">Documentation</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Quick Start Guide</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
            {/* Hero Section */}
            <div className="space-y-2">
              <h1 id="quick-start" className="text-4xl font-bold tracking-tight">
                Quick Start Guide
              </h1>
              <p className="text-lg text-muted-foreground">Learn how to navigate ZIGScan and explore blockchain data</p>
            </div>

            {/* Quick Start Cards */}
            <div className="grid gap-6 grid-cols-1 items-start justify-start w-[685px]">
              {/* Viewing Blocks */}
              <Card id="viewing-blocks" className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default">1</Badge>
                    Viewing Blocks
                  </CardTitle>
                  <CardDescription>Explore blockchain blocks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Open the Blocks tab</li>
                      <li>Search by block height or hash</li>
                      <li>View block details including:</li>
                    </ol>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p>• Block height, hash, timestamp</p>
                    <p>• Proposer information</p>
                    <p>• Number of transactions</p>
                    <p>• Parent block hash</p>
                  </div>
                </CardContent>
              </Card>

              {/* Viewing Transactions */}
              <Card id="viewing-transactions" className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default">2</Badge>
                    Viewing Transactions
                  </CardTitle>
                  <CardDescription>Track transaction details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Use the search bar to enter a transaction hash</li>
                      <li>View transaction details:</li>
                    </ol>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p>• Status (success/failure)</p>
                    <p>• From / To addresses</p>
                    <p>• Value transferred</p>
                    <p>• Gas used / fee paid</p>
                    <p>• Block height</p>
                  </div>
                </CardContent>
              </Card>

              {/* Checking Wallets */}
              <Card id="checking-wallets" className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default">3</Badge>
                    Checking Wallets
                  </CardTitle>
                  <CardDescription>Monitor wallet information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Steps:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Enter an address in the search bar</li>
                      <li>View wallet information:</li>
                    </ol>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p>• Native $ZIG balance</p>
                    <p>• Token holdings</p>
                    <p>• Transaction history</p>
                  </div>
                </CardContent>
              </Card>

              {/* Validators */}
              <Card id="validators" className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default">4</Badge>
                    Validators
                  </CardTitle>
                  <CardDescription>Monitor validator performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Validator Dashboard includes:</h4>
                  </div>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p>• Validator address / name</p>
                    <p>• Uptime percentage</p>
                    <p>• Commission rate</p>
                    <p>• Voting power</p>
                    <p>• Blocks signed vs missed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Glossary Section */}
            <div id="key-concepts" className="space-y-4 mt-8">
              <h2 className="text-2xl font-bold">Key Concepts</h2>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 w-[690px]">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Block</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A secure, digital container of data that is chronologically added to a growing chain of blocks.
                      Each block contains verified transactions, a cryptographic hash of the previous block, and a
                      timestamp.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction (Tx)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      An action on ZIGChain (e.g., transfer of $ZIG). Each transaction is identified by a unique
                      tx_hash.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Gas / Fee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The cost paid to validators for processing a transaction on the network.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Address / Wallet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      An account used to send, receive, and hold tokens on ZIGChain.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Validator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A node responsible for proposing and verifying blocks on the ZIGChain network.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Token</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A fungible unit deployed on ZIGChain (e.g., $ZIG or other assets).
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <TableOfContents items={tocItems} />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
