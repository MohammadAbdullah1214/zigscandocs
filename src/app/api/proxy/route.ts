// API Proxy Route Handler
// This route proxies requests to the ZigScan API and handles parameters

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const endpoint = searchParams.get("endpoint")
    const params = searchParams.get("params")

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint parameter is required" }, { status: 400 })
    }

    // Parse parameters if provided
    let queryString = ""
    if (params) {
      try {
        const parsedParams = JSON.parse(params)
        queryString = new URLSearchParams(parsedParams).toString()
      } catch (e) {
        return NextResponse.json({ error: "Invalid parameters format" }, { status: 400 })
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://zigscan-api.zigscan.org"
    const url = `${baseUrl}${endpoint}${queryString ? "?" + queryString : ""}`

    // Make the request to the actual API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add API key if available
        ...(process.env.NEXT_PUBLIC_API_KEY && {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }),
      },
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API Proxy Error:", error)
    return NextResponse.json({ error: "Failed to fetch from API" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { endpoint, body, params } = await request.json()

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint parameter is required" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://zigscan-api.zigscan.org"
    let url = `${baseUrl}${endpoint}`

    // Add query parameters if provided
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url += `?${queryString}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEXT_PUBLIC_API_KEY && {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        }),
      },
      body: JSON.stringify(body || {}),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("API Proxy Error:", error)
    return NextResponse.json({ error: "Failed to fetch from API" }, { status: 500 })
  }
}
