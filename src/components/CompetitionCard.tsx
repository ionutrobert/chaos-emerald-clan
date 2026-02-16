"use client";

import React from "react";
import { WomCompetition, WomCompetitionDetails } from "../lib/wom-client";
import { EmeraldProgressBar } from "./EmeraldProgressBar";
import { getMetricIcon } from "../lib/icons";
import { getCompetitionUrl } from "../lib/wom-urls";

interface CompetitionCardProps {
  competition: WomCompetition | WomCompetitionDetails;
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const [dates, setDates] = React.useState<{
    start: string;
    end: string;
    relative: string;
  } | null>(null);

  React.useEffect(() => {
    const startDate = new Date(competition.startsAt);
    const endDate = new Date(competition.endsAt);
    const now = new Date();

    let relative = "";
    if (now < startDate) {
      const diffDays = Math.ceil(
        (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      relative = `Starts in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else if (now < endDate) {
      const diffDays = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      relative = `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
    }

    setDates({
      start: startDate.toLocaleDateString(),
      end: endDate.toLocaleDateString(),
      relative,
    });
  }, [competition.startsAt, competition.endsAt]);

  const now = new Date();
  const start = new Date(competition.startsAt);
  const end = new Date(competition.endsAt);

  let status: "ongoing" | "upcoming" | "past" = "past";
  if (now < start) status = "upcoming";
  else if (now < end) status = "ongoing";

  const statusColors = {
    ongoing: "text-[#38d538] border-[#38d538]",
    upcoming: "text-[#ff981f] border-[#ff981f]",
    past: "text-gray-500 border-gray-500",
  };

  const progress =
    status === "ongoing"
      ? ((now.getTime() - start.getTime()) /
          (end.getTime() - start.getTime())) *
        100
      : status === "upcoming"
        ? 0
        : 100;

  const participations = (competition as WomCompetitionDetails).participations;

  return (
    <a
      href={getCompetitionUrl(competition.id)}
      target="_blank"
      rel="noopener noreferrer"
      className="osrs-inner-panel p-3 md:p-4 bg-black/40 border border-[#ff981f]/10 group hover:border-[#ff981f]/40 transition-all mb-1 cursor-pointer block relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff981f]/20 to-transparent"></div>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-14 h-14 bg-black/60 border border-[#ff981f]/20 p-1 flex items-center justify-center shadow-inner relative overflow-hidden">
          <img
            src={getMetricIcon(competition.metric)}
            alt={competition.metric}
            className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-[#ff981f] font-bold text-sm uppercase truncate pr-2 osrs-text-shadow-sm group-hover:text-white transition-colors">
              {competition.title}
            </h4>
            <span
              className={`text-[9px] uppercase font-bold border px-1.5 py-0.5 rounded-sm ${statusColors[status]}`}
            >
              {status}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#a39b8b] font-bold uppercase tracking-tight">
            <span>{dates?.relative || "..." || dates?.start}</span>
            <span className="text-white/60">
              {competition.participantCount} Participants
            </span>
          </div>
        </div>
      </div>

      {status === "ongoing" && (
        <div className="mt-4 pt-4 border-t border-[#ff981f]/5 space-y-3">
          {participations && participations.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {participations.slice(0, 3).map((p, i) => (
                <div key={p.playerId} className="flex flex-col items-center">
                  <span className="text-[10px] text-[#ff981f] font-bold truncate w-full text-center">
                    {i + 1}. {p.player.displayName}
                  </span>
                  <span className="text-[9px] text-[#38d538] font-mono">
                    +{new Intl.NumberFormat().format(p.progress.gained)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-1">
            <div className="flex justify-between items-end">
              <span className="text-[9px] text-[#ff981f]/60 font-bold uppercase">
                Progress
              </span>
              <span className="text-[9px] text-[#38d538] font-bold">
                {Math.floor(progress)}%
              </span>
            </div>
            <EmeraldProgressBar progress={progress} className="h-2 w-full" />
          </div>
        </div>
      )}

      {status === "upcoming" && (
        <div className="mt-4 pt-4 border-t border-[#ff981f]/5 text-center">
          <p className="text-[10px] text-[#a39b8b] italic">
            Competition begins on {dates?.start}
          </p>
        </div>
      )}

      <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[#ff981f] text-[9px] font-bold uppercase tracking-widest">
          View Standing on Wise Old Man →
        </span>
      </div>
    </a>
  );
}
