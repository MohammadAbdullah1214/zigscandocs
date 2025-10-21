"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy } from "lucide-react"
import type { ApiEndpoint } from "@/lib/api-config"
import { ApiCodeExample } from "./api-code-example"

interface ApiPlaygroundModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  endpoint: ApiEndpoint
  category: string
}

export function ApiPlaygroundModal({ open, onOpenChange, endpoint, category }: ApiPlaygroundModalProps) {
  const [parameters, setParameters] = React.useState<Record<string, string>>({})
  const [authKey, setAuthKey] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<any>(null)
  const [statusCode, setStatusCode] = React.useState<number | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleParameterChange = (paramName: string, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [paramName]: value,
    }))
  }

  const buildEndpointPath = () => {
    let path = endpoint.path
    endpoint.parameters.forEach((param) => {
      if (parameters[param.name]) {
        path = path.replace(`{${param.name}}`, parameters[param.name])
      }
    })
    return path
  }

  const handleSendRequest = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)
    setStatusCode(null)

    try {
      const endpointPath = buildEndpointPath()

      const queryParams = endpoint.parameters.reduce(
        (acc, param) => {
          if (parameters[param.name]) {
            acc[param.name] = parameters[param.name]
          }
          return acc
        },
        {} as Record<string, string>,
      )

      const url = new URL("/api/proxy", window.location.origin)
      url.searchParams.append("endpoint", endpointPath)
      if (Object.keys(queryParams).length > 0) {
        url.searchParams.append("params", JSON.stringify(queryParams))
      }

      const headers: Record<string, string> = {}
      if (authKey) {
        headers["Authorization"] = `Bearer ${authKey}`
      }

      const res = await fetch(url.toString(), {
        method: endpoint.method,
        headers,
      })

      const data = await res.json()
      setResponse(data)
      setStatusCode(res.status)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>{endpoint.method}</Badge>
            {endpoint.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Side - Request Builder */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Endpoint</label>
              <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
                <Badge variant="outline">{endpoint.method}</Badge>
                <code className="text-sm flex-1 font-mono">{buildEndpointPath()}</code>
              </div>
            </div>

            {/* Authorization */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Authorization</label>
              <Input
                placeholder="Enter API key"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                type="password"
              />
              <p className="text-xs text-muted-foreground mt-1">api-key</p>
            </div>

            {/* Parameters */}
            {endpoint.parameters.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-2 block">Parameters</label>
                <div className="space-y-3">
                  {endpoint.parameters.map((param) => (
                    <div key={param.name}>
                      <label className="text-xs font-medium mb-1 block">
                        {param.name}
                        {param.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      <Input
                        placeholder={param.description}
                        value={parameters[param.name] || ""}
                        onChange={(e) => handleParameterChange(param.name, e.target.value)}
                        type={param.type === "number" ? "number" : "text"}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleSendRequest}
              disabled={loading || endpoint.parameters.some((p) => p.required && !parameters[p.name])}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Getting..." : "GET"}
            </Button>

            <label className="text-sm font-semibold mb-2 block">Your Key: <span className="text-xs text-muted-foreground">ZL5fWC48NGZ-PCD9vJarwfVQchsqw0lzNI04MSdGV3E</span></label>
          </div>

          {/* Right Side - Code Examples & Response */}
          <div className="space-y-4">
            <ApiCodeExample endpoint={endpoint} parameters={parameters} authKey={authKey} />

            {/* Response Card */}
            {(response || error) && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Response</CardTitle>
                    {statusCode && (
                      <Badge variant={statusCode >= 200 && statusCode < 300 ? "default" : "destructive"}>
                        {statusCode}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <div className="text-sm text-destructive">{error}</div>
                  ) : (
                    <div className="relative">
                      <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs font-mono max-h-64">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(response, null, 2))
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
