import type { NextRequest } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { createApiResponse, createApiError, validateRequest } from "@/lib/api-utils"

const adoptionSchema = z.object({
  petId: z.string().min(1, "Pet ID is required"),
  userId: z.string().min(1, "User ID is required"),
  reason: z.string().min(10, "Please provide a reason (minimum 10 characters)"),
  experience: z.string().min(10, "Please describe your experience (minimum 10 characters)"),
  livingSpace: z.string().min(5, "Please describe your living space"),
  hasOtherPets: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request, adoptionSchema)

    if (!validation.success) {
      return createApiError(validation.error, 400)
    }

    const adoption = await db.adoption.create({
      ...validation.data,
      status: "PENDING",
    })

    return createApiResponse(adoption, "Adoption application submitted successfully")
  } catch (error) {
    console.error("Error creating adoption:", error)
    return createApiError("Failed to submit adoption application", 500)
  }
}
