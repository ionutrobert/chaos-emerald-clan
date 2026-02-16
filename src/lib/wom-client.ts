import { notFound } from "next/navigation";

const WOM_API_URL = "https://api.wiseoldman.net/v2";
const GROUP_ID = 5855;
const USER_AGENT =
  "ChaosEmeraldClan/1.0 (+https://chaos-emerald-clan.vercel.app)";

export interface WomGroup {
  id: number;
  name: string;
  clanChat: string;
  description: string;
  homeworld: number;
  verified: boolean;
  score: number;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  memberships?: WomMember[];
}

export interface WomPlayer {
  id: number;
  username: string;
  displayName: string;
  type: string;
  build: string;
  country: string | null;
  status: string;
  exp: number;
  ehp: number;
  ehb: number;
  ttm: number;
  tt200m: number;
}

export interface WomMember {
  playerId: number;
  groupId: number;
  role: string | null;
  joinedAt: string;
  player: WomPlayer;
}

export interface WomGain {
  player: WomPlayer;
  startDate: string;
  endDate: string;
  data: {
    gained: number;
    start: number;
    end: number;
  };
}

export interface WomAchievement {
  player: WomPlayer;
  name: string;
  metric: string;
  threshold: number;
  createdAt: string;
}

export interface WomActivity {
  player: WomPlayer;
  type: string;
  role: string | null;
  score: number;
  createdAt: string;
}

export interface WomCompetition {
  id: number;
  title: string;
  metric: string;
  type: string;
  startsAt: string;
  endsAt: string;
  groupId: number;
  score: number;
  createdAt: string;
  updatedAt: string;
  participantCount: number;
}

export interface WomParticipation {
  playerId: number;
  player: WomPlayer;
  progress: {
    start: number;
    end: number;
    gained: number;
  };
}

export interface WomCompetitionDetails extends WomCompetition {
  participations: WomParticipation[];
}

async function fetchWom<T>(
  endpoint: string,
  options: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {},
): Promise<T> {
  const res = await fetch(`${WOM_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "User-Agent": USER_AGENT,
      ...options.headers,
    },
    next: { revalidate: 300, ...options.next }, // Default 5 min revalidate
  });

  if (!res.ok) {
    console.error(
      `WOM API Error: ${res.status} ${res.statusText} for ${endpoint}`,
    );
    if (res.status === 404) return notFound();
    throw new Error(`Failed to fetch WOM data: ${res.statusText}`);
  }

  return res.json();
}

export async function getGroupDetails() {
  return fetchWom<WomGroup>(`/groups/${GROUP_ID}`);
}

export async function getGroupMembers() {
  const group = await getGroupDetails();
  return group.memberships || [];
}

export async function getGroupGains(
  period: string = "week",
  metric: string = "overall",
) {
  return fetchWom<WomGain[]>(
    `/groups/${GROUP_ID}/gained?period=${period}&metric=${metric}&limit=10`,
  );
}

export async function getGroupAchievements() {
  return fetchWom<WomAchievement[]>(
    `/groups/${GROUP_ID}/achievements?limit=20`,
  );
}

export async function getGroupActivities() {
  return fetchWom<WomActivity[]>(`/groups/${GROUP_ID}/activity?limit=20`);
}

export async function getGroupCompetitions() {
  return fetchWom<WomCompetition[]>(`/groups/${GROUP_ID}/competitions`);
}

export async function getCompetitionDetails(id: number) {
  return fetchWom<WomCompetitionDetails>(`/competitions/${id}`);
}

export async function getGroupLoot(limit = 12) {
  return fetchWom<any[]>(
    `/groups/${GROUP_ID}/activity?type=loot&limit=${limit}`,
  );
}
