function normalizeSteamGame(game, index) {
  return {
    id: game.id ?? `steam-${index}`,
    title: game.title ?? "Dang cap nhat",
    image: game.image ?? "",
    originalPrice: game.original_price ?? "N/A",
    finalPrice: Number(game.final_price ?? 0),
    discountPercent: Number(game.discount_percent ?? 0),
    url: game.url ?? "https://store.steampowered.com",
    store: "steam",
    type: "steam_deal",
    action: "visit",
    claimScript: "",
  };
}

export async function loadSteamGames() {
  const response = await fetch("./data/steam_deals.json");
  if (!response.ok) {
    throw new Error(`Steam data loi: ${response.status}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload)) {
    return [];
  }
  return payload.map(normalizeSteamGame);
}
