"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Calendar, User, Tag, Loader2 } from "lucide-react"
import { marked } from "marked"

type Blog = {
  _id: string
  title: string
  description: string
  category: string
  author: string
  content: string
  slug: string
  createdAt: string
  status: string
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsLoading(true)

        // First try to fetch by slug
        let response = await fetch(`/api/blogs/slug/${slug}`)

        // If not found by slug, try by ID (for backward compatibility)
        if (!response.ok) {
          response = await fetch(`/api/blogs/${slug}`)
        }

        if (!response.ok) {
          throw new Error("Blog not found")
        }

        const data = await response.json()
        setBlog(data)
      } catch (error) {
        console.error("Error fetching blog:", error)
        setError("Failed to load article. It may have been removed or is unavailable.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading article...</span>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
          {error || "Article not found"}
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Return to home page
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline flex items-center mb-6">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to articles
      </Link>

      <article className="bg-white rounded-lg overflow-hidden shadow-2xl border-top border-t-1 border-b-1 border-t-gray-400 border-b-gray-400 p-6">
        <header className="mb-6">
          <h1 className="text-3xl  text-blue-500 font-bold mb-4">{blog.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{blog.description}</p>

          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 border-b pb-4">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{blog.category}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{blog.author || "Anonymous"}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: marked(blog.content) }} />
      </article>
    </div>
  )
}

