"use client";

import Image from "next/image";

interface AdSectionProps {
    title?: string;
    description?: string;
    ctaText?: string;
    image?: string;
    link?: string;
    className?: string;
}

export default function AdSection({
    title = "Timeless Elegance & Precision",
    description = "Experience the pinnacle of craftsmanship with the new Aurum & Co. collection. A legacy carved in 18k gold.",
    ctaText = "Discover the Collection",
    image = "/ads/luxury_watch.png",
    link = "#",
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                {/* Content Container */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-[#8ab4f8]/20 text-[#8ab4f8] border border-[#8ab4f8]/30 rounded">
                            Sponsored
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {title}
                    </h2>

                    <p className="text-lg text-gray-300 mb-8 line-clamp-2 md:line-clamp-none max-w-lg">
                        {description}
                    </p>

                    <div>
                        <a
                            href={link}
                            className="inline-flex items-center px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-[#8ab4f8] hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                        >
                            {ctaText}
                            <svg
                                className="ml-2 w-5 h-5"
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
