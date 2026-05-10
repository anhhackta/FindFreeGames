export function filterGames(games, mode) {
  if (!Array.isArray(games)) {
    return [];
  }

  switch (mode) {
    case "free":
      return games.filter((game) => game.finalPrice === 0);
    case "gt80":
      return games.filter((game) => game.discountPercent > 80);
    case "gt60":
      return games.filter((game) => game.discountPercent > 60);
    case "best":
      return [...games].sort((a, b) => b.discountPercent - a.discountPercent);
    default:
      return games;
  }
}
