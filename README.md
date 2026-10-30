# Veyra — Nuxt 4

Landing page katalog tema undangan digital + checkout WhatsApp + dashboard admin (Supabase).

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # hasil statis di .output/public (bisa di-hosting di mana saja)
```

Isi `.env`: URL + anon key Supabase, situs reseller, nomor WA.

## Halaman (satu file = satu halaman)

| URL                                                              | File                             |
| ---------------------------------------------------------------- | -------------------------------- |
| `/`                                                              | `app/pages/index.vue` (Beranda)  |
| `/fitur`                                                         | `app/pages/fitur.vue`            |
| `/tema` , `/tema?kategori=slug`                                  | `app/pages/tema.vue`             |
| `/paket`                                                         | `app/pages/paket.vue`            |
| `/tentang`                                                       | `app/pages/tentang.vue`          |
| `/checkout`                                                      | `app/pages/checkout.vue`         |
| `/admin/login`                                                   | `app/pages/admin/login.vue`      |
| `/admin/pesanan` (`/admin` mengarah ke sini)                     | `app/pages/admin/pesanan.vue`    |
| `/admin/ringkasan`                                               | `app/pages/admin/ringkasan.vue`  |
| `/admin/promo`                                                   | `app/pages/admin/promo.vue`      |
| `/admin/paket`                                                   | `app/pages/admin/paket.vue`      |
| `/admin/brand`                                                   | `app/pages/admin/brand.vue`      |
| `/admin/sosmed`                                                  | `app/pages/admin/sosmed.vue`     |
| `/admin/pembayaran`                                              | `app/pages/admin/pembayaran.vue` |
| `/admin/template` (tidak ada di sidebar, seperti dashboard lama) | `app/pages/admin/template.vue`   |

## Struktur

```
app/
  layouts/
    default.vue      polos (dipakai checkout)
    site.vue         navbar + footer + widget WA (halaman publik)
    admin.vue        polos (login admin)
    admin-app.vue    sidebar + header + toast (halaman dashboard)
  middleware/admin.global.js   penjaga /admin/*: belum login -> /admin/login
  composables/
    useSite, useThemes, usePaketNotice, useSiteLinks   (publik)
    useAdmin      sesi login + data dashboard (pesanan, promo, paket, pengaturan)
    useAdminUi    toast + dialog konfirmasi
  components/home|site|admin
  utils/          rpc (Supabase), wa, socials, format, paket, admin
```

## Catatan

- Mode SPA (`ssr: false`) karena memakai localStorage/Supabase di browser.
- Login admin: email + password dicek lewat RPC `admin_login`, sesi di `sessionStorage` (hilang saat tab ditutup).
- Brand, sosmed, dan pembayaran disimpan sebagai satu paket pengaturan: tombol Simpan di salah satu dari tiga halaman itu menyimpan ketiganya.
- Dari/ke `/admin` gunakan link biasa (bukan NuxtLink) agar CSS admin & publik tidak bercampur.
- Hosting statis: pastikan ada fallback ke `200.html` untuk URL yang tidak punya file sendiri.
