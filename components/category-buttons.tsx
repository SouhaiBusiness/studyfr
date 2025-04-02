import Link from "next/link"

const categories = [
  { name: "Linguistique", path: "/linguistics" },
  { name: "Littérarture", path: "/literature" },
  { name: "Examens", path: "/exams" },
  { name: "Quiz", path: "/quiz" },
  { name: "Commentaire Composé", path: "/commentaire-compose" },
  { name: "Histoire de l'art et de littérature", path: "/histoire-art-litterature" },
  { name: "Dissertation", path: "/dissertation" },
  { name: "Essai", path: "/essais" },
  { name: "Communication", path: "/communication" },
  { name: "Traduction", path: "/traduction" },
  { name: "Philosophie", path: "/philosophie" },
]

export default function CategoryButtons() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Explorer les Categories</h2>
      <div className="flex flex-wrap justify-center gap-4" data-aos='fade-left'>
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.path}
            className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-[#0e2d6d] hover:text-white transition-colors text-center"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

