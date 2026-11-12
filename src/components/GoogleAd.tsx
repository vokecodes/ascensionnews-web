"use client";

import { useEffect, useRef } from "react";

type AdFormat =
  | "auto"
  | "fluid"
  | "rectangle"
  | "vertical"
  | "horizontal"
  | "leaderboard";

interface GoogleAdProps {
  /**
   * Your AdSense ad slot ID (the numeric portion from your AdSense dashboard).
   * Falls back to a placeholder value until real slots are created.
   */
  slot?: string;
  format?: AdFormat;
  /**
   * Pass "true" to allow the ad to adjust its height automatically.
   */
  responsive?: boolean;
  className?: string;
  /**
   * Minimum height for the container while the ad loads, so there is no layout shift.
   */
  minHeight?: number;
}

declare global {
  interface Window {
    // adsbygoogle is an array that accepts any push; use unknown[] for safety
    adsbygoogle: unknown[];
  }
}

const CLIENT_ID = "ca-pub-5545303470519899";

export default function GoogleAd({
  slot = "auto", // replace with real slot IDs from your AdSense dashboard
  format = "auto",
  responsive = true,
  className = "",
  minHeight = 100,
}: GoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Guard: only initialize once per component mount
    if (initialized.current) return;
    initialized.current = true;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense push error:", err);
    }  }, []);

  return (
    <div
      className={`adsense-wrapper overflow-hidden text-center ${className}`}
      style={{ minHeight }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
