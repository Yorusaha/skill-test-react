# CLAUDE.md — skill-test-joyleap

Panduan ini dibaca oleh Claude Code di setiap sesi. Ikuti semua instruksi di sini tanpa perlu diminta ulang.

---

## Project Overview

**Premium Gaming Store** — e-commerce game digital bergaya PS Store.  
Monorepo dengan tiga subproject independen:

| Folder | Stack | Status |
|---|---|---|
| `frontend-react/` | React 19 + Tailwind CDN | UI utama (aktif dikembangkan) |

---

## Architecture

### Frontend React (`frontend-react/`)

```
src/
  App.js                  ← Root component + semua halaman home (HomePage, HeroCarousel)
  index.js                ← Entry point, import custom.css
  components/
    Sidebar.jsx           ← Nav kiri: Home, Categories, My Library, My Bag
    Header.jsx            ← Top bar: search, wishlist badge, cart badge, avatar
  pages/
    Bag.jsx               ← Halaman cart (cartItems list + checkout total)
    Wishlist.jsx          ← Halaman wishlist (grid cards)
    Categories.jsx        ← Semua 8 game dalam grid 4 kolom
  context/
    CartContext.js        ← Global state: cartItems, wishlistItems, addToCart,
                            removeFromCart, updateQty, toggleWishlist,
                            cartCount, cartTotal
  data/
    gamesData.js          ← Array 8 game: id, title, genre, price, discount,
                            rating, image (Steam CDN), trailer
  styles/
    custom.css            ← Scrollbar hide, .hero-gradient, .smooth-shadow,
                            .hover-pop, .material-symbols-outlined
public/
  index.html              ← Tailwind CDN config (JANGAN edit sembarangan),
                            Material Symbols + Nunito Sans CDN
```

### Routing (tidak pakai React Router)
Routing manual via `useState('home')` di `AppContent`. Switch di `renderPage()`:
- `'home'` → `<HomePage />`
- `'bag'` → `<Bag />`
- `'wishlist'` → `<Wishlist />`
- `'categories'` → `<Categories />`
- `'library'` → Coming soon placeholder

### State Management
Semua state cart/wishlist ada di `CartContext.js`. Gunakan hook `useCart()` di komponen manapun. Jangan buat state cart lokal di komponen — selalu pakai context.

---

## Design System

### Warna Utama (dari Tailwind config di `public/index.html`)
```
primary:         #b61722   (merah — tombol utama, badge, aktif)
background:      #fff8f7   (krem terang — bg seluruh app)
on-background:   #271816   (hitam kecoklatan — teks utama)
surface:         #fff8f7
surface-container-lowest: #ffffff  (bg card)
on-surface-variant: #5b403e        (teks sekunder/abu)
```

### Font
**Nunito Sans** — diload via Google Fonts CDN. Semua class font (`font-body-md`, `font-headline-sm`, dll.) mengarah ke Nunito Sans.

### Icons
**Material Symbols Outlined** — Google CDN. Gunakan `<span className="material-symbols-outlined">icon_name</span>`. Untuk filled: tambahkan class `fill`.

### Genre Colors (genreStyles di App.js)
```js
Action     → red-500    | RPG      → purple-500
Strategy   → blue-500   | Racing   → orange-500
Platformer → green-500  | Fighting → yellow-400
```

---

## Layout Rules (PENTING — jangan ubah tanpa alasan)

App menggunakan **full viewport fixed layout** — tidak ada scroll di level page.

```
AppContent (height:100vh, overflow:hidden, display:flex)
  Sidebar (width:240px, fixed kiri)
  main (flex:1, marginLeft:240px, height:100vh, overflow:hidden, flex-col)
    Header (flexShrink:0)
    content div (flex:1, overflow:hidden, padding:16px 32px, gap:16px, flex-col)
      HeroCarousel (height:calc(100vh - 520px), min:220px, max:440px)
      section (flexShrink:0)
        section header + cards grid
```

**Aturan penting:**
- Jangan tambah `overflow:scroll` di level app/main
- Jangan hapus `height:100vh` dari AppContent atau main
- Cards grid di HomePage: `repeat(4,1fr)`, 4 game pertama saja (`slice(0,4)`)
- Card height: natural (tidak dipaksa 100%), `alignContent:'start'` di grid

