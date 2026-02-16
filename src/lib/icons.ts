export function getMetricIcon(metric: string): string {
  if (!metric) return "https://oldschool.runescape.wiki/images/Stats_icon.png";

  const cleanMetric = metric.toLowerCase().trim();

  // Special case for overall/stats
  if (
    cleanMetric === "overall" ||
    cleanMetric === "total" ||
    cleanMetric === "stats"
  ) {
    return "https://oldschool.runescape.wiki/images/Stats_icon.png";
  }

  const commonSkills = [
    "attack",
    "defence",
    "strength",
    "hitpoints",
    "ranged",
    "prayer",
    "magic",
    "cooking",
    "woodcutting",
    "fletching",
    "fishing",
    "firemaking",
    "crafting",
    "smithing",
    "mining",
    "herblore",
    "agility",
    "thieving",
    "slayer",
    "farming",
    "runecraft",
    "hunter",
    "construction",
  ];

  if (commonSkills.includes(cleanMetric)) {
    const skillName =
      cleanMetric.charAt(0).toUpperCase() + cleanMetric.slice(1);
    return `https://oldschool.runescape.wiki/images/${skillName}_icon.png`;
  }

  const wikiName = cleanMetric
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");

  return `https://oldschool.runescape.wiki/images/${wikiName}.png`;
}

/**
 * Fetches Clan Rank icons from OSRS Wiki
 * @param role The role name from Wise Old Man
 */
export function getClanRoleIcon(role: string): string {
  if (!role) return "";

  const cleanRole = role.toLowerCase().replace(/_/g, " ").trim();

  // Extended map for OSRS and WOM roles
  const roleMap: Record<string, string> = {
    owner: "Owner",
    "deputy owner": "Deputy_Owner",
    leader: "Owner",
    general: "General",
    captain: "Captain",
    lieutenant: "Lieutenant",
    sergeant: "Sergeant",
    corporal: "Corporal",
    recruit: "Recruit",
    member: "Member",
    "red topaz": "Red_Topaz",
    red_topaz: "Red_Topaz",
    emerald: "Emerald",
    ruby: "Ruby",
    diamond: "Diamond",
    dragonstone: "Dragonstone",
    onyx: "Onyx",
    zenyte: "Zenyte",
  };

  const wikiRank =
    roleMap[cleanRole] ||
    cleanRole
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("_");

  return `https://oldschool.runescape.wiki/images/Clan_icon_-_${wikiRank}.png`;
}

/**
 * Fetches item icons from the RuneLite static cache using item IDs.
 * @param itemId The OSRS Item ID (from RuneLite/OSRS Wiki)
 */
export function getItemIcon(itemId: number | string): string {
  if (!itemId) return "/fallback.png";
  return `https://static.runelite.net/cache/item/icon/${itemId}.png`;
}
