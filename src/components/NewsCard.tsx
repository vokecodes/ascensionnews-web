import { NewsArticle } from '@/data/newsData';
import Image from 'next/image';
import moment from 'moment';

interface NewsCardProps {
    article: NewsArticle;
    variant?: 'large' | 'medium' | 'small';
}

export default function NewsCard({ article, variant = 'medium' }: NewsCardProps) {
    const newsSource = typeof article.source === 'string' ? article.source : article.source.name;
    const newsTime = article.publishedAt ? moment(article.publishedAt).fromNow() : article.time;
    const newsImage = article.imageUrl || article.image;
    // const newsCategory = article.category || (article.topics && article.topics.length > 0 ? article.topics[0] : '');

    if (variant === 'large') {
        return (
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
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
                <div className="flex items-start gap-2 mb-2">
                    {/* {newsCategory && (
                        <span className="text-xs text-[#9aa0a6] bg-[#303134] px-2 py-1 rounded">
                            {newsCategory}
                        </span>
                    )} */}
                </div>
                <h2 className="text-white text-xl font-normal mb-2 group-hover:text-[#8ab4f8] transition-colors line-clamp-3">
                    {article.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-[#9aa0a6]">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        {newsSource}
                    </span>
                    <span>•</span>
                    <span>{newsTime}</span>
                </div>
            </a>
        );
    }

    if (variant === 'small') {
        const initials = newsSource.slice(0, 1).toUpperCase();
        return (
            <div className="group flex gap-4 items-start relative pb-4 border-b border-[#3c4043] last:border-0 last:pb-0">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded bg-[#8ab4f8] flex items-center justify-center text-[10px] text-[#202124] font-bold">
                            {initials}
                        </div>
                        <span className="text-xs text-[#9aa0a6] truncate">
                            {newsSource}
                        </span>
                    </div>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        <h3 className="text-white text-sm font-normal mb-2 group-hover:text-[#8ab4f8] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                        </h3>
                    </a>
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
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block relative w-16 h-16 rounded-lg overflow-hidden bg-[#303134]">
                            <Image
                                src={newsImage}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </a>
                    )}
                    <button
                        className="text-[#9aa0a6] hover:text-white p-1 mt-auto"
                        aria-label="More"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 15h7c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm0-4h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zm9 11v2H4V8H2v12c0 1.1.9 2 2 2h12v-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#9aa0a6] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {newsSource}
                </span>
            </div>
            <h3 className="text-white text-base font-normal mb-1 group-hover:text-[#8ab4f8] transition-colors line-clamp-2">
                {article.title}
            </h3>
            <p className="text-sm text-[#9aa0a6]">{newsTime}</p>
        </a>
    );
}
