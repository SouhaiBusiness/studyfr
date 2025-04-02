import HeroSection from "@/components/hero-section"
import SearchBar from "@/components/search-bar"
 
import CategoryButtons from "@/components/category-buttons"
import ArticleCards from "@/components/article-cards"
 
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Articles section - 70% width on desktop */}
          <div className="w-full md:w-[70%]">
            <ArticleCards />
          </div>

          {/* Categories section - 30% width on desktop */}
          <div className="w-full md:w-[30%]">
            <CategoryButtons />
          </div>
        </div>
      </div>
    </main>
  )
}

