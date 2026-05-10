# Find Free Games

Website tinh de tong hop game mien phi va game sale manh (Epic + Steam), toi uu cho GitHub Pages.

## Tinh nang
- 4 tab loc nhanh: `Free`, `Giam > 80%`, `Giam > 60%`, `Best Sale`.
- Card game theo wireframe: cover, ten game, gia goc, gia sau giam, nut hanh dong.
- Epic free: mo popup huong dan copy script F12.
- Steam: link truc tiep den store.

## Cau truc
- `index.html`: layout chinh
- `css/style.css`: style giao dien
- `js/main.js`: khoi tao + render + tuong tac
- `js/epic.js`: lay du lieu Epic
- `js/steam.js`: lay du lieu Steam
- `js/filters.js`: logic bo loc
- `data/steam_deals.json`: du lieu Steam
- `scripts/scrape_steam.py`: script cap nhat Steam deals
- `.github/workflows/update_steam.yml`: workflow cap nhat tu dong

## Chay local
Khuyen nghi dung 1 static server de tranh loi CORS khi fetch file JSON:

```bash
python -m http.server 5500
```

Sau do mo `http://localhost:5500`.

## Test

```bash
npm test
```

## Trien khai GitHub Pages
1. Push code len GitHub.
2. Vao Settings > Pages.
3. Chon branch `main` va root `/`.
4. Bat workflow `Update Steam Deals` de cap nhat `data/steam_deals.json` dinh ky.
