import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")

    const client = await clientPromise
    const db = client.db("frenchstudies")

    // Build query
    const query: any = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Get total count for pagination
    const total = await db.collection("blogs").countDocuments(query)

    // Get blogs with pagination
    const blogs = await db
      .collection("blogs")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.title || !data.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("frenchstudies")

    // Check if slug already exists
    if (data.slug) {
      const existingBlog = await db.collection("blogs").findOne({ slug: data.slug })
      if (existingBlog) {
        // Append a random string to make the slug unique
        data.slug = `${data.slug}-${Math.random().toString(36).substring(2, 7)}`
      }
    }

    const blog = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("blogs").insertOne(blog)

    return NextResponse.json({
      id: result.insertedId,
      ...blog,
    })
  } catch (error) {
    console.error("Error creating blog:", error)
    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
    return NextResponse.json({ error: `Failed to create blog: ${errorMessage}` }, { status: 500 })
  }
}

