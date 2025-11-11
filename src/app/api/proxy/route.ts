import { NextRequest, NextResponse } from "next/server"

function joinEndpoint(base: string, endpoint: string) {
  if (!base.endsWith("/") && !endpoint.startsWith("/")) return `${base}/${endpoint}`
  if (base.endsWith("/") && endpoint.startsWith("/")) return base + endpoint.slice(1)
  return base + endpoint
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const endpoint = searchParams.get("endpoint")
    const params = searchParams.get("params")

    if (!endpoint) {
      return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 })
    }

    // params may be a JSON string or already a query string
    let queryString = ""
    if (params) {
      try {
        const parsed = JSON.parse(params)
        queryString = new URLSearchParams(parsed).toString()
      } catch {
        // fallback: treat as raw query string
        queryString = params
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://zigscan-api.zigscan.org"
    let url = joinEndpoint(baseUrl, endpoint)
    if (queryString) url += `?${queryString}`

    console.log("[proxy] GET ->", url)

    const clientAuth = request.headers.get("authorization")
    const apiKey = process.env.API_KEY || ""

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: clientAuth || (apiKey ? `Bearer ${apiKey}` : ""),
      },
    })

    const contentType = resp.headers.get("content-type") || ""
    const bodyText = await resp.text()

    if (!contentType.includes("application/json")) {
      console.error("[proxy] non-JSON response", { url, status: resp.status, contentType, snippet: bodyText.slice(0, 1000) })
      // return the upstream body as-is so you can inspect the HTML error in Vercel logs / client
      return new NextResponse(bodyText, {
        status: resp.status,
        headers: { "content-type": contentType || "text/plain" },
      })
    }

    // safe JSON parse
    let data
    try {
      data = JSON.parse(bodyText)
    } catch (err) {
      console.error("[proxy] invalid JSON", { url, status: resp.status, snippet: bodyText.slice(0, 1000) })
      return NextResponse.json({ error: "Invalid JSON from upstream", status: resp.status, bodySnippet: bodyText.slice(0, 1000) }, { status: 502 })
    }

    return NextResponse.json(data, { status: resp.status })
  } catch (err) {
    console.error("API Proxy Error:", err)
    return NextResponse.json({ error: "Proxy failure", message: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const { endpoint, body, params } = payload || {}

    if (!endpoint) {
      return NextResponse.json({ error: "Missing endpoint in body" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://zigscan-api.zigscan.org"
    let url = joinEndpoint(baseUrl, endpoint)

    if (params) {
      try {
        url += "?" + new URLSearchParams(params).toString()
      } catch {
        // ignore if params cannot be converted
      }
    }

    console.log("[proxy] POST ->", url)

    const clientAuth = request.headers.get("authorization")
    const apiKey = process.env.API_KEY || ""

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: clientAuth || (apiKey ? `Bearer ${apiKey}` : ""),
      },
      body: JSON.stringify(body || {}),
    })

    const contentType = resp.headers.get("content-type") || ""
    const text = await resp.text()

    if (!contentType.includes("application/json")) {
      console.error("[proxy] non-JSON POST response", { url, status: resp.status, contentType, snippet: text.slice(0, 1000) })
      return new NextResponse(text, {
        status: resp.status,
        headers: { "content-type": contentType || "text/plain" },
      })
    }

    let data
    try {
      data = JSON.parse(text)
    } catch {
      console.error("[proxy] invalid JSON POST", { url, status: resp.status, snippet: text.slice(0, 1000) })
      return NextResponse.json({ error: "Invalid JSON from upstream", status: resp.status }, { status: 502 })
    }

    return NextResponse.json(data, { status: resp.status })
  } catch (err) {
    console.error("API Proxy Error:", err)
    return NextResponse.json({ error: "Proxy failure", message: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
