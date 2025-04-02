{/*
    "use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"

// Mock data for blogs
const mockBlogs = [
  {
    id: 1,
    title: "Introduction to French Phonetics",
    description: "Learn about the basics of French pronunciation and phonetics.",
    category: "Linguistics",
    author: "Jean Dupont",
    date: "2023-05-15",
    status: "published",
  },
  {
    id: 2,
    title: "French Literature in the 19th Century",
    description: "Explore the rich literary tradition of 19th century France.",
    category: "Literature",
    author: "Marie Curie",
    date: "2023-06-20",
    status: "draft",
  },
  {
    id: 3,
    title: "French Grammar: Past Tenses",
    description: "A comprehensive guide to French past tenses and their usage.",
    category: "Grammar",
    author: "Pierre Martin",
    date: "2023-07-10",
    status: "published",
  },
  {
    id: 4,
    title: "Exam Preparation: Dissertation",
    description: "Tips and strategies for writing a successful French dissertation.",
    category: "Exams",
    author: "Sophie Leclerc",
    date: "2023-08-05",
    status: "draft",
  },
  {
    id: 5,
    title: "Quiz: French Vocabulary",
    description: "Test your knowledge of essential French vocabulary.",
    category: "Quiz",
    author: "Antoine Dubois",
    date: "2023-09-12",
    status: "published",
  },
]

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)

  // Filter blogs based on search term and status
  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || blog.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const toggleDropdown = (id: number) => {
    if (dropdownOpen === id) {
      setDropdownOpen(null)
    } else {
      setDropdownOpen(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link
          href="/dashboard/blogs/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Create New Blog
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search blogs..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 font-medium">
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Actions</div>
        </div>
        <div className="divide-y">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="grid grid-cols-12 px-4 py-3 items-center">
              <div className="col-span-5">
                <h3 className="font-medium">{blog.title}</h3>
                <p className="text-sm text-gray-500 truncate">{blog.description}</p>
              </div>
              <div className="col-span-2">{blog.category}</div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    blog.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {blog.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
              <div className="col-span-2">{new Date(blog.date).toLocaleDateString()}</div>
              <div className="col-span-1 relative">
                <button onClick={() => toggleDropdown(blog.id)} className="p-1 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5" />
                </button>

                {dropdownOpen === blog.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                    <div className="py-1">
                      <Link
                        href={`/dashboard/blogs/${blog.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </Link>
                      <Link
                        href={`/dashboard/blogs/${blog.id}/edit`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                      <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

*/}