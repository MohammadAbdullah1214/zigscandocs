"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import * as React from "react"

interface ApiResponseDisplayProps {
  response: any
  error?: string | null
  loading?: boolean
}

export function ApiResponseDisplay({ response, error, loading }: ApiResponseDisplayProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Badge variant="destructive">Error</Badge>
            API Request Failed
          </CardTitle>
          <CardDescription>An error occurred while making the API request</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm text-destructive">{error}</pre>
        </CardContent>
      </Card>
    )
  }

  if (!response) {
    return null
  }

  const isSuccess = response.status !== "error" && !error

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Response</CardTitle>
            <Badge variant={isSuccess ? "default" : "destructive"}>{isSuccess ? "Success" : "Error"}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
        <CardDescription>Raw API response data</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm font-mono max-h-96">
          {JSON.stringify(response, null, 2)}
        </pre>
      </CardContent>
    </Card>
  )
}
