import type { NextRequest } from "next/server"
import { createApiResponse, createApiError } from "@/lib/api-utils"
import { z } from "zod"

const adoptionApplicationSchema = z.object({
  petId: z.string(),
  applicantName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  reason: z.string().min(10),
  experience: z.string().optional(),
  livingSpace: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = adoptionApplicationSchema.parse(body)

    // Mock successful application creation
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    }

    return createApiResponse(application, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createApiError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`, 400)
    }
    console.error("Error creating adoption application:", error)
    return createApiError("Failed to create adoption application", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock applications data
    const applications = [
      {
        id: "1",
        petId: "1",
        applicantName: "John Doe",
        email: "john@example.com",
        phone: "555-0123",
        reason: "Looking for a loyal companion",
        status: "PENDING",
        createdAt: new Date().toISOString(),
      },
    ]

    return createApiResponse({
      applications,
      pagination: {
        page: 1,
        limit: 10,
        total: applications.length,
        totalPages: 1,
      },
    })
  } catch (error) {
    console.error("Error fetching adoption applications:", error)
    return createApiError("Failed to fetch adoption applications", 500)
  }
}