---

## Dev Commands

```bash
# Frontend React (PORT 3000)
cd frontend-react
npm start          # dev server dengan HMR
npm run build      # production build
```

---

## Code Conventions

### React
- Gunakan functional components + hooks saja (tidak ada class component)
- Inline styles untuk layout-kritis (spacing, flex, height) — Tailwind classes untuk warna, typography, hover
- Jangan gunakan React Router — routing manual via `setActivePage`
- Jangan install library tambahan tanpa konfirmasi

### Styling
- **Tailwind CDN** (bukan CLI) di frontend-react — tidak ada build step untuk CSS
- Class Tailwind langsung di JSX, inline style untuk nilai dinamis/kalkulasi
- Jangan edit `public/index.html` kecuali untuk update Tailwind config
- File `src/styles/custom.css` untuk utility class global

### Tidak Perlu / Jangan Lakukan
- Jangan tambah komentar penjelasan ke kode (kecuali workaround non-obvious)
- Jangan buat file dokumentasi baru selain CLAUDE.md ini
- Jangan refactor kode yang tidak diminta
- Jangan tambah error handling untuk skenario yang tidak mungkin terjadi
- Jangan install testing library atau setup test tanpa diminta

---

## Komponen: gamesData.js

8 game dengan cover Steam CDN:
1. Cyberpunk 2077 (Action) — `apps/1091500`
2. Elden Ring (RPG) — `apps/1245620`
3. Metro Exodus (Action) — `apps/1449560`
4. DPS Idle (Strategy) — `apps/1450710`
5. Baldur's Gate 3 (RPG) — `apps/1086940`
6. Uncharted: Legacy of Thieves (Action) — `apps/1659420`
7. Armored Core VI (Action) — `apps/1888160`
8. Hades (RPG) — `apps/1145360`

---

## Komponen: HeroCarousel

3D fan carousel di HomePage. Menampilkan 5 slot sekaligus (pos -2 sampai +2).

```js
CAROUSEL_CONFIG = {
  '-2': { x: -560, w: 240, h: '72%', ry: 42,  op: 0.28, zi: 1 },
  '-1': { x: -330, w: 360, h: '85%', ry: 22,  op: 0.60, zi: 2 },
   '0': { x: 0,    w: 470, h: '95%', ry: 0,   op: 1,    zi: 5 },
   '1': { x: 330,  w: 360, h: '85%', ry: -22, op: 0.60, zi: 2 },
   '2': { x: 560,  w: 240, h: '72%', ry: -42, op: 0.28, zi: 1 },
}
```

- Container: `position:relative`, `height:calc(100vh - 520px)` — percentage heights pada absolute children bekerja karena container punya explicit height
- Auto-advance: 5 detik via `useEffect` + `setInterval`
- Cards center: gradient bawah + teks lorem + ORDER NOW button
- Cards samping: hanya gambar (no text overlay)

---

## Komponen: Cards (HomePage & Categories & Wishlist)

Struktur card standar:
```
div.card (border-radius:14px, overflow:hidden, background:white)
  div.image-area (height:160px, position:relative)
    img (objectFit:cover)
    button.wishlist (absolute, top-right)
  div.card-body (padding:10px 12px, flex-col, gap:6px)
    div.badge-stars (genre badge kiri + bintang kanan)
    h4 (uppercase, fontWeight:800, color:#111827)
    div.price-row (disc% | harga coret | harga | cart button)
```

---

## Known Quirks

- **Percentage heights pada absolute children**: hanya bekerja jika parent punya explicit `height` (bukan hanya `flex:1`). HeroCarousel menggunakan `height:calc(100vh - 520px)` untuk ini.
- **Tailwind CDN**: class baru langsung tersedia tanpa build. Tapi config hanya bisa diubah di `<script>` di `index.html`.

---

## Prioritas Pengembangan Selanjutnya (backlog)
1. Integrasi API: connect `gamesData` ke Laravel REST API
2. Authentication: login/register via Laravel Sanctum
3. Halaman detail game (klik card → detail + trailer embed)
4. Checkout flow di `Bag.jsx`
5. Search fungsional (filter `gamesData` berdasarkan `searchQuery`)
6. Category filter pills di HomePage yang benar-benar filter cards
