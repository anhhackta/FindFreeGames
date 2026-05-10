import json
import re
from pathlib import Path

import requests
from bs4 import BeautifulSoup

STEAM_SPECIALS_URL = "https://store.steampowered.com/search/?specials=1"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "data" / "steam_deals.json"


def parse_price_to_float(raw_text: str) -> float:
    cleaned = re.sub(r"[^0-9.,]", "", raw_text).replace(",", "")
    if not cleaned:
        return 0.0
    try:
        return float(cleaned)
    except ValueError:
        return 0.0


def scrape_steam_deals(limit: int = 30):
    response = requests.get(STEAM_SPECIALS_URL, timeout=30)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    rows = soup.select("a.search_result_row")[:limit]
    deals = []
    for index, row in enumerate(rows):
        title = row.select_one(".title")
        image = row.select_one(".search_capsule img")
        discount = row.select_one(".search_discount span")
        original = row.select_one(".search_price strike")
        final_price = row.select_one(".search_price")
        href = row.get("href", "").split("?")[0]

        discount_percent = 0
        if discount and discount.text:
            discount_percent = int(re.sub(r"[^0-9]", "", discount.text) or "0")

        final_price_text = final_price.text.strip() if final_price else ""
        final_price_value = 0.0 if "Free" in final_price_text else parse_price_to_float(final_price_text)

        deals.append(
            {
                "id": f"steam-{index}",
                "title": title.text.strip() if title else "Dang cap nhat",
                "image": image.get("src", "") if image else "",
                "original_price": original.text.strip() if original else "N/A",
                "final_price": final_price_value,
                "discount_percent": discount_percent,
                "url": href,
            }
        )

    return deals


def main():
    try:
        deals = scrape_steam_deals()
    except Exception:
        deals = []

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(deals, indent=2), encoding="utf-8")
    print(f"Saved {len(deals)} steam deals to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
