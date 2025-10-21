"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import type { ApiEndpoint } from "@/lib/api-config"

interface ApiTesterProps {
  endpoint: ApiEndpoint
  category: string
}

export function ApiTester({ endpoint, category }: ApiTesterProps) {
  const [parameters, setParameters] = React.useState<Record<string, string>>({})
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState<any>(null)
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

  const handleTestApi = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const endpointPath = buildEndpointPath()

      // Build query parameters for GET requests
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

      const res = await fetch(url.toString(), {
        method: endpoint.method,
      })

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Badge variant={endpoint.method === "GET" ? "default" : "secondary"}>{endpoint.method}</Badge>
                {endpoint.name}
              </CardTitle>
              <CardDescription className="mt-2">{endpoint.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-3 font-mono text-sm">{buildEndpointPath()}</div>

            {endpoint.parameters.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Parameters</h4>
                {endpoint.parameters.map((param) => (
                  <div key={param.name} className="space-y-1">
                    <label className="text-sm font-medium">
                      {param.name}
                      {param.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    <Input
                      placeholder={param.description}
                      value={parameters[param.name] || ""}
                      onChange={(e) => handleParameterChange(param.name, e.target.value)}
                      type={param.type === "number" ? "number" : "text"}
                    />
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={handleTestApi}
              disabled={loading || endpoint.parameters.some((p) => p.required && !parameters[p.name])}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Testing..." : "Test API"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">{JSON.stringify(response, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
