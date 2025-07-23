import type { NextRequest } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { createApiResponse, createApiError, validateRequest } from "@/lib/api-utils"

const bookingSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  userId: z.string().min(1, "User ID is required"),
  petName: z.string().min(1, "Pet name is required"),
  petType: z.string().min(1, "Pet type is required"),
  scheduledDate: z.string().transform((str) => new Date(str)),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const validation = await validateRequest(request, bookingSchema)

    if (!validation.success) {
      return createApiError(validation.error, 400)
    }

    const booking = await db.booking.create({
      ...validation.data,
      status: "PENDING",
    })

    return createApiResponse(booking, "Booking created successfully")
  } catch (error) {
    console.error("Error creating booking:", error)
    return createApiError("Failed to create booking", 500)
  }
}
