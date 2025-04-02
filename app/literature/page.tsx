"use client"

import { useState } from "react"
import Image from "next/image"
import SemesterFilter from "@/components/semester-filter"
import ModuleList from "@/components/module-list"

export default function LiteraturePage() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image src="/Litterature.jpg?height=300&width=1200" alt="Literature" fill className="object-cover" />
        <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Session Littérature</h1>
            <p className="text-lg max-w-2xl">
            Découvrez le riche héritage de la littérature française, des œuvres médiévales aux contemporaines.  </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <SemesterFilter activeSemester={activeSemester} onSemesterChange={setActiveSemester} />
        <ModuleList category="literature" activeSemester={activeSemester} />
      </div>
    </main>
  )
}

