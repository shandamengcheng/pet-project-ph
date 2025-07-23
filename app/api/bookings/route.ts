import type { NextRequest } from "next/server"
import { createApiResponse, createApiError } from "@/lib/api-utils"
import { z } from "zod"

const bookingSchema = z.object({
  serviceId: z.string(),
  date: z.string(),
  time: z.string(),
  petName: z.string().min(1),
  ownerName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = bookingSchema.parse(body)

    // Mock successful booking creation
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: "PENDING",
      totalPrice: 75.0,
      createdAt: new Date().toISOString(),
    }

    return createApiResponse(booking, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`, 400)
    }
    console.error("Error creating booking:", error)
    return createApiError("Failed to create booking", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock bookings data
    const bookings = [
      {
        id: "1",
        serviceId: "1",
        date: "2024-01-15",
        time: "10:00",
        petName: "Buddy",
        ownerName: "Jane Smith",
        phone: "555-0456",
        status: "CONFIRMED",
        totalPrice: 75.0,
        createdAt: new Date().toISOString(),
      },
    ]

    return createApiResponse({
      bookings,
      pagination: {
        page: 1,
        limit: 10,
        total: bookings.length,
        totalPages: 1,
      },
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return createApiError("Failed to fetch bookings", 500)
  }
}
