"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ChevronLeft, Save, Loader2 } from "lucide-react"
import { useNotification, Notification } from "@/components/notification"
import { generateSlug } from "@/lib/utils"

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), { ssr: false })

const categories = [
  { value: "linguistique", label: "Linguistique" },
  { value: "littérarture", label: "Littérarture" },
  { value: "examens", label: "Examens" },
  { value: "quiz", label: "Quiz" },
  { value: "commentaire composé", label: "Commentaire Composé" },
  { value: "histoire", label: "Histoire d'l'art et de littérature" },
  { value: "dissertation", label: "Dissertation" },
  { value: "essai", label: "Essai" },
  { value: "communication", label: "Communication" },
  { value: "traduction", label: "Traduction" },
  { value: "philosophie", label: "Philosophie" },
]

export default function NewBlogPage() {
  const router = useRouter()
  const { notification, showNotification, hideNotification } = useNotification()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("# Write your blog content here\n\nUse markdown to format your text.")
  const [status, setStatus] = useState("draft")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      date: new Date().toISOString(),
    }

    try {
      console.log("Sending blog data:", blogData)

      // Send data to API
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create blog")
      }

      console.log("Blog created successfully:", responseData)
      showNotification("success", "Blog created successfully!")

      // Wait a moment to show the notification before redirecting
      setTimeout(() => {
        router.push("/dashboard")
        router.refresh() // Refresh the page to update the blog count
      }, 1500)
    } catch (error) {
      console.error("Error creating blog:", error)
      showNotification("error", error instanceof Error ? error.message : "Failed to create blog. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}

      <div className="flex items-center gap-4">
        <Link href="/dashboard/blogs" className="p-2 border rounded-md hover:bg-gray-100">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Create New Blog</h1>
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
          <div data-color-mode="light">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={400}
              preview="edit"
              textareaProps={{
                disabled: isSubmitting,
              }}
            />
          </div>
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
                Save Blog
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

