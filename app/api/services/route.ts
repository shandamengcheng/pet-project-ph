import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { createApiResponse, createApiError } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const services = await db.service.findMany()

    return createApiResponse(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return createApiError("Failed to fetch services", 500)
  }
}
