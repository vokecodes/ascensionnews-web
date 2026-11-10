"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getTopics, Topic } from "@/api/topics";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AboutPage() {
  const [categories, setCategories] = useState<Topic[]>([
    { key: "home", label: "Home", emoji: "🏡" },
  ]);
  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter();

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
    fetchTopics();
  }, []);

  const handleSearch = (query: string) => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[#202124] text-[#e8eaed]">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Hero */}
          <section className="text-center space-y-4 pb-8 border-b border-[#3c4043]">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8ab4f8] bg-[#8ab4f8]/10 px-3 py-1 rounded-full">
              About Ascension News
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Empowering Minds with Africa-Focused Intelligence
            </h1>
            <p className="text-lg text-[#9aa0a6] max-w-2xl mx-auto leading-relaxed">
              Ascension News is a digital news intelligence platform designed
              for modern African professionals, international investors, and the
              global diaspora.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Our Mission
            </h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              In an era of fragmented media and information overload, discovering
              reliable, balanced, and actionable news about Africa can be
              challenging. Ascension News was built to bridge this gap. We
              aggregate real-time reports from over 50 trusted regional outlets,
              economic journals, and technological publications across the
              African continent, synthesizing them into accessible, curated
              briefings.
            </p>
            <p className="text-[#bdc1c6] leading-relaxed">
              From the burgeoning tech corridors of Lagos and Nairobi to the
              evolving macroeconomic landscapes of Johannesburg and Cairo, our
              platform empowers readers with the context needed to make informed
              decisions in business, governance, and daily life.
            </p>
          </section>

          {/* Value Pillars */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#292a2d] p-6 rounded-xl border border-[#3c4043] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/20 text-[#8ab4f8] flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-white">Curated Verification</h3>
              <p className="text-sm text-[#9aa0a6] leading-relaxed">
                We monitor and index established, accredited news outlets to filter
                out unverified rumors and deliver credible coverage.
              </p>
            </div>

            <div className="bg-[#292a2d] p-6 rounded-xl border border-[#3c4043] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/20 text-[#8ab4f8] flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-white">Editorial Integrity</h3>
              <p className="text-sm text-[#9aa0a6] leading-relaxed">
                Full transparency with direct attribution. Original publishers
                receive clear credit, timestamps, and direct reference links.
              </p>
            </div>

            <div className="bg-[#292a2d] p-6 rounded-xl border border-[#3c4043] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8ab4f8]/20 text-[#8ab4f8] flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-white">Personalized Intelligence</h3>
              <p className="text-sm text-[#9aa0a6] leading-relaxed">
                Tailored topical feeds spanning Economy, Technology, Politics,
                Sports, and Culture to fit your regional and professional needs.
              </p>
            </div>
          </section>

          {/* Editorial Standards & Sourcing */}
          <section id="editorial" className="space-y-6 pt-6 border-t border-[#3c4043]">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Editorial Standards &amp; Sourcing Methodology
            </h2>
            <div className="space-y-4 text-[#bdc1c6] leading-relaxed">
              <p>
                Ascension News operates with a commitment to journalistic ethics,
                transparency, and reader trust. We apply strict criteria when
                selecting sources to ensure readers receive balanced coverage:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#9aa0a6]">
                <li>
                  <strong className="text-white">Reputable Sourcing:</strong> We
                  exclusively source from acknowledged news organizations,
                  official press releases, and established subject-matter experts.
                </li>
                <li>
                  <strong className="text-white">Intellectual Property &amp; Attribution:</strong>{" "}
                  We respect content creators. We provide headline digests,
                  metadata, and summaries while linking directly back to the
                  original reporting publisher for in-depth reading.
                </li>
                <li>
                  <strong className="text-white">Corrections Policy:</strong> If
                  an indexed story contains factual inaccuracies reported by the
                  primary source, or if a source issues a retraction, we promptly
                  update or remove the corresponding index entry.
                </li>
              </ul>
            </div>
          </section>

          {/* Organization & Contact */}
          <section className="bg-[#292a2d] p-8 rounded-2xl border border-[#3c4043] space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              Organization &amp; Management
            </h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              Ascension News is operated by{" "}
              <strong className="text-white">Ascension News LLC</strong>,
              headquartered in Sacramento, California, USA, with regional
              editorial and technical contributors located across West Africa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#3c4043]">
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Headquarters
                </h4>
                <p className="text-sm text-[#9aa0a6]">
                  Ascension News LLC<br />
                  Sacramento, California, United States<br />
                  Email:{" "}
                  <a
                    href="mailto:info@ascensionah.com"
                    className="text-[#8ab4f8] hover:underline"
                  >
                    info@ascensionah.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Get In Touch
                </h4>
                <p className="text-sm text-[#9aa0a6]">
                  For press inquiries, editorial partnerships, or feedback,
                  visit our{" "}
                  <Link href="/contact" className="text-[#8ab4f8] hover:underline">
                    Contact Us page
                  </Link>{" "}
                  or send us a direct message.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

