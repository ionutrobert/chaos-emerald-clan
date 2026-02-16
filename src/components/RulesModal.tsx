"use client";

import React, { useEffect, useState } from "react";
import { RulesSection } from "./RulesSection";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto osrs-panel p-1 animate-in fade-in zoom-in duration-200 shadow-[0_0_50px_rgba(0,0,0,1)]">
        <div className="relative bg-[#121212] flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#ff981f] hover:text-white transition-colors z-[110] p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ff981f] osrs-text-shadow mb-8 text-center uppercase tracking-tighter">
              Clan Decrees & Enrollment
            </h2>

            <div className="mb-12">
              <RulesSection />
            </div>

            <div className="osrs-inner-panel bg-black/60 border-[#ff981f]/30 p-8">
              <h3 className="text-2xl font-bold text-[#ff981f] uppercase mb-4 text-center">
                How to Join
              </h3>
              <div className="space-y-4 text-[#dcdcdc] text-lg italic leading-relaxed text-center">
                <p>
                  1. Join the clan{" "}
                  <span className="text-white font-bold not-italic">
                    "chaosemerald"
                  </span>{" "}
                  in-game as a guest.
                </p>
                <p>2. Ask any ranked member to recruit you into the clan.</p>
                <p>
                  3. Join our{" "}
                  <a
                    href="https://discord.chaosemerald.cc/"
                    target="_blank"
                    className="text-[#5865F2] hover:underline font-bold not-italic"
                  >
                    Discord Server
                  </a>{" "}
                  to become a full citizen and access all events.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onClose}
                className="osrs-button px-12 py-3 text-xl"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
