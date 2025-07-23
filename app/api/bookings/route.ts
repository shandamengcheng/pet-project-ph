import type { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { createApiResponse, createApiError, validateRequest, getPaginationParams } from "@/lib/api-utils"
import { z } from "zod"

const bookingSchema = z.object({
  serviceId: z.string(),
  date: z.string(),
  time: z.string(),
  serviceType: z.enum(["in-store", "home-visit"]),
  petInfo: z.object({
    petName: z.string().min(1),
    petType: z.string(),
    petBreed: z.string().optional(),
    petAge: z.string().optional(),
  }),
  contactInfo: z.object({
    ownerName: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email().optional(),
    address: z.string().optional(),
  }),
  specialRequests: z.string().optional(),
})

export async function POST(request: NextRequest) {
  const { data, error } = await validateRequest(request, bookingSchema)
  if (error) return error

  try {
    // 检查服务是否存在
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    })

    if (!service || !service.active) {
      return createApiError("Service not found or not available", 404)
    }

    // 创建或查找用户
    let user = await prisma.user.findUnique({
      where: { email: data.contactInfo.email || "" },
    })

    if (!user && data.contactInfo.email) {
      user = await prisma.user.create({
        data: {
          email: data.contactInfo.email,
          name: data.contactInfo.ownerName,
          phone: data.contactInfo.phone,
        },
      })
    }

    // 计算总价格
    const basePrice = Number.parseFloat(service.price.replace(/[^\d.]/g, ""))
    const serviceTypeFee = data.serviceType === "home-visit" ? 50 : 0
    const totalAmount = basePrice + serviceTypeFee

    // 创建预约
    const booking = await prisma.booking.create({
      data: {
        userId: user?.id || "",
        serviceId: data.serviceId,
        date: new Date(data.date),
        time: data.time,
        serviceType: data.serviceType,
        petInfo: JSON.stringify(data.petInfo),
        contactInfo: JSON.stringify(data.contactInfo),
        specialRequests: data.specialRequests,
        totalAmount,
      },
      include: {
        service: true,
        user: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
    })

    return createApiResponse(booking, 201)
  } catch (error) {
    console.error("Error creating booking:", error)
    return createApiError("Failed to create booking", 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    const status = searchParams.get("status")
    const userId = searchParams.get("userId")
    const serviceId = searchParams.get("serviceId")

    const where: any = {}
    if (status) where.status = status.toUpperCase()
    if (userId) where.userId = userId
    if (serviceId) where.serviceId = serviceId

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          service: true,
          user: {
            select: { id: true, name: true, email: true, phone: true },
          },
        },
      }),
      prisma.booking.count({ where }),
    ])

    const bookingsWithData = bookings.map((booking) => ({
      ...booking,
      petInfo: JSON.parse(booking.petInfo),
      contactInfo: JSON.parse(booking.contactInfo),
    }))

    return createApiResponse({
      bookings: bookingsWithData,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return createApiError("Failed to fetch bookings", 500)
  }
}
