import type { NextRequest } from "next/server"
import { z } from "zod"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
  skip: number
}

export function createApiResponse<T>(data: T, message?: string): Response {
  return Response.json({
    success: true,
    data,
    message,
  })
}

export function createApiError(message: string, status = 400): Response {
  return Response.json(
    {
      success: false,
      error: message,
    },
    { status },
  )
}

export function getPaginationParams(request: NextRequest): PaginationParams {
  const searchParams = request.nextUrl.searchParams
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "10")))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }
    return { success: false, error: "Invalid request data" }
  }
}

export function getSearchParams(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  return {
    search: searchParams.get("search") || "",
    species: searchParams.get("species") || "",
    gender: searchParams.get("gender") || "",
    status: searchParams.get("status") || "",
    location: searchParams.get("location") || "",
  }
}
