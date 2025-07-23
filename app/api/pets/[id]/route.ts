import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { createApiResponse, createApiError } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pet = await db.pet.findUnique({
      where: { id: params.id },
    })

    if (!pet) {
      return createApiError("Pet not found", 404)
    }

    return createApiResponse(pet)
  } catch (error) {
    console.error("Error fetching pet:", error)
    return createApiError("Failed to fetch pet", 500)
  }
}
