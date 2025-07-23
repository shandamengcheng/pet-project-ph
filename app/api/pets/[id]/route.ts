import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { handleError, createSuccessResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: params.id },
      include: {
        adoptions: {
          where: { status: "PENDING" },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        _count: {
          select: {
            adoptions: true,
            favorites: true,
          },
        },
      },
    })

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    // Parse images JSON
    const petWithImages = {
      ...pet,
      images: JSON.parse(pet.images),
    }

    return createSuccessResponse(petWithImages)
  } catch (error) {
    return handleError(error)
  }
}
