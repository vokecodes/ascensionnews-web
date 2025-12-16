import { Topic } from "@/api/topics";

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Topic[];
}

export default function Header({
  activeCategory,
  setActiveCategory,
  categories,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#202124] border-b border-[#3c4043]">
      {/* Top Bar */}
      <div className="lg:flex items-center justify-between px-6 py-3 gap-6">
        <h1 className="text-white text-xl font-normal whitespace-nowrap">
          Ascension News
        </h1>

        <div className="mt-5 lg:mt-0 relative flex-1 max-w-3xl">
          <input
            type="text"
            placeholder="Search for topics, locations & sources"
            className="w-full bg-[#303134] text-white placeholder-[#9aa0a6] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9aa0a6]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          {/* <button className="text-[#9aa0a6] hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                    </button> */}
          {/* <button className="text-[#9aa0a6] hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                    </button> */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1 px-6 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.label)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeCategory === category.label
                ? "text-[#8ab4f8] border-b-2 border-[#8ab4f8]"
                : "text-[#e8eaed] hover:text-white"
            }`}
          >
            {category.emoji && <span>{category.emoji}</span>}
            {category.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
