import { type NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"

export function handleError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: error.errors,
      },
      { status: 400 },
    )
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}

export function createSuccessResponse(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export async function getSearchParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  return Object.fromEntries(searchParams.entries())
}
