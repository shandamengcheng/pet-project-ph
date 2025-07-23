import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { createApiResponse, createApiError, validateRequest, getPaginationParams } from "@/lib/api-utils"
import { z } from "zod"

const adoptionApplicationSchema = z.object({
  petId: z.string(),
  personalInfo: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    age: z.string(),
    occupation: z.string(),
  }),
  livingSituation: z.object({
    housingType: z.string(),
    ownRent: z.string(),
    hasYard: z.string(),
    landlordPermission: z.boolean().optional(),
  }),
  petExperience: z.object({
    previousPets: z.string(),
    currentPets: z.string(),
    petExperience: z.string().optional(),
  }),
  lifestyle: z.object({
    workSchedule: z.string(),
    exerciseTime: z.string(),
    travelFrequency: z.string(),
  }),
  motivation: z.object({
    adoptionReason: z.string().min(10),
    expectations: z.string().min(10),
  }),
  agreements: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  const { data, error } = await validateRequest(request, adoptionApplicationSchema)
  if (error) return error

  try {
    // 检查宠物是否存在且可领养
    const pet = await prisma.pet.findUnique({
      where: { id: data.petId },
    })

    if (!pet) {
      return createApiError("Pet not found", 404)
    }

    if (pet.status !== "AVAILABLE") {
      return createApiError("Pet is not available for adoption", 400)
    }

    // 创建用户（如果不存在）
    let user = await prisma.user.findUnique({
      where: { email: data.personalInfo.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.personalInfo.email,
          name: data.personalInfo.fullName,
          phone: data.personalInfo.phone,
        },
      })
    }

    // 检查是否已经申请过这只宠物
    const existingApplication = await prisma.adoptionApplication.findFirst({
      where: {
        userId: user.id,
        petId: data.petId,
        status: { in: ["PENDING", "UNDER_REVIEW"] },
      },
    })

    if (existingApplication) {
      return createApiError("You have already applied for this pet", 400)
    }

    // 创建领养申请
    const application = await prisma.adoptionApplication.create({
      data: {
        userId: user.id,
        petId: data.petId,
        personalInfo: JSON.stringify(data.personalInfo),
        livingSituation: JSON.stringify(data.livingSituation),
        petExperience: JSON.stringify(data.petExperience),
        lifestyle: JSON.stringify(data.lifestyle),
        motivation: JSON.stringify(data.motivation),
        agreements: JSON.stringify(data.agreements),
      },
      include: {
        user: true,
        pet: true,
      },
    })

    // 更新宠物状态为待审核
    await prisma.pet.update({
      where: { id: data.petId },
      data: { status: "PENDING" },
    })

    return createApiResponse(application, 201)
  } catch (error) {
    console.error("Error creating adoption application:", error)
    return createApiError("Failed to create adoption application", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    const where: any = {}
    if (status) where.status = status.toUpperCase()
    if (userId) where.userId = userId

    const [applications, total] = await Promise.all([
      prisma.adoptionApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true },
          },
          pet: {
            select: { id: true, name: true, type: true, breed: true, images: true },
          },
        },
      }),
      prisma.adoptionApplication.count({ where }),
    ])

    const applicationsWithData = applications.map((app) => ({
      ...app,
      personalInfo: JSON.parse(app.personalInfo),
      livingSituation: JSON.parse(app.livingSituation),
      petExperience: JSON.parse(app.petExperience),
      lifestyle: JSON.parse(app.lifestyle),
      motivation: JSON.parse(app.motivation),
      agreements: JSON.parse(app.agreements),
      pet: {
        ...app.pet,
        images: JSON.parse(app.pet.images || "[]"),
      },
    }))

    return createApiResponse({
      applications: applicationsWithData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching adoption applications:", error)
    return createApiError("Failed to fetch adoption applications", 500)
  }
}
