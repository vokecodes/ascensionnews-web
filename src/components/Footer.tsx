import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#18191b] border-t border-[#3c4043] text-[#9aa0a6] text-sm mt-16">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-medium text-white hover:text-[#8ab4f8] transition-colors">
                Ascension News
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#9aa0a6]">
              Ascension News is a digital news intelligence platform dedicated to
              delivering curated briefings, breaking updates, and in-depth
              coverage across Africa and global markets for professionals,
              investors, and citizens.
            </p>
            <div className="pt-2 text-xs text-[#5f6368]">
              Sacramento, California, USA &amp; Lagos, Nigeria
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Top Stories &amp; Briefing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Nigeria &amp; West Africa
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Business &amp; Economy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Technology &amp; Innovation
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Finance &amp; Markets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Editorial */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company &amp; Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Ascension News
                </Link>
              </li>
              <li>
                <Link href="/about#editorial" className="hover:text-white transition-colors">
                  Editorial Standards &amp; Sourcing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Feedback &amp; Corrections
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@ascensionah.com"
                  className="hover:text-white transition-colors"
                >
                  info@ascensionah.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal &amp; Transparency
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#cookies" className="hover:text-white transition-colors">
                  Cookie &amp; Advertising Policies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/account/delete" className="hover:text-white transition-colors">
                  Account Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer on Curation & Source Attribution */}
        <div className="pt-8 border-t border-[#292a2d] space-y-4">
          <p className="text-[11px] leading-relaxed text-[#5f6368]">
            <strong className="text-[#8ab4f8]">Publisher Disclaimer:</strong>{" "}
            Ascension News curates, indexes, and attributes news and commentary
            from reputable regional and international publications. All article
            trademarks, headlines, and copyright belong exclusively to their
            original content creators and licensed publishers. Where external
            links are provided, readers are directed to the primary source
            article.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#5f6368] gap-4">
            <p>&copy; {currentYear} Ascension News LLC. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-[#9aa0a6] transition-colors">
                About
              </Link>
              <Link href="/privacy-policy" className="hover:text-[#9aa0a6] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#9aa0a6] transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-[#9aa0a6] transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

