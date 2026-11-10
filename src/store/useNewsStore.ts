import { create } from "zustand";
import { NewsArticle } from "@/data/newsData";

interface NewsState {
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  selectedArticle: null,
  setSelectedArticle: (article) => {
    set({ selectedArticle: article });
    if (typeof window !== "undefined" && article) {
      try {
        sessionStorage.setItem("ascension_current_article", JSON.stringify(article));
      } catch (e) {
        console.error("Failed to cache article in session storage:", e);
      }
    }
  },
}));

