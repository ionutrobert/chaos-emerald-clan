import React from "react";
import { StonePanel } from "./StonePanel";

export function RulesSection() {
  const rules = [
    {
      title: "1. Respect the Terms of Service",
      content:
        "All members must follow the Old School RuneScape Terms of Service and Discord Terms of Service. No cheating, botting, real-world trading (RWT), harassment, or inappropriate content.",
    },
    {
      title: "2. Be Respectful",
      content:
        "Treat all clan members with kindness. No bullying, hate speech, discrimination, or personal attacks — whether in-game or on Discord.",
    },
    {
      title: "3. Keep Chat Clean",
      content:
        "Avoid excessive swearing, spam, or disruptive behavior. Keep conversations friendly and appropriate for all ages.",
    },
    {
      title: "4. No Drama",
      content:
        "Personal disputes should be handled privately via staff support tickets. CC and Discord are not the place for arguments, gossip, or negativity.",
    },
    {
      title: "5. No Scamming or Deception",
      content:
        "Do not scam, mislead, or manipulate other members. This includes misleading trades, lures, or impersonations. The password is chaosgemcc.",
    },
    {
      title: "6. Follow Leadership",
      content:
        "Respect decisions made by leaders and moderators. Any concerns should be raised privately and respectfully.",
    },
    {
      title: "7. Stay on Topic",
      content:
        "Use the correct Discord channels and in-game chats for their intended purpose. Off-topic chatter should stay in designated areas.",
    },
    {
      title: "8. Keep it Organized",
      content:
        "Avoid unnecessary pings or cluttering channels. Use spoiler tags, threads, and proper formatting where appropriate.",
    },
    {
      title: "9. Stay Safe",
      content:
        "Never share account details or give screen control to anyone — even staff. Report such requests immediately via ticket.",
    },
    {
      title: "10. Play Safe",
      content:
        "Loaning items is at your own risk. Ensure at least 90% of the risk is covered by collateral before proceeding.",
    },
    {
      title: "11. Alt Accounts",
      content:
        "Members may bring one alt account into the clan. Alts must follow all rules and will mirror the rank of their main account.",
    },
    {
      title: "12. Activity Requirement",
      content:
        "Members must have logged in within the last 60 days. Let staff know if you're taking a break so we can hold your spot.",
    },
    {
      title: "13. Event Participation",
      content:
        "Every member is expected to attend at least one clan event per calendar month (raids, competitions, or social events).",
    },
    {
      title: "14. No Dual Clanning",
      content:
        "To avoid scheduling conflicts and loyalty issues, dual clanning is not permitted. Please leave other clans before joining us.",
    },
  ];

  return (
    <StonePanel title="Decrees of the Emerald">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="osrs-inner-panel p-4 hover:brightness-110 transition-all"
          >
            <h4 className="text-[#ff981f] font-bold text-sm mb-1 uppercase tracking-tight osrs-text-shadow">
              {rule.title}
            </h4>
            <p className="text-[#a39b8b] text-[11px] leading-tight italic">
              {rule.content}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-2 bg-red-950/20 border border-red-500/30 text-center">
        <p className="text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
          🛡️ Violations are reported to RuneWatch and result in immediate banish
          🛡️
        </p>
      </div>
    </StonePanel>
  );
}
