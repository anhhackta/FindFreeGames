# Find Free Games Website Design

## Muc tieu
Xay dung website tinh tren GitHub Pages de tong hop game mien phi va game dang sale manh, uu tien hien thi game free, giao dien giong wireframe trong `idea-uxui.png`.

## Pham vi
- Frontend tinh: HTML/CSS/JavaScript.
- Nguon du lieu:
  - Epic free games tu public API.
  - Steam deals tu file JSON tinh (`data/steam_deals.json`), duoc cap nhat boi GitHub Actions.
- Bo loc: `Free`, `Giam > 80%`, `Giam > 60%`, `Best Sale`.
- Hanh vi nut:
  - Steam: mo store.
  - Epic free: mo popup huong dan copy script claim bang F12.
  - Epic sale (neu co): mo store.

## Kien truc
- `index.html`: bo khung trang, filter controls, game grid, modal.
- `css/style.css`: bo cuc va style theo mockup (filter pill + card luoi 2 hang).
- `js/epic.js`: fetch va chuan hoa data Epic.
- `js/steam.js`: doc va chuan hoa data Steam tu JSON noi bo.
- `js/filters.js`: filter/sort game list theo tab.
- `js/main.js`: khoi tao app, merge du lieu, render card, xu ly modal.
- `scripts/scrape_steam.py`: tao danh sach deals cho Steam.
- `.github/workflows/update_steam.yml`: chay script cap nhat du lieu Steam theo lich.

## Data contract chung
Moi game duoc chuan hoa theo schema:
- `id`: string duy nhat.
- `title`: ten game.
- `image`: URL anh cover.
- `originalPrice`: chuoi gia goc.
- `finalPrice`: so gia sau giam (0 neu free).
- `discountPercent`: so phan tram giam.
- `url`: link store.
- `store`: `epic` hoac `steam`.
- `type`: `epic_free`, `epic_sale`, `steam_deal`.
- `action`: `claim` hoac `visit`.

## Luong xu ly
1. Khi load trang, `main.js` goi song song fetch Epic + Steam.
2. Chuan hoa va merge data vao 1 mang.
3. Mac dinh tab `Free`.
4. Moi lan doi tab, goi `filterGames` de loc/sap xep.
5. Render card theo ket qua:
   - Hien ten, gia goc, gia hien tai, badge store.
   - Hien nut `Nhan game` hoac `Den store`.
6. Neu game Epic free, click nut se mo modal huong dan copy script claim.

## Error handling
- Neu 1 nguon loi (Epic hoac Steam), nguon con lai van render.
- Neu ca 2 nguon loi, hien thong bao that bai va cho phep reload.
- Cac gia tri khong day du se fallback (`Dang cap nhat`, `N/A`).

## Tieu chi hoan thanh
- Website chay local bang file tinh, khong can backend.
- Giao dien nhin tuong dong mockup (top filter + 2 hang card).
- 4 tab filter hoat dong dung.
- Epic free card mo popup huong dan F12.
- Steam card mo dung link.
- Co workflow cap nhat `data/steam_deals.json`.
