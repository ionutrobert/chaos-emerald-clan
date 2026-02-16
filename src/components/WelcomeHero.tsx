"use client";

import React from "react";
import { RulesModal } from "./RulesModal";
import { WomGroup } from "../lib/wom-client";

interface WelcomeHeroProps {
  group: WomGroup;
}

export function WelcomeHero({ group }: WelcomeHeroProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section className="osrs-panel p-1 relative overflow-hidden group">
      {/* Rules Modal */}
      <RulesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Gnome Child Banner Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/banner-fallback.png"
          alt="Banner"
          className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-1000 grayscale-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--osrs-stone)] via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-transparent to-transparent"></div>
      </div>

      <div className="flex flex-col items-center gap-6 py-12 md:py-16 px-6 md:px-4 relative z-10">
        {/* Central Branding */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-2 md:gap-8">
            <h2 className="text-2xl md:text-8xl font-bold text-white osrs-text-shadow tracking-tight uppercase select-none">
              CHAOS
            </h2>
            <div className="w-10 h-10 md:w-32 md:h-32 relative drop-shadow-[0_0_20px_rgba(56,213,56,0.5)] flex-shrink-0">
              <img
                src="/Emerald_detail.webp"
                alt="Chaos Emerald"
                className="w-full h-full object-contain relative z-10 animate-pulse-slow"
              />
            </div>
            <h2 className="text-2xl md:text-8xl font-bold text-white osrs-text-shadow tracking-tight uppercase select-none relative">
              EMERALD
              <span className="absolute -bottom-4 md:-bottom-8 right-0 text-[10px] md:text-2xl text-[#a39b8b] font-bold uppercase tracking-widest opacity-80 whitespace-nowrap">
                OSRS CC
              </span>
            </h2>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-6 text-[#ff981f] text-[9px] md:text-sm uppercase font-bold tracking-[0.2em] md:tracking-[0.4em] osrs-text-shadow-sm opacity-90">
            <span>{group.memberCount} Citizens</span>
            <span className="text-white/20">|</span>
            <span>World 520</span>
            <span className="text-white/20">|</span>
            <span>Est. {new Date(group.createdAt).getFullYear()}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 relative w-full max-w-6xl">
          <div className="osrs-inner-panel bg-black/80 text-[#dcdcdc] border-[#ff981f]/20 shadow-2xl p-4 md:p-6 relative max-w-2xl flex-1 backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff981f]/40 to-transparent"></div>

            <div className="flex flex-col gap-6 italic leading-relaxed">
              <p className="text-sm md:text-xl leading-tight text-white mb-2 md:mb-4 drop-shadow-md text-center md:text-left">
                "A diverse mix of players, from fresh newbies to endgame
                legends. No matter your account type or skill level, there’s a
                place for you here!"
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-1 md:mt-2 pb-2 not-italic">
                <a
                  href="https://discord.chaosemerald.cc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 md:px-8 md:py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs md:text-base text-center uppercase tracking-wider md:tracking-widest border-2 border-white/20 shadow-[0_0_15px_rgba(88,101,242,0.4)] transition-all active:translate-y-0.5"
                >
                  Join our Discord
                </a>
                <button
                  className="flex-1 px-4 py-2 md:px-8 md:py-3 bg-[#ff981f] hover:bg-[#e68a1c] text-[#1a1510] font-bold text-xs md:text-base text-center uppercase tracking-wider md:tracking-widest border-2 border-[#1a1510] shadow-[0_0_15px_rgba(255,152,31,0.4)] transition-all active:translate-y-0.5"
                  onClick={() => setIsModalOpen(true)}
                >
                  Join the CC
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:flex w-48 h-48 md:w-64 md:h-64 shrink-0 relative items-center justify-center">
            <div className="absolute inset-0 bg-[#0E0A13] blur-[100px] rounded-full animate-pulse-slow scale-[1.8]"></div>
            <img
              src="/kindpng_593687.png"
              alt="Herald"
              className="w-full h-full object-contain relative z-20 drop-shadow-[0_0_60px_#0E0A13] animate-float-slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
