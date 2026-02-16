import { MemberCard } from "@/components/MemberCard";
import { getGroupMembers } from "@/lib/wom-client";
import { StonePanel } from "@/components/StonePanel";
import Link from "next/link";

export const revalidate = 3600; // Cache for 1 hour

export default async function MembersPage() {
  const members = await getGroupMembers().catch(() => []);

  // Sort by XP descending
  const sortedMembers = [...members].sort(
    (a, b) => b.player.exp - a.player.exp,
  );

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col gap-6 relative pb-20 max-w-7xl mx-auto font-runescape">
      <header className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-[#4a4033] pb-6 gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="text-[#a39b8b] text-xs uppercase font-bold hover:text-[#ff981f] transition-colors flex items-center gap-2 mb-4 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl text-[#ff981f] font-bold text-shadow uppercase tracking-tight">
            Clan Roster
          </h1>
          <p className="text-[#a39b8b] text-sm uppercase tracking-widest font-bold opacity-60">
            Total Members:{" "}
            <span className="text-[#38d538]">{members.length}</span>
          </p>
        </div>

        <div className="osrs-inner-panel bg-black/40 px-6 py-2 border-[#ff981f]/20">
          <span className="text-[#ff981f] text-[10px] uppercase font-bold tracking-[0.2em]">
            Hierarchy of Chaos
          </span>
        </div>
      </header>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#1a1510] border-2 border-[#ff981f]/60 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:scale-110 hover:border-[#ff981f] transition-all group active:translate-y-1"
        title="Back to Home"
      >
        <span className="text-[#ff981f] text-2xl font-bold group-hover:-translate-x-0.5 transition-transform">
          ←
        </span>
      </Link>

      <StonePanel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedMembers.map((member, index) => (
            <MemberCard
              key={member.player.username}
              member={member}
              rank={index + 1}
            />
          ))}
        </div>
      </StonePanel>

      {members.length === 0 && (
        <div className="text-center text-[#5a5245] py-10">
          No members found. The scrolls are empty.
        </div>
      )}
    </main>
  );
}
