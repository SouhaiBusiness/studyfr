import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    // Fix: Await params before accessing its properties
    const paramsData = await params
    const slug = paramsData.slug

    const client = await clientPromise
    const db = client.db("frenchstudies")

    const blog = await db.collection("blogs").findOne({
      slug: slug,
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog by slug:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

