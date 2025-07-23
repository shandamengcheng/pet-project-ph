import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { createApiResponse, createApiError, getPaginationParams } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    const species = searchParams.get("species")
    const gender = searchParams.get("gender")
    const status = searchParams.get("status")
    const location = searchParams.get("location")
    const search = searchParams.get("search")

    const where: any = {}
    if (species) where.species = species.toUpperCase()
    if (gender) where.gender = gender.toUpperCase()
    if (status) where.status = status.toUpperCase()
    if (location) where.location = location

    const [pets, total] = await Promise.all([
      db.pet.findMany({
        where,
        skip,
        take: limit,
      }),
      db.pet.count(),
    ])

    // Filter by search term if provided
    let filteredPets = pets
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPets = pets.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchLower) ||
          pet.breed.toLowerCase().includes(searchLower) ||
          pet.description.toLowerCase().includes(searchLower),
      )
    }

    return createApiResponse({
      pets: filteredPets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching pets:", error)
    return createApiError("Failed to fetch pets", 500)
  }
}
