import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { createApiResponse, createApiError, getPaginationParams } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    // 构建查询条件
    const where: any = {
      status: "AVAILABLE",
    }

    // 搜索关键词
    const search = searchParams.get("search")
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { breed: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // 类型筛选
    const type = searchParams.get("type")
    if (type && type !== "all") {
      where.type = type.toUpperCase()
    }

    // 性别筛选
    const gender = searchParams.get("gender")
    if (gender && gender !== "all") {
      where.gender = gender.toUpperCase()
    }

    // 年龄筛选
    const ageRange = searchParams.get("age")
    if (ageRange && ageRange !== "all") {
      // 这里可以根据年龄范围进行筛选
      // 例如: young (0-1), adult (1-7), senior (7+)
    }

    // 城市筛选
    const city = searchParams.get("city")
    if (city) {
      where.location = { contains: city, mode: "insensitive" }
    }

    // 排序
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: {
              likes: true,
              favorites: true,
              adoptionApplications: true,
            },
          },
        },
      }),
      prisma.pet.count({ where }),
    ])

    // 处理图片数据
    const petsWithImages = pets.map((pet) => ({
      ...pet,
      images: JSON.parse(pet.images || "[]"),
      likeCount: pet._count.likes,
      favoriteCount: pet._count.favorites,
      applicationCount: pet._count.adoptionApplications,
    }))

    return createApiResponse({
      pets: petsWithImages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching pets:", error)
    return createApiError("Failed to fetch pets", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const pet = await prisma.pet.create({
      data: {
        name: body.name,
        type: body.type.toUpperCase(),
        breed: body.breed,
        age: body.age,
        gender: body.gender.toUpperCase(),
        weight: body.weight,
        color: body.color,
        description: body.description,
        location: body.location,
        images: JSON.stringify(body.images || []),
        vaccinated: body.vaccinated || false,
        neutered: body.neutered || false,
        microchipped: body.microchipped || false,
        rescueStory: body.rescueStory,
        careNeeds: body.careNeeds,
        personality: body.personality,
      },
    })

    return createApiResponse(pet, 201)
  } catch (error) {
    console.error("Error creating pet:", error)
    return createApiError("Failed to create pet", 500)
  }
}
