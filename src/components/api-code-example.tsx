"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import type { ApiEndpoint } from "@/lib/api-config"

interface ApiCodeExampleProps {
  endpoint: ApiEndpoint
  parameters: Record<string, string>
  authKey: string
}

export function ApiCodeExample({ endpoint, parameters, authKey }: ApiCodeExampleProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState("ruby")

  const buildEndpointPath = () => {
    let path = endpoint.path
    endpoint.parameters.forEach((param) => {
      if (parameters[param.name]) {
        path = path.replace(`{${param.name}}`, parameters[param.name])
      }
    })
    return path
  }

  const codeExamples: Record<string, string> = {
    ruby: `require 'uri'
require 'net/http'

url = URI("https://api.example.com${buildEndpointPath()}")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::${endpoint.method === "GET" ? "Get" : "Post"}.new(url)
request["api-key"] = "${authKey || "<api-key>"}"

response = http.request(request)
puts response.read_body`,

    python: `import requests

url = "https://api.example.com${buildEndpointPath()}"

headers = {
    "api-key": "${authKey || "<api-key>"}"
}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)
print(response.json())`,

    javascript: `const url = "https://api.example.com${buildEndpointPath()}";

const options = {
  method: "${endpoint.method}",
  headers: {
    "x-cg-pro-api-key": "${authKey || "<api-key>"}"
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));`,

    curl: `curl -X ${endpoint.method} "https://api.example.com${buildEndpointPath()}" \\
  -H "x-cg-pro-api-key: ${authKey || "<api-key>"}"`,
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Code Example</CardTitle>
          <div className="flex gap-1">
            {Object.keys(codeExamples).map((lang) => (
              <Badge
                key={lang}
                variant={selectedLanguage === lang ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs font-mono max-h-64">
            {codeExamples[selectedLanguage]}
          </pre>
          <Button
            size="icon-sm"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => {
              navigator.clipboard.writeText(codeExamples[selectedLanguage])
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
