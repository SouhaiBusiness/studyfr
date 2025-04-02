"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { marked } from "marked"

// Mock data for a single blog
const mockBlog = {
  id: 1,
  title: "Introduction to French Phonetics",
  description: "Learn about the basics of French pronunciation and phonetics.",
  category: "Linguistics",
  author: "Jean Dupont",
  content:
    "# Introduction to French Phonetics\n\nFrench phonetics is the study of the sound system of the French language. It includes the study of the consonants, vowels, stress, rhythm and intonation of the language.\n\n## Vowels\n\nFrench has a rich vowel system with 12 oral vowels and 4 nasal vowels.\n\n## Consonants\n\nFrench consonants are similar to English consonants, but there are some important differences in pronunciation.",
  status: "published",
  date: "2023-05-15",
}

export default function BlogPage() {
  const params = useParams()
  const blogId = params.id

  const [blog, setBlog] = useState<typeof mockBlog | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the blog data from your API
    // For now, we'll use the mock data
    setBlog(mockBlog)
    setIsLoading(false)
  }, [blogId])

  if (isLoading || !blog) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/blogs" className="p-2 border rounded-md hover:bg-gray-100">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">{blog.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/blogs/${blog.id}/edit`}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Category: {blog.category}</span>
          <span>•</span>
          <span>Author: {blog.author}</span>
          <span>•</span>
          <span>Date: {new Date(blog.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {blog.status === "published" ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: marked(blog.content) }} />
      </div>
    </div>
  )
}

