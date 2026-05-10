# Find Free Games - Trạng thái triển khai

## Đã hoàn thành
- Dựng website tĩnh với giao diện theo wireframe.
- Có 4 filter: `Free`, `Giam > 80%`, `Giam > 60%`, `Best Sale`.
- Render card game gồm ảnh, tên game, giá gốc, giá hiện tại, nút hành động.
- Tách nguồn dữ liệu:
  - Epic từ API public.
  - Steam từ `data/steam_deals.json`.
- Epic free mở popup hướng dẫn copy script F12.
- Thêm script Python + GitHub Actions để cập nhật Steam deals tự động.

## File chính
- `index.html`
- `css/style.css`
- `js/main.js`
- `js/epic.js`
- `js/steam.js`
- `js/filters.js`
- `data/steam_deals.json`
- `scripts/scrape_steam.py`
- `.github/workflows/update_steam.yml`

## Ghi chú
- Dự án hiện chạy hoàn toàn frontend tĩnh, phù hợp GitHub Pages.
- Có thể mở rộng thêm badge số lượng game theo từng tab hoặc nút "Claim tất cả Epic free".

