"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ApiEndpoint } from "@/lib/api-config"
import { ApiPlaygroundModal } from "./api-playground-modal"

interface ApiTesterProps {
  endpoint: ApiEndpoint
  category: string
}

export function ApiTester({ endpoint, category }: ApiTesterProps) {
  const [parameters, setParameters] = React.useState<Record<string, string>>({})
  const [playgroundOpen, setPlaygroundOpen] = React.useState(false)

  const handleParameterChange = (paramName: string, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [paramName]: value,
    }))
  }

  return (
    <>
      <Card className="w-[500px]">
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
            <div className="rounded-lg bg-muted p-3 font-mono text-sm">{endpoint.path}</div>

            {/* {endpoint.parameters.length > 0 && (
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
            )} */}

            <Button
              onClick={() => setPlaygroundOpen(true)}
              // disabled={endpoint.parameters.some((p) => p.required && !parameters[p.name])}
              className="w-full"
            >
              Test API
            </Button>
          </div>
        </CardContent>
      </Card>

      <ApiPlaygroundModal
        open={playgroundOpen}
        onOpenChange={setPlaygroundOpen}
        endpoint={endpoint}
        category={category}
      />
    </>
  )
}
