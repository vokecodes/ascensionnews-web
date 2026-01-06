"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { getTopics, Topic } from "@/api/topics";
import {
  getHotNews,
  getTrendingNews,
  getNewsByTopic,
  getNewsByLocation,
  searchNews,
} from "@/api/news";
import { getUserLocation, UserLocation } from "@/api/location";
import { NewsArticle } from "@/data/newsData";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import AdSection from "@/components/AdSection";

const TOPICS_TO_FETCH = [
  { key: "nigeria", label: "Nigeria" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Technology" },
  { key: "finance", label: "Finance" },
  { key: "music", label: "Music" },
  { key: "economy", label: "Economy" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Home");
  const [categories, setCategories] = useState<Topic[]>([
    { key: "home", label: "Home", emoji: "🏡" },
  ]);

  const [hotNews, setHotNews] = useState<NewsArticle[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsArticle[]>([]);
  const [topicNews, setTopicNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [topicsNewsData, setTopicsNewsData] = useState<Record<string, NewsArticle[]>>({});
  const [loadingTopics, setLoadingTopics] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await getTopics();
        setCategories([
          { key: "home", label: "Home", emoji: "🏡" },
          ...fetchedTopics,
        ]);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    const initLocation = async () => {
      try {
        const stored = localStorage.getItem("user_location");
        if (stored) {
          setUserLocation(JSON.parse(stored));
        } else {
          const loc = await getUserLocation();
          localStorage.setItem("user_location", JSON.stringify(loc));
          setUserLocation(loc);
        }
      } catch (error) {
        console.error("Error initializing location:", error);
      }
    };

    const fetchTopicsNews = async () => {
      setLoadingTopics(true);
      try {
        const results = await Promise.all(
          TOPICS_TO_FETCH.map((topic) => getNewsByTopic(topic.key, 1, 3))
        );
        const newData: Record<string, NewsArticle[]> = {};
        TOPICS_TO_FETCH.forEach((topic, index) => {
          newData[topic.key] = results[index];
        });
        setTopicsNewsData(newData);
      } catch (error) {
        console.error("Error fetching topics news:", error);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
    initLocation();
    fetchTopicsNews();
  }, []);

  // Reset state when category changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setTopicNews([]);
    // For Home, we might want to reset trendingNews if we leave and come back?
    // But typically we keep cache. However, to simplify pagination reset:
    if (activeCategory === "Home") {
      // Optional: clear current view to force refresh?
      // Or keep it. Let's keep it but ensure page reset works for next fetches.
    }
  }, [activeCategory]);

  const fetchData = async (
    pageNum: number,
    isLoadMore: boolean = false,
    categoryOverride?: string,
    searchTerm?: string
  ) => {
    const category = categoryOverride || activeCategory;
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      if (category === "Home") {
        if (pageNum === 1) {
          const [hot, trending] = await Promise.all([
            getHotNews(1, 10),
            getTrendingNews(1, 10),
          ]);
          setHotNews(hot);
          setTrendingNews(trending);
          if (trending.length < 10) setHasMore(false);
          else setHasMore(true);
        } else {
          // Load more trending news
          const newTrending = await getTrendingNews(pageNum, 10);
          setTrendingNews((prev) => [...prev, ...newTrending]);
          if (newTrending.length < 10) setHasMore(false);
        }
      } else {
        // Topic / Trending / Local
        let news: NewsArticle[] = [];

        if (category === "Trending") {
          news = await getTrendingNews(pageNum, 10);
        } else if (category === "Local") {
          if (userLocation) {
            news = await getNewsByLocation(
              userLocation.country_name,
              userLocation.region,
              userLocation.city,
              pageNum,
              10
            );
          } else {
            setLoading(false);
            setLoadingMore(false);
            return;
          }
        } else if (category === "Search") {
          const term = searchTerm || searchQuery;
          if (!term) {
            setLoading(false);
            setLoadingMore(false);
            return;
          }
          news = await searchNews(term, pageNum, 10);
        } else {
          const selectedCategory =
            categories.find((c) => c.label === category) ||
            TOPICS_TO_FETCH.find((c) => c.label === category);

          if (selectedCategory) {
            news = await getNewsByTopic(selectedCategory.key, pageNum, 10);
          }
        }

        if (isLoadMore) {
          setTopicNews((prev) => [...prev, ...news]);
        } else {
          setTopicNews(news);
        }

        if (news.length < 10) setHasMore(false);
        else setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    // Initial fetch when category or necessary deps change (except Search which is user-triggered)
    if (activeCategory === "Search") return;
    if (activeCategory === "Home" || categories.length > 1) {
      if (activeCategory === "Local" && !userLocation) {
        return;
      }
      fetchData(1, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, categories, userLocation]);

  const loadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true);
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    setActiveCategory("Search");
    setPage(1);
    setHasMore(true);
    setTopicNews([]);
    fetchData(1, false, "Search", trimmed);
  };

  if (
    loading &&
    !topicNews.length &&
    !hotNews.length &&
    activeCategory !== "Local"
  ) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#202124]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#202124]">
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-4 max-w-6xl">
        {/* Briefing Header */}
        <section className="mb-6">
          <h1 className="text-2xl font-normal text-white">
            {activeCategory === "Home" ? "Your briefing" : activeCategory}
          </h1>
          <p className="text-sm text-[#9aa0a6] mt-1">
            {moment().format("dddd, D MMMM")}
          </p>
        </section>

        {activeCategory === "Home" ? (
          <div className="space-y-8">
            {/* Top Stories Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-[#292a2d] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#8ab4f8] text-lg font-medium">
                    Top stories
                  </h2>
                </div>
                {hotNews.length > 0 && (
                  <div className="space-y-6">
                    <NewsCard article={hotNews[0]} variant="large" />
                    <div className="space-y-4">
                      {hotNews.slice(1, 4).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          variant="small"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary/Other Top Stories can go here or be omitted */}
              <div className="bg-[#292a2d] rounded-lg p-4">
                <h2 className="text-[#8ab4f8] text-sm font-medium mb-4">
                  Picks for you
                </h2>
                <div className="space-y-4">
                  {/* We can show a preview of trending here, or just the top 5 */}
                  {trendingNews.slice(0, 5).map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="small"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Ad Section */}
            <AdSection />

            {/* Latest News Section (Paginated Trending) */}
            <div className="space-y-4">
              <h2 className="text-xl text-white font-medium">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingNews.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    variant="small"
                  />
                ))}
              </div>
            </div>

            {/* Your topics Section */}
            <div className="pt-8 border-t border-[#3c4043] space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl text-white font-normal">Your topics</h2>
                  <p className="text-sm text-[#9aa0a6] flex items-center gap-1">
                    Recommended based on your interests
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3c4043] text-white text-sm hover:bg-[#303134] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Customise
                </button>
              </div>

              {loadingTopics ? (
                <div className="text-[#9aa0a6] text-sm">Loading topics...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TOPICS_TO_FETCH.map((topic) => (
                    <div key={topic.key} className="bg-[#292a2d] rounded-xl p-6 space-y-6">
                      <button
                        onClick={() => setActiveCategory(topic.label)}
                        className="flex items-center gap-2 text-white text-xl font-normal hover:text-[#8ab4f8] transition-colors"
                      >
                        {topic.label}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div className="space-y-4">
                        {(topicsNewsData[topic.key] || []).map((article) => (
                          <NewsCard
                            key={article.id}
                            article={article}
                            variant="small"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicNews.map((article) => (
              <NewsCard key={article.id} article={article} variant="small" />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && activeCategory !== "Home" && (
          <div className="flex justify-center py-8">
            <button
              onClick={loadMoreData}
              disabled={loadingMore}
              className="bg-[#303134] text-[#8ab4f8] px-6 py-2 rounded-full hover:bg-[#3c4043] transition-colors disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
