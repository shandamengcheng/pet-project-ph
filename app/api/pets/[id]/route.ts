import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { createApiResponse, createApiError } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            likes: true,
            favorites: true,
            adoptionApplications: true,
          },
        },
      },
    })

    if (!pet) {
      return createApiError("Pet not found", 404)
    }

    // 增加浏览量（这里可以添加防重复逻辑）
    // await prisma.pet.update({
    //   where: { id: params.id },
    //   data: { views: { increment: 1 } }
    // })

    const petWithImages = {
      ...pet,
      images: JSON.parse(pet.images || "[]"),
      likeCount: pet._count.likes,
      favoriteCount: pet._count.favorites,
      applicationCount: pet._count.adoptionApplications,
    }

    return createApiResponse(petWithImages)
  } catch (error) {
    console.error("Error fetching pet:", error)
    return createApiError("Failed to fetch pet", 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const pet = await prisma.pet.update({
      where: { id: params.id },
      data: {
        name: body.name,
        type: body.type?.toUpperCase(),
        breed: body.breed,
        age: body.age,
        gender: body.gender?.toUpperCase(),
        weight: body.weight,
        color: body.color,
        description: body.description,
        location: body.location,
        status: body.status?.toUpperCase(),
        images: body.images ? JSON.stringify(body.images) : undefined,
        vaccinated: body.vaccinated,
        neutered: body.neutered,
        microchipped: body.microchipped,
        rescueStory: body.rescueStory,
        careNeeds: body.careNeeds,
        personality: body.personality,
      },
    })

    return createApiResponse(pet)
  } catch (error) {
    console.error("Error updating pet:", error)
    return createApiError("Failed to update pet", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.pet.delete({
      where: { id: params.id },
    })

    return createApiResponse({ message: "Pet deleted successfully" })
  } catch (error) {
    console.error("Error deleting pet:", error)
    return createApiError("Failed to delete pet", 500)
  }
}
