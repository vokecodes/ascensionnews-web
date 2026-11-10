"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { getTopics, Topic } from "@/api/topics";
import { getNewsById, getTrendingNews } from "@/api/news";
import { NewsArticle } from "@/data/newsData";
import { useNewsStore } from "@/store/useNewsStore";
import { toast } from "sonner";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [categories, setCategories] = useState<Topic[]>([
    { key: "home", label: "Home", emoji: "🏡" },
  ]);
  const [activeCategory, setActiveCategory] = useState("");
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedArticle = useNewsStore((state) => state.selectedArticle);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const fetchedTopics = await getTopics().catch(() => []);
        setCategories([
          { key: "home", label: "Home", emoji: "🏡" },
          ...fetchedTopics,
        ]);

        // Attempt to resolve article from store or session storage first
        let current: NewsArticle | null = null;
        if (selectedArticle && String(selectedArticle.id) === String(id)) {
          current = selectedArticle;
        } else if (typeof window !== "undefined") {
          const cached = sessionStorage.getItem("ascension_current_article");
          if (cached) {
            try {
              const parsed: NewsArticle = JSON.parse(cached);
              if (String(parsed.id) === String(id)) {
                current = parsed;
              }
            } catch (err) {
              console.error("Failed to parse cached article:", err);
            }
          }
        }

        // If not found in cache, fetch from API
        if (!current && id) {
          current = await getNewsById(id);
        }

        setArticle(current);

        // Fetch related stories
        const trending = await getTrendingNews(1, 6).catch(() => []);
        setRelatedNews(trending.filter((item) => String(item.id) !== String(id)).slice(0, 4));
      } catch (err) {
        console.error("Error loading article detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      initData();
    }
  }, [id, selectedArticle]);

  const handleSearch = (query: string) => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  const newsSource = article
    ? typeof article.source === "string"
      ? article.source
      : article.source.name
    : "";
  const newsTime = article?.publishedAt
    ? moment(article.publishedAt).fromNow()
    : article?.time || "";
  const newsImage = article?.imageUrl || article?.image;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#202124] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#8ab4f8] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#9aa0a6]">Loading story briefing...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#202124] text-white">
        <Header
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          onSearch={handleSearch}
        />
        <main className="container mx-auto px-6 py-20 max-w-2xl text-center space-y-6">
          <h1 className="text-3xl font-bold">Story Not Found</h1>
          <p className="text-[#9aa0a6]">
            The story you are looking for may have moved or is no longer
            available.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#8ab4f8] text-[#202124] font-semibold rounded-full hover:bg-[#a1c4fd] transition-colors"
          >
            ← Back to Latest Briefings
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202124] text-[#e8eaed]">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between text-xs text-[#9aa0a6] pb-4 border-b border-[#3c4043]">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Briefings
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#303134] hover:bg-[#3c4043] text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Share Story
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#8ab4f8]/20 text-[#8ab4f8] font-medium uppercase tracking-wider">
              {article.category || "General News"}
            </span>
            <span className="text-[#9aa0a6] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Verified Source: <strong className="text-white">{newsSource}</strong>
            </span>
            <span className="text-[#5f6368]">•</span>
            <span className="text-[#9aa0a6]">{newsTime}</span>
            {article.author && (
              <>
                <span className="text-[#5f6368]">•</span>
                <span className="text-[#9aa0a6]">By {article.author}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>
        </header>

        {/* Featured Image */}
        {newsImage && (
          <div className="relative w-full h-[280px] md:h-[450px] rounded-2xl overflow-hidden bg-[#303134] shadow-2xl">
            <Image
              src={newsImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
              <p className="text-xs text-gray-300">
                Source: {newsSource} via Ascension News Wire
              </p>
            </div>
          </div>
        )}

        {/* Editorial Synopsis / Article Content */}
        <article className="space-y-6 text-[#d2d6dc] text-base md:text-lg leading-relaxed bg-[#292a2d] p-6 md:p-8 rounded-2xl border border-[#3c4043]">
          <div className="flex items-center justify-between pb-4 border-b border-[#3c4043]">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-[#8ab4f8]">
              Executive Briefing &amp; Key Coverage
            </h2>
            <span className="text-xs text-[#9aa0a6]">Curated Digest</span>
          </div>

          {article.content ? (
            <div className="space-y-4 whitespace-pre-line text-white">
              {article.content}
            </div>
          ) : article.summary ? (
            <div className="space-y-4">
              <p className="font-normal text-white">{article.summary}</p>
            </div>
          ) : (
            <div className="space-y-4 text-white">
              <p>
                {article.title}. This story is part of Ascension News&apos;s
                ongoing regional and topical coverage monitoring developments
                from verified correspondents and primary news wires.
              </p>
              <p className="text-sm text-[#9aa0a6]">
                Our editorial engine indexes key updates from {newsSource} to
                keep you informed of rapid political, business, and cultural
                movements across the continent.
              </p>
            </div>
          )}

          {/* Source Attribution & Primary Action Box */}
          <div className="pt-6 border-t border-[#3c4043] space-y-4">
            <div className="bg-[#202124] p-5 rounded-xl border border-[#3c4043] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-[#8ab4f8] font-semibold uppercase tracking-wider">
                  Original Source Attribution
                </p>
                <p className="text-sm text-white font-medium">
                  Read complete unedited coverage directly on {newsSource}
                </p>
                <p className="text-xs text-[#9aa0a6]">
                  Ascension News provides executive summaries with direct attribution to the primary reporting outlet.
                </p>
              </div>

              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8ab4f8] text-[#202124] font-semibold text-sm rounded-xl hover:bg-[#a6c8ff] transition-all transform hover:-translate-y-0.5 shrink-0 shadow-lg"
                >
                  Read Full Story on {newsSource}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </article>

        {/* Related Stories */}
        {relatedNews.length > 0 && (
          <section className="space-y-4 pt-8 border-t border-[#3c4043]">
            <h2 className="text-xl font-medium text-white">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedNews.map((story) => (
                <NewsCard key={story.id} article={story} variant="small" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

