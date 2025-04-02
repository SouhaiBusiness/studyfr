"use client"

import { useState } from "react"
import Image from "next/image"
import SemesterFilter from "@/components/semester-filter"
import ModuleList from "@/components/module-list"

export default function LinguisticsPage() {
  const [activeSemester, setActiveSemester] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image src="/linguistique.jpg?height=300&width=1200" alt="Linguistics" fill className="object-cover" />
        <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Session Linguistique</h1>
            <p className="text-lg max-w-2xl">
            Explorez notre collection complète de cours de linguistique française, couvrant les théories linguistique, la phonétique, la grammaire, la syntaxe et bien d'autres contenus intéressants.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <SemesterFilter activeSemester={activeSemester} onSemesterChange={setActiveSemester} />
        <ModuleList category="linguistics" activeSemester={activeSemester} />
      </div>
    </main>
  )
}

