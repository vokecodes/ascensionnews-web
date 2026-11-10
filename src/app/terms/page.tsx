"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { getTopics, Topic } from "@/api/topics";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TermsOfServicePage() {
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
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h1 className="text-4xl font-bold text-white mb-2">TERMS OF SERVICE</h1>
            <p className="text-[#9aa0a6]">Last updated: March 1, 2026</p>
          </section>

          <section className="space-y-4">
            <p className="text-[#bdc1c6] leading-relaxed">
              Welcome to Ascension News. These Terms of Service (&quot;Terms&quot;)
              govern your access to and use of the website located at{" "}
              <a
                href="https://ascensionnewsapp.com"
                className="text-[#8ab4f8] hover:underline"
              >
                https://ascensionnewsapp.com
              </a>
              , our mobile applications, and any related services (collectively,
              the &quot;Services&quot;), operated by Ascension News LLC (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p className="text-[#bdc1c6] leading-relaxed">
              By accessing or using our Services, you agree to be bound by these
              Terms. If you do not agree with any part of these Terms, you must
              discontinue use of our Services immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Nature of the Services</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              Ascension News is an automated and curated news aggregation and
              intelligence platform. We aggregate headlines, summaries, and
              metadata from authorized and public news sources, feeds, and
              publications across Africa and globally. We provide indexing,
              categorization, and search tools to assist users in discovering
              relevant news stories.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              2. Third-Party Content &amp; Copyright Attribution
            </h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              Ascension News does not claim ownership of the news stories,
              articles, photography, or multimedia content produced by third-party
              publishers. All copyrights, trademarks, and intellectual property
              rights in third-party content belong solely to their respective
              owners.
            </p>
            <p className="text-[#bdc1c6] leading-relaxed">
              We provide snippets, headlines, and links to original reporting under
              fair use and standard internet referencing practices. When you click
              on a news article link, you are directed to the third-party
              publisher&apos;s external website or service. We encourage our readers
              to read full articles directly on the original publisher&apos;s site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. User Accounts</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              To access personalized features (such as saved topics, briefing
              preferences, and notifications), you may create an account. You
              agree to provide accurate and complete registration information and
              to keep your password confidential. You are solely responsible for
              all activities that occur under your account. You may request account
              deletion at any time via our{" "}
              <Link href="/account/delete" className="text-[#8ab4f8] hover:underline">
                Account Deletion page
              </Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Acceptable Use</h2>
            <p className="text-[#bdc1c6] leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#9aa0a6]">
              <li>
                Use the Services for any unlawful purpose or in violation of any
                applicable regional, national, or international regulations.
              </li>
              <li>
                Attempt to interfere with, disrupt, or compromise the integrity or
                security of our platform or servers.
              </li>
              <li>
                Deploy automated scripts, bots, scrapers, or spiders to overload
                or disrupt the operation of the Services without express written
                consent.
              </li>
              <li>
                Circumvent, disable, or tamper with security or authentication
                mechanisms.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              5. Advertising &amp; Commercial Partnerships
            </h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              Our Services may display advertisements served by third-party ad
              networks, including Google AdSense. These advertisements help
              support our platform and keep our services accessible. Third-party
              advertisers may use cookies, web beacons, and similar technologies
              in accordance with our{" "}
              <Link href="/privacy-policy" className="text-[#8ab4f8] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. External Links Disclaimer</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              The Services contain links to external third-party websites that are
              not owned or controlled by Ascension News LLC. We have no control
              over, and assume no responsibility for, the content, privacy
              policies, accuracy, or practices of any third-party websites or
              services. Accessing any third-party site is done at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Disclaimer of Warranties</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE INFORMATION PROVIDED
              IS ACCURATE, COMPLETE, OR UNINTERRUPTED.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Limitation of Liability</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ASCENSION NEWS
              LLC AND ITS DIRECTORS, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS
              TO OR USE OF THE SERVICES.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Changes to Terms</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              We reserve the right to revise or modify these Terms at any time.
              Any changes will be posted on this page with an updated &quot;Last
              updated&quot; date. Continued use of the Services after such changes
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-[#3c4043]">
            <h2 className="text-2xl font-semibold text-white">10. Contact Us</h2>
            <p className="text-[#bdc1c6] leading-relaxed">
              If you have any questions or feedback concerning these Terms of
              Service, please contact us at:
            </p>
            <p className="text-sm text-[#9aa0a6]">
              Ascension News LLC<br />
              Sacramento, California, USA<br />
              Email:{" "}
              <a
                href="mailto:info@ascensionah.com"
                className="text-[#8ab4f8] hover:underline"
              >
                info@ascensionah.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

