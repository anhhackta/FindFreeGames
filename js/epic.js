const EPIC_ENDPOINTS = [
  "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=vi&country=VN&allowCountries=VN",
  "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US",
];

function isCurrentPromotion(promotion) {
  if (!promotion?.startDate || !promotion?.endDate) {
    return false;
  }

  const now = new Date();
  const start = new Date(promotion.startDate);
  const end = new Date(promotion.endDate);
  return start <= now && now <= end;
}

function pickEpicImage(images = []) {
  const preferred = images.find((item) => item.type === "DieselStoreFrontWide");
  if (preferred?.url) {
    return preferred.url;
  }
  return images[0]?.url ?? "";
}

function normalizeEpicGame(game) {
  const priceInfo = game?.price?.totalPrice;
  const discountPrice = priceInfo?.discountPrice ?? 0;
  const originalPriceText = priceInfo?.fmtPrice?.originalPrice ?? "N/A";
  const slug = game?.catalogNs?.mappings?.[0]?.pageSlug ?? "";
  const fallbackSlug = game?.productSlug ?? "";
  const page = slug || fallbackSlug;
  const promotions = game?.promotions?.promotionalOffers?.[0]?.promotionalOffers ?? [];
  const hasActiveFreeOffer = promotions.some((item) => isCurrentPromotion(item));
  const isFree = discountPrice === 0 && hasActiveFreeOffer;

  return {
    id: `epic-${game.id}`,
    title: game.title ?? "Dang cap nhat",
    image: pickEpicImage(game.keyImages),
    originalPrice: originalPriceText,
    finalPrice: discountPrice,
    discountPercent: isFree ? 100 : priceInfo?.lineOffers?.[0]?.appliedRules?.[0]?.discountSetting?.discountPercentage ?? 0,
    url: page ? `https://store.epicgames.com/en-US/p/${page}` : "https://store.epicgames.com",
    store: "epic",
    type: isFree ? "epic_free" : "epic_sale",
    action: isFree ? "claim" : "visit",
    claimScript: isFree
      ? [
          "/* Epic free game helper */",
          `window.open("${page ? `https://store.epicgames.com/en-US/p/${page}` : "https://store.epicgames.com"}", "_blank");`,
          'console.log("Da mo trang game, ban bam nut Get trong Epic de nhan game.");',
        ].join("\n")
      : "",
  };
}

export async function loadEpicGames() {
  let payload;
  let lastError;

  for (const endpoint of EPIC_ENDPOINTS) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        lastError = new Error(`Epic API loi: ${response.status}`);
        continue;
      }
      payload = await response.json();
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!payload) {
    throw lastError ?? new Error("Khong the ket noi Epic API");
  }

  const elements = payload?.data?.Catalog?.searchStore?.elements ?? [];
  return elements
    .map(normalizeEpicGame)
    .filter((item) => item.type === "epic_free" || item.type === "epic_sale");
}
