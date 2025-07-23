import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { createApiResponse, createApiError, getPaginationParams, getSearchParams } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { page, limit, skip } = getPaginationParams(request)
    const { search, species, gender, status, location } = getSearchParams(request)

    // Build where clause
    const where: any = {}

    if (search) {
      // In a real database, this would be a proper search query
      where.name = search
    }

    if (species) where.species = species
    if (gender) where.gender = gender
    if (status) where.status = status
    if (location) where.location = location

    const [pets, total] = await Promise.all([
      db.pet.findMany({
        where,
        skip,
        take: limit,
      }),
      db.pet.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return createApiResponse({
      pets,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching pets:", error)
    return createApiError("Failed to fetch pets", 500)
  }
}
