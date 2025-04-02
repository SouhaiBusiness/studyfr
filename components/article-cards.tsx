"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, User, Tag, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Blog = {
  _id: string
  title: string
  description: string
  category: string
  author: string
  slug: string
  createdAt: string
  status: string
}

type PaginationData = {
  total: number
  page: number
  limit: number
  pages: number
}

export default function ArticleCards() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 2, // Show 8 blogs per page
    pages: 0,
  })

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blogs?status=published&limit=${pagination.limit}&page=${page}`)

      if (!response.ok) {
        throw new Error("Failed to fetch blogs")
      }

      const data = await response.json()
      setBlogs(data.blogs || [])
      setPagination(
        data.pagination || {
          total: data.blogs?.length || 0,
          page,
          limit: pagination.limit,
          pages: Math.ceil((data.blogs?.length || 0) / pagination.limit),
        },
      )
    } catch (error) {
      console.error("Error fetching blogs:", error)
      setError("Failed to load articles. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs(1)
  }, [])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return
    fetchBlogs(newPage)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5 // Show at most 5 page numbers

    let startPage = Math.max(1, pagination.page - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(pagination.pages, startPage + maxPagesToShow - 1)

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Articles Récents</h2>
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Chargement des articles...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Articles Récents</h2>
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Articles Récents</h2>

      <div className="grid grid-cols-1 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="p-6">
                <Link href={`/articles/${blog.slug || blog._id}`}>
                  <h3 className="text-xl font-bold mb-2 text-[#0e2d6d] hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white border rounded-lg">
            No articles found. Check back soon!
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={pagination.page === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageNum)}
              className={pagination.page === pageNum ? "bg-[#0e2d6d]" : ""}
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Pagination Info */}
      {pagination.total > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} articles
        </div>
      )}
    </div>
  )
}

