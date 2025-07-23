import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export function createApiResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function createApiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
): Promise<{ data: T; error: null } | { data: null; error: NextResponse }> {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    return { data, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: createApiError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`, 400),
      }
    }
    return {
      data: null,
      error: createApiError("Invalid request body", 400),
    }
  }
}

export function getPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "10")))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function handleError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof z.ZodError) {
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
