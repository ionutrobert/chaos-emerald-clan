import {
  getGroupDetails,
  getGroupGains,
  getGroupAchievements,
  getGroupMembers,
  getGroupCompetitions,
  getCompetitionDetails,
  WomGroup,
  WomGain,
  WomAchievement,
  WomMember,
  WomCompetition,
} from "@/lib/wom-client";
import { StonePanel } from "@/components/StonePanel";
import { MemberCard } from "@/components/MemberCard";
import { EmeraldProgressBar } from "@/components/EmeraldProgressBar";
import { WelcomeHero } from "@/components/WelcomeHero";
import { CompetitionCard } from "@/components/CompetitionCard";
import { LatestCollections } from "@/components/LatestCollections";
import { getPlayerUrl } from "@/lib/wom-urls";
import { getMetricIcon, getClanRoleIcon } from "@/lib/icons";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [group, gains, achievements, members, competitions] =
    (await Promise.all([
      getGroupDetails(),
      getGroupGains("week", "overall"),
      getGroupAchievements(),
      getGroupMembers(),
      getGroupCompetitions(),
    ])) as [
      WomGroup,
      WomGain[],
      WomAchievement[],
      WomMember[],
      WomCompetition[],
    ];

  const ongoingBasic = competitions
    .filter(
      (c) =>
        new Date(c.endsAt) > new Date() && new Date(c.startsAt) <= new Date(),
    )
    .slice(0, 4);

  // Fetch detailed standings for ongoing competitions
  const ongoingCompetitions = await Promise.all(
    ongoingBasic.map(async (c) => {
      try {
        return await getCompetitionDetails(c.id);
      } catch (e) {
        return c;
      }
    }),
  );

  const upcomingCompetitions = competitions
    .filter((c) => new Date(c.startsAt) > new Date())
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
    .slice(0, 4);

  const topMembers = members
    .sort((a, b) => (b.player?.exp || 0) - (a.player?.exp || 0))
    .slice(0, 10);

  return (
    <main className="min-h-screen p-2 md:p-12 flex flex-col gap-6 md:gap-12 relative max-w-7xl mx-auto">
      {/* Hero Welcome Segment */}
      <WelcomeHero group={group} />

      {/* Full Width Events Rows */}
      <div className="flex flex-col gap-6 md:gap-12 relative z-10">
        {ongoingCompetitions.length > 0 && (
          <StonePanel title="Active Events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoingCompetitions.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          </StonePanel>
        )}

        {upcomingCompetitions.length > 0 && (
          <StonePanel title="Upcoming Events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingCompetitions.map((comp) => (
                <CompetitionCard key={comp.id} competition={comp} />
              ))}
            </div>
          </StonePanel>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column (Main Stat Panels) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <StonePanel title="Top Gainers (Week)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {gains.slice(0, 6).map((gain, i) => {
                const rank = i + 1;
                const rankColor =
                  rank === 1
                    ? "text-yellow-400"
                    : rank === 2
                      ? "text-gray-300"
                      : rank === 3
                        ? "text-orange-400"
                        : "text-[#ff981f]";
                const member = members.find(
                  (m) => m.player.username === gain.player.username,
                );
                return (
                  <a
                    key={gain.player.id}
                    href={getPlayerUrl(gain.player.displayName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="osrs-inner-panel flex items-center justify-between group hover:brightness-110 transition-all p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-6 flex items-center justify-center font-bold text-sm border border-[#ff981f]/40 bg-black/40 drop-shadow-[1px_1px_0_#000] ${rankColor}`}
                      >
                        #{rank}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#ff981f] font-bold osrs-text-shadow leading-none group-hover:text-white transition-colors drop-shadow-[1px_1px_0_#000]">
                          {gain.player.displayName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {member?.role && (
                            <img
                              src={getClanRoleIcon(member.role)}
                              alt={member.role}
                              className="w-3 h-3 object-contain brightness-110 drop-shadow-[0_0_2px_rgba(255,152,31,0.5)]"
                            />
                          )}
                          <span className="text-xs text-[#a39b8b] uppercase font-bold tracking-tighter drop-shadow-[1px_1px_0_#000]">
                            {member?.role || "Citizen"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={getMetricIcon("overall")}
                          alt="XP"
                          className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                        <span className="text-[#38d538] text-sm font-bold font-mono leading-none drop-shadow-[1px_1px_0_#000]">
                          +
                          {new Intl.NumberFormat("en-US").format(
                            gain.data.gained,
                          )}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] text-[#ff981f] font-bold uppercase text-right drop-shadow-[1px_1px_0_#000]">
                        View Profile →
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </StonePanel>

          <StonePanel title="Elite Citizens">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {topMembers.slice(0, 10).map((member, i) => (
                <MemberCard
                  key={member.player.id}
                  member={member}
                  rank={i + 1}
                />
              ))}
            </div>
            <a
              href="/members"
              className="mt-6 block text-center py-3 border border-[#ff981f]/20 bg-[#ff981f]/5 text-[#ff981f] text-[10px] uppercase hover:bg-[#ff981f]/10 hover:border-[#ff981f]/40 transition-all font-bold tracking-[0.2em]"
            >
              Examine Full Roster →
            </a>
          </StonePanel>
        </div>

        {/* Right Column (Achievements & Feed) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <LatestCollections achievements={achievements} />

          <div className="osrs-panel p-6 bg-black/40 flex flex-col items-center gap-4 text-center">
            <h3 className="text-[#ff981f] font-bold uppercase tracking-widest text-sm">
              Join the Community
            </h3>
            <p className="text-[#a39b8b] text-xs italic">
              "From fresh newbies to endgame legends, there's a place for you."
            </p>
            <a
              href="https://discord.chaosemerald.cc/"
              target="_blank"
              className="w-full py-3 bg-[#5865F2] text-white font-bold uppercase text-[10px] tracking-[0.2em] border border-white/10 hover:brightness-110 transition-all"
            >
              Discord Server
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center border-t border-white/5 pt-12 pb-24 relative z-10">
        <div className="text-[#a39b8b] text-[10px] uppercase tracking-[0.3em] font-bold flex flex-col gap-4">
          <p>
            © {new Date().getFullYear()} Chaos Emerald • All Rights Reserved
          </p>
          <div className="flex justify-center gap-6 opacity-40">
            <a
              href="https://discord.chaosemerald.cc/"
              className="hover:text-white transition-colors"
            >
              Discord
            </a>
            <span>•</span>
            <a
              href="https://wiseoldman.net/groups/5855"
              className="hover:text-white transition-colors"
            >
              WOM API
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
