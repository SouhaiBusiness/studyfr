"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

type SearchResult = {
  _id: string
  title: string
  type: string
  path: string
}

export default function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    setIsSearching(true)

    try {
      // Fetch search results from API
      const response = await fetch(`/api/blogs?search=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()

      // Transform the data to match our search result format
      const formattedResults = data.blogs.map((blog: any) => ({
        _id: blog._id,
        title: blog.title,
        type: blog.category || "blog",
        path: `/articles/${blog._id}`,
      }))

      setSearchResults(formattedResults)
    } catch (error) {
      console.error("Error searching blogs:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="relative" data-aos="fade-down">
        <input
          type="text"
          placeholder="Trouver des cours, commentaires composés et divers sujets..."
          className="bg-white w-full px-4 py-3 pl-10 shadow-[0_15px_15px_rgba(0,0,0,0.25)] rounded-md focus:outline-none focus:shadow-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-2 px-4 py-1 bg-[#0e2d6d] text-white rounded-md hover:opacity-90 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Recherche..." : "Recherche"}
        </button>
      </form>

      {isSearching && (
        <div className="mt-4 border rounded-md shadow-sm">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium">Cherchez des "{searchTerm}"</h3>
          </div>

          {searchResults.length > 0 ? (
            <ul className="divide-y">
              {searchResults.map((result) => (
                <li key={result._id} className="p-4 hover:bg-gray-50">
                  <a href={result.path} className="block">
                    <h4 className="font-medium">{result.title}</h4>
                    <p className="text-sm text-gray-500 capitalize">{result.type}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              {isLoading ? "Recherche en cours..." : `Pas de résultats pour "${searchTerm}"`}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

