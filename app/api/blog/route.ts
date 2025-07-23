import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { createApiResponse, createApiError, getPaginationParams } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, skip } = getPaginationParams(searchParams)

    const posts = await db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      skip,
      take: limit,
    })

    return createApiResponse({
      posts,
      pagination: {
        page,
        limit,
        total: posts.length,
        totalPages: Math.ceil(posts.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return createApiError("Failed to fetch blog posts", 500)
  }
}
