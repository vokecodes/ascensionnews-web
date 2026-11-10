"use client";

import { NewsArticle } from "@/data/newsData";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useNewsStore } from "@/store/useNewsStore";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "large" | "medium" | "small";
}

export default function NewsCard({ article, variant = "medium" }: NewsCardProps) {
  const setSelectedArticle = useNewsStore((state) => state.setSelectedArticle);

  const newsSource =
    typeof article.source === "string" ? article.source : article.source.name;
  const newsTime = article.publishedAt
    ? moment(article.publishedAt).fromNow()
    : article.time || "";
  const newsImage = article.imageUrl || article.image;
  const internalUrl = article.id ? `/news/${article.id}` : (article.url || "#");

  const onCardClick = () => {
    setSelectedArticle(article);
  };

  if (variant === "large") {
    return (
      <div className="group block">
        <Link
          href={internalUrl}
          onClick={onCardClick}
          className="block cursor-pointer"
        >
          {newsImage && (
            <div className="relative w-full h-64 mb-3 rounded-lg overflow-hidden bg-[#303134]">
              <Image
                src={newsImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <h2 className="text-white text-xl font-normal mb-2 group-hover:text-[#8ab4f8] transition-colors line-clamp-3">
            {article.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between text-sm text-[#9aa0a6] pt-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#8ab4f8]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              {newsSource}
            </span>
            <span>•</span>
            <span>{newsTime}</span>
          </div>

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#8ab4f8] transition-colors p-1"
              title={`Read directly on ${newsSource}`}
              aria-label={`Read directly on ${newsSource}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  }

  if (variant === "small") {
    const initials = newsSource.slice(0, 1).toUpperCase();
    return (
      <div className="group flex gap-4 items-start relative pb-4 border-b border-[#3c4043] last:border-0 last:pb-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded bg-[#8ab4f8] flex items-center justify-center text-[10px] text-[#202124] font-bold">
              {initials}
            </div>
            <span className="text-xs text-[#9aa0a6] truncate">{newsSource}</span>
          </div>

          <Link
            href={internalUrl}
            onClick={onCardClick}
            className="block cursor-pointer"
          >
            <h3 className="text-white text-sm font-normal mb-2 group-hover:text-[#8ab4f8] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-[#9aa0a6]">
            <span>{newsTime}</span>
            {article.author && (
              <>
                <span>•</span>
                <span className="truncate">By {article.author}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {newsImage && (
            <Link
              href={internalUrl}
              onClick={onCardClick}
              className="block relative w-16 h-16 rounded-lg overflow-hidden bg-[#303134]"
            >
              <Image
                src={newsImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          )}

          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9aa0a6] hover:text-[#8ab4f8] p-1 mt-auto transition-colors"
              title={`Read directly on ${newsSource}`}
              aria-label={`Read directly on ${newsSource}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group block">
      <Link
        href={internalUrl}
        onClick={onCardClick}
        className="block cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[#9aa0a6] flex items-center gap-1">
            <svg className="w-3 h-3 text-[#8ab4f8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {newsSource}
          </span>
        </div>
        <h3 className="text-white text-base font-normal mb-1 group-hover:text-[#8ab4f8] transition-colors line-clamp-2">
          {article.title}
        </h3>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#9aa0a6]">{newsTime}</p>
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9aa0a6] hover:text-[#8ab4f8] p-1 transition-colors"
            title={`Read directly on ${newsSource}`}
            aria-label={`Read directly on ${newsSource}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
