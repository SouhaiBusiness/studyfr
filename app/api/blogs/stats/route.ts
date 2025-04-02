import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    // Removed Clerk authentication for simplicity

    const client = await clientPromise
    const db = client.db("frenchstudies")

    // Get total count
    const totalBlogs = await db.collection("blogs").countDocuments()

    // Get published count
    const publishedBlogs = await db.collection("blogs").countDocuments({
      status: "published",
    })

    // Get draft count
    const draftBlogs = await db.collection("blogs").countDocuments({
      status: "draft",
    })

    // Get recent blogs
    const recentBlogs = await db.collection("blogs").find().sort({ updatedAt: -1 }).limit(5).toArray()

    return NextResponse.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      recentBlogs,
    })
  } catch (error) {
    console.error("Error fetching blog stats:", error)
    return NextResponse.json({ error: "Failed to fetch blog stats" }, { status: 500 })
  }
}

