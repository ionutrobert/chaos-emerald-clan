"use client";

import React from "react";
import { WomMember } from "../lib/wom-client";
import { getMetricIcon, getClanRoleIcon } from "../lib/icons";
import { getPlayerUrl } from "../lib/wom-urls";

interface MemberCardProps {
  member: WomMember;
  rank: number;
}

export function MemberCard({ member, rank }: MemberCardProps) {
  const rankColor =
    rank === 1
      ? "text-yellow-400"
      : rank === 2
        ? "text-gray-300"
        : rank === 3
          ? "text-orange-400"
          : "text-[#ff981f]";

  return (
    <a
      href={getPlayerUrl(member.player.displayName)}
      target="_blank"
      rel="noopener noreferrer"
      className="osrs-inner-panel flex items-center justify-between group hover:bg-[#3e3529]/40 transition-colors cursor-pointer p-4"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-6 flex items-center justify-center font-bold text-sm border border-[#ff981f]/40 bg-black/40 drop-shadow-[1px_1px_0_#000] ${rankColor}`}
        >
          #{rank}
        </div>
        <div className="flex flex-col">
          <span className="text-[#ff981f] font-bold osrs-text-shadow leading-none group-hover:text-white transition-colors drop-shadow-[1px_1px_0_#000]">
            {member.player.displayName}
          </span>
          <div className="flex items-center gap-1.5">
            {member.role && (
              <img
                src={getClanRoleIcon(member.role)}
                alt={member.role}
                className="w-3 h-3 object-contain brightness-110 drop-shadow-[0_0_2px_rgba(255,152,31,0.5)]"
              />
            )}
            <span className="text-xs text-[#a39b8b] uppercase font-bold tracking-tighter drop-shadow-[1px_1px_0_#000]">
              {member.role || "Member"}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <div className="flex items-center gap-1">
          <img
            src={getMetricIcon("overall")}
            alt="Overall"
            className="w-3 h-3 object-contain opacity-70"
          />
          <span className="text-[#38d538] text-sm font-bold leading-none drop-shadow-[1px_1px_0_#000]">
            {new Intl.NumberFormat("en-US").format(member.player?.exp || 0)}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-[#ff981f] font-bold uppercase drop-shadow-[1px_1px_0_#000]">
          Profile →
        </div>
      </div>
    </a>
  );
}
