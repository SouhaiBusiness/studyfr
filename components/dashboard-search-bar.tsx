"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

// Mock data for search results
const mockSearchData = [
  { id: 1, title: "Introduction to French Phonetics", type: "blog", path: "/dashboard/blogs/1" },
  { id: 2, title: "French Literature in the 19th Century", type: "blog", path: "/dashboard/blogs/2" },
  { id: 3, title: "French Grammar: Past Tenses", type: "blog", path: "/dashboard/blogs/3" },
  { id: 4, title: "Exam Preparation: Dissertation", type: "blog", path: "/dashboard/blogs/4" },
  { id: 5, title: "Quiz: French Vocabulary", type: "blog", path: "/dashboard/blogs/5" },
]

export default function DashboardSearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockSearchData>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    // Simulate search with mock data
    const results = mockSearchData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

    setSearchResults(results)
    setIsSearching(true)
  }

  const handleResultClick = (path: string) => {
    router.push(path)
    setIsSearching(false)
    setSearchResults([])
  }

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search blogs..."
          className="bg-white pl-10 pr-4 py-2 border rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.trim() && !isSearching) {
              handleSearch(new Event("submit") as any)
            }
          }}
        />
      </form>

      {isSearching && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full border rounded-md shadow-sm bg-white">
          <ul className="divide-y">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleResultClick(result.path)}
              >
                <h4 className="font-medium">{result.title}</h4>
                <p className="text-sm text-gray-500 capitalize">{result.type}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

