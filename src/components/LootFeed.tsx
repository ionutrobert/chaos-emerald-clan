"use client";

import { WomAchievement } from "../lib/wom-client";
import { getMetricIcon } from "../lib/icons";

interface LootFeedProps {
  achievements: WomAchievement[];
}

export function LootFeed({ achievements }: LootFeedProps) {
  return (
    <div className="w-full bg-black/60 border-y border-[#4a4033] h-10 flex items-center overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap flex gap-12 px-4 absolute top-0 bottom-0 items-center">
        {achievements.map((achievement, i) => (
          <div
            key={`${achievement.player.id}-${i}`}
            className="flex items-center gap-2"
          >
            <div
              className="w-6 h-6 flex items-center justify-center bg-[#3e3529] border border-[#29221a] overflow-hidden"
              style={{ borderRadius: "0.125rem" }}
            >
              <img
                src={getMetricIcon(achievement.metric)}
                alt={achievement.metric}
                className="w-5 h-5 object-contain"
                onError={(e) => (e.currentTarget.src = "/fallback.png")}
              />
            </div>
            <div className="text-[#ff981f] text-sm font-pixel">
              <span className="text-white font-bold">
                {achievement.player.displayName}
              </span>{" "}
              achieved{" "}
              <span className="text-[#38d538]">{achievement.name}</span>
            </div>
            <div className="text-gray-500 text-xs ml-1">
              {new Date(achievement.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
