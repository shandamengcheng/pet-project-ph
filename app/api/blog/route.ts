import { db } from "@/lib/db"
import { createApiResponse, createApiError } from "@/lib/api-utils"

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
    })
    return createApiResponse(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return createApiError("Failed to fetch blog posts", 500)
  }
}
