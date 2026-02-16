export function getPlayerUrl(
  displayName: string,
  type: "overview" | "achievements" | "competitions" = "overview",
) {
  const encodedName = encodeURIComponent(displayName.toLowerCase());
  const baseUrl = `https://wiseoldman.net/players/${encodedName}`;

  if (type === "overview") return baseUrl;
  return `${baseUrl}/${type}`;
}

export function getCompetitionUrl(id: number) {
  return `https://wiseoldman.net/competitions/${id}`;
}
