"use client";

import React, { useEffect, useState } from "react";
import { StonePanel } from "./StonePanel";
import { getMetricIcon } from "../lib/icons";
import { WomAchievement } from "../lib/wom-client";
import { getPlayerUrl } from "../lib/wom-urls";

interface LatestCollectionsProps {
  achievements: WomAchievement[];
}

export function LatestCollections({ achievements }: LatestCollectionsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <StonePanel title="Recent Achievements">
      <div className="flex flex-col gap-4 p-1">
        {achievements && achievements.length > 0 ? (
          achievements.slice(0, 6).map((achievement, i) => (
            <a
              key={`${achievement.player.id}-${achievement.metric}-${i}`}
              href={getPlayerUrl(
                achievement.player.displayName,
                "achievements",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="osrs-inner-panel flex items-center gap-3 p-4 transition-colors group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={getMetricIcon(achievement.metric || "overall")}
                  alt={achievement.metric}
                  className="w-8 h-8 object-contain relative z-10 drop-shadow-[0_0_5px_rgba(255,152,31,0.3)]"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[#ff981f] font-bold text-sm truncate uppercase tracking-tighter">
                  {achievement.player.displayName}
                </span>
                <span className="text-[#a39b8b] text-[10px] font-bold uppercase truncate leading-none opacity-60">
                  {achievement.name}
                </span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-[#ff981f] font-bold uppercase">
                View →
              </div>
            </a>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-[#a39b8b] text-[10px] uppercase font-bold tracking-widest opacity-40 italic">
              Awaiting achievements...
            </p>
          </div>
        )}
      </div>
    </StonePanel>
  );
}
