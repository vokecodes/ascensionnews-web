"use client";

import Image from "next/image";

interface AdSectionProps {
    tag?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    image?: string;
    link?: string;
    className?: string;
}

export default function AdSection({
    tag = "Editorial Spotlight",
    title = "African News & Market Intelligence, Curated Daily",
    description = "Stay informed with verified reporting, macroeconomic updates, and technology briefings aggregated from over 50 trusted publications across the African continent.",
    ctaText = "About Our Mission",
    image = "/news/politics2.jpg",
    link = "/about",
    className = "",
}: AdSectionProps) {
    return (
        <section className={`relative overflow-hidden rounded-2xl group ${className}`}>
            {/* Background with Glassmorphism Overlay */}
            <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold bg-[#8ab4f8]/20 text-[#8ab4f8] border border-[#8ab4f8]/30 rounded">
                            {tag}
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                        {title}
                    </h2>

                    <p className="text-sm md:text-base text-gray-300 mb-6 line-clamp-2 md:line-clamp-none max-w-lg leading-relaxed">
                        {description}
                    </p>

                    <div>
                        <a
                            href={link}
                            className="inline-flex items-center px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-[#8ab4f8] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg"
                        >
                            {ctaText}
                            <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>
        </section>
    );
}
