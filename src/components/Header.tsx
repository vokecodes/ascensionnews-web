"use client";

import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { Topic } from "@/api/topics";
import { AuthUser } from "@/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Topic[];
  onSearch: (query: string) => void;
}

export default function Header({
  activeCategory,
  setActiveCategory,
  categories,
  onSearch,
}: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const hydrate = useAuthStore((state) => state.hydrateFromStorage);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const openModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    clearAuth();
    setShowUserMenu(false);
  };

  const getInitials = (currentUser: AuthUser) => {
    const first = currentUser.firstName?.[0] || "";
    const last = currentUser.lastName?.[0] || "";
    return (
      `${first}${last}`.toUpperCase() ||
      currentUser.email?.[0]?.toUpperCase() ||
      "U"
    );
  };

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#202124] border-b border-[#3c4043]">
      {/* Mobile Top Bar */}
      <div className="px-4 py-3 flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between gap-4 relative">
          <h1 className="text-white text-xl font-normal whitespace-nowrap">
            Ascension News
          </h1>

          <div className="flex items-center gap-3 relative">
            {user ? (
              <>
                <button
                  onClick={() => {
                    if (user) {
                      setShowUserMenu((prev) => !prev);
                    } else {
                      openModal("login");
                    }
                  }}
                  className="text-[#9aa0a6] hover:text-white transition-colors"
                  aria-label={user ? "Open user menu" : "Open login modal"}
                >
                  {user ? (
                    <div className="w-9 h-9 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center font-semibold">
                      {getInitials(user)}
                    </div>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                    </svg>
                  )}
                </button>

                <button className="text-[#9aa0a6] hover:text-white transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal("login")}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-[#3c4043] text-white hover:border-[#8ab4f8] hover:text-[#8ab4f8] transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => openModal("signup")}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[#8ab4f8] text-[#202124] font-semibold hover:bg-[#9cc0ff] transition-colors"
                >
                  Sign up
                </button>
              </>
            )}

            {user && showUserMenu && (
              <div className="absolute right-0 top-12 w-64 rounded-xl bg-[#1f2023] border border-[#3c4043] shadow-2xl p-4 space-y-2">
                <div>
                  <p className="text-white font-medium">
                    {`${user.firstName} ${user.lastName}`.trim()}
                  </p>
                  <p className="text-sm text-[#9aa0a6]">{user.email}</p>
                </div>
                {user.location && (
                  <p className="text-xs text-[#9aa0a6]">
                    {user.location.city ? `${user.location.city}, ` : ""}
                    {user.location.country || ""}
                  </p>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-[#303134] text-white py-2 rounded-lg hover:bg-[#3c4043] transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        <form className="relative w-full" onSubmit={submitSearch}>
          <input
            type="text"
            placeholder="Search for topics, locations & sources"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-[#303134] text-white placeholder-[#9aa0a6] px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa0a6] hover:text-white"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Desktop Top Bar (original layout) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3 gap-6">
        <h1 className="text-white text-xl font-normal whitespace-nowrap">
          Ascension News
        </h1>

        <form className="mt-0 relative flex-1 max-w-3xl" onSubmit={submitSearch}>
          <input
            type="text"
            placeholder="Search for topics, locations & sources"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-[#303134] text-white placeholder-[#9aa0a6] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa0a6] hover:text-white"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        <div className="flex items-center gap-4 relative">
          {user ? (
            <>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="text-[#9aa0a6] hover:text-white transition-colors"
                aria-label="Open user menu"
              >
                <div className="w-9 h-9 rounded-full bg-[#8ab4f8] text-[#202124] flex items-center justify-center font-semibold">
                  {getInitials(user)}
                </div>
              </button>
              <button className="text-[#9aa0a6] hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal("login")}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[#3c4043] text-white hover:border-[#8ab4f8] hover:text-[#8ab4f8] transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => openModal("signup")}
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#8ab4f8] text-[#202124] font-semibold hover:bg-[#9cc0ff] transition-colors"
              >
                Sign up
              </button>
            </>
          )}

          {user && showUserMenu && (
            <div className="absolute right-0 top-12 w-64 rounded-xl bg-[#1f2023] border border-[#3c4043] shadow-2xl p-4 space-y-2">
              <div>
                <p className="text-white font-medium">
                  {`${user.firstName} ${user.lastName}`.trim()}
                </p>
                <p className="text-sm text-[#9aa0a6]">{user.email}</p>
              </div>
              {user.location && (
                <p className="text-xs text-[#9aa0a6]">
                  {user.location.city ? `${user.location.city}, ` : ""}
                  {user.location.country || ""}
                </p>
              )}
              <button
                onClick={handleLogout}
                className="w-full mt-2 bg-[#303134] text-white py-2 rounded-lg hover:bg-[#3c4043] transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1 px-6 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.label)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeCategory === category.label
                ? "text-[#8ab4f8] border-b-2 border-[#8ab4f8]"
                : "text-[#e8eaed] hover:text-white"
            }`}
          >
            {category.emoji && <span>{category.emoji}</span>}
            {category.label}
          </button>
        ))}
      </nav>
      {showAuthModal && (
        <AuthModal
          key={authMode}
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </header>
  );
}
