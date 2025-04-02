"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ChevronLeft, Save, Loader2 } from "lucide-react"
import { useNotification, Notification } from "@/components/notification"
import { generateSlug } from "@/lib/utils"

// Dynamically import the markdown editor to avoid SSR issues
// Use a more stable configuration
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 h-[400px] bg-gray-50">Loading editor...</div>,
})

const categories = [
  { value: "linguistics", label: "Linguistique" },
  { value: "literature", label: "Littérarture" },
  { value: "exams", label: "Examens" },
  { value: "quiz", label: "Quiz" },
  { value: "commentaire", label: "Commentaire Composé" },
  { value: "histoire", label: "Histoire d'l'art et de littérature" },
  { value: "dissertation", label: "Dissertation" },
  { value: "essai", label: "Essai" },
  { value: "communication", label: "Communication" },
  { value: "traduction", label: "Traduction" },
  { value: "philosophie", label: "Philosophie" },
]

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string
  const { notification, showNotification, hideNotification } = useNotification()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("draft")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editorKey, setEditorKey] = useState(`editor-${Date.now()}`) // Add a unique key

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blogs/${blogId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch blog")
        }

        const blog = await response.json()

        setTitle(blog.title)
        setDescription(blog.description)
        setAuthor(blog.author || "")
        setCategory(blog.category)
        setContent(blog.content)
        setStatus(blog.status)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching blog:", error)
        showNotification("error", "Failed to load blog data")
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [blogId, showNotification])

  // Simple content change handler to avoid editor issues
  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !category || !content || !author) {
      showNotification("error", "Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Generate slug from title
    const slug = generateSlug(title)

    // Prepare blog data
    const blogData = {
      title,
      description,
      author,
      category,
      content,
      status,
      slug,
      updatedAt: new Date().toISOString(),
    }

    try {
      // Send data to API
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) {
        throw new Error("Failed to update blog")
      }

      showNotification("success", "Blog updated successfully!")

      // Wait a moment to show the notification before redirecting
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error updating blog:", error)
      showNotification("error", "Failed to update blog. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback to a simple textarea if needed
  const renderEditor = () => {
    // Try using the MDEditor first
    try {
      return (
        <div className="editor-container">
          <MDEditor
            key={editorKey}
            value={content}
            onChange={handleContentChange}
            height={400}
            preview="edit"
            textareaProps={{
              id: "content-editor",
              disabled: isSubmitting,
            }}
          />
        </div>
      )
    } catch (error) {
      console.error("Error rendering MDEditor:", error)
      // Fallback to a simple textarea
      return (
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md min-h-[400px]"
          disabled={isSubmitting}
        />
      )
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">Loading blog data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}

      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 border rounded-md hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="block text-sm font-medium">
            Author
          </label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            className="w-full px-3 py-2 border rounded-md"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter a short description"
            className="w-full px-3 py-2 border rounded-md min-h-[80px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          {renderEditor()}
        </div>

        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button
              type="button"
              className={`px-4 py-2 border rounded-md ${
                status === "draft" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setStatus("draft")}
              disabled={isSubmitting}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-md ${
                status === "published" ? "bg-green-100 text-green-800 border-green-300" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setStatus("published")}
              disabled={isSubmitting}
            >
              Publish
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

