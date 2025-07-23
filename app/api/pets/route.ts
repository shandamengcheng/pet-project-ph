import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { handleError, createSuccessResponse, getSearchParams } from "@/lib/api-utils"
import { z } from "zod"

const searchSchema = z.object({
  search: z.string().optional(),
  species: z.string().optional(),
  gender: z.string().optional(),
  size: z.string().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val) : 12)),
})

export async function GET(request: NextRequest) {
  try {
    const params = await getSearchParams(request)
    const { search, species, gender, size, location, status, page, limit } = searchSchema.parse(params)

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { breed: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (species) where.species = species
    if (gender) where.gender = gender
    if (size) where.size = size
    if (location) where.location = { contains: location, mode: "insensitive" }
    if (status) where.status = status

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              adoptions: true,
              favorites: true,
            },
          },
        },
      }),
      prisma.pet.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return createSuccessResponse({
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
    return handleError(error)
  }
}

const createPetSchema = z.object({
  name: z.string().min(1),
  species: z.enum(["DOG", "CAT", "RABBIT", "BIRD", "HAMSTER", "GUINEA_PIG", "OTHER"]),
  breed: z.string().min(1),
  age: z.number().min(0),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
  size: z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]),
  color: z.string().min(1),
  description: z.string().min(10),
  images: z.array(z.string().url()),
  location: z.string().min(1),
  isVaccinated: z.boolean().optional(),
  isNeutered: z.boolean().optional(),
  healthInfo: z.string().optional(),
  personality: z.string().optional(),
  requirements: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createPetSchema.parse(body)

    const pet = await prisma.pet.create({
      data: {
        ...data,
        images: JSON.stringify(data.images),
      },
    })

    return createSuccessResponse(pet, 201)
  } catch (error) {
    return handleError(error)
  }
}
