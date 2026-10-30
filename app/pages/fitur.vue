<script setup>
definePageMeta({ layout: "site" });
const { brand: _b } = useSite();
useHead({ title: computed(() => `Fitur — ${_b.value}`) });
const { brand, logo, waAsk, waLink, loginUrl, sellerSite } = useSiteLinks();
</script>

<template>
  <div>

        <section class="fitur-hero">
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              position: relative;
              z-index: 1;
            "
          >
            <p class="banner-eyebrow">Kenapa Pilih Kami</p>
            <h1 class="banner-title">
              Fitur Lengkap<br />untuk Undangan<br /><span class="banner-accent"
                >Digital Terbaik</span
              >
            </h1>
            <p class="banner-desc">
              Semua yang kamu butuhkan sudah tersedia — dari desain, musik,
              RSVP, hingga pengiriman instan. Buat undangan impianmu tanpa
              ribet, tanpa coding, cukup dari smartphone.
            </p>
          </div>
        </section>

        <section class="fitur-section">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Fitur Unggulan</p>
              <h2 class="section-title">
                Semua yang Kamu <span class="accent">Butuhkan</span>
              </h2>
              <p class="section-sub">
                Dirancang sederhana, namun lengkap untuk acara pernikahanmu
              </p>
            </div>
            <div class="fitur-grid">
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                </div>
                <h3>Pilih Tema Cantik</h3>
                <p>
                  Ratusan tema eksklusif siap pakai, dari elegan klasik hingga
                  modern minimalis.
                </p>
              </div>
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </div>
                <h3>Edit Tanpa Coding</h3>
                <p>
                  Edit semua konten undangan langsung dari smartphone. Nama,
                  tanggal, lokasi, foto.
                </p>
              </div>
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3>Galeri Foto &amp; Video</h3>
                <p>
                  Upload foto prewedding dan video kenangan indahmu tanpa batas.
                </p>
              </div>
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <polyline points="9 16 11 18 15 14" />
                  </svg>
                </div>
                <h3>RSVP Online</h3>
                <p>
                  Tamu bisa konfirmasi kehadiran, jumlah orang, dan pesan ucapan
                  selamat langsung dari undangan.
                </p>
              </div>
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <h3>Musik Latar</h3>
                <p>
                  Pilih lagu favorit sebagai backsound undangan. Buat suasana
                  makin romantis.
                </p>
              </div>
              <div class="fitur-card">
                <div class="fitur-icon-wrap">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <h3>Kirim via WhatsApp</h3>
                <p>
                  Bagikan link undangan langsung via WhatsApp, Instagram, atau
                  media sosial lainnya.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="bonus-section">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Ada Lebih Banyak</p>
              <h2 class="section-title">
                Fitur <span class="accent">Tambahan</span>
              </h2>
              <p class="section-sub">
                Nikmati berbagai fitur ekstra yang membuat undanganmu makin
                istimewa
              </p>
            </div>
            <div class="bonus-grid">
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Hitung Mundur Hari H</h4>
                  <p class="bonus-desc">
                    Countdown timer otomatis menuju hari pernikahan.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Peta Lokasi Otomatis</h4>
                  <p class="bonus-desc">
                    Integrasi Google Maps untuk petunjuk arah ke venue.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Amplop Digital</h4>
                  <p class="bonus-desc">
                    Terima hadiah dan ucapan selamat secara digital.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Ucapan &amp; Doa Tamu</h4>
                  <p class="bonus-desc">
                    Buku tamu digital untuk ucapan dari orang-orang tercinta.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Multi Acara</h4>
                  <p class="bonus-desc">
                    Tampilkan jadwal akad, resepsi, dan pengajian dalam satu
                    halaman.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Animasi Pembuka</h4>
                  <p class="bonus-desc">
                    Opening animation yang memukau saat tamu pertama membuka
                    link.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Protokol Kesehatan</h4>
                  <p class="bonus-desc">
                    Tampilkan informasi protokol kesehatan untuk tamu undangan.
                  </p>
                </div>
              </div>
              <div class="bonus-card">
                <div class="bonus-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <h4 class="bonus-title">Statistik Kunjungan</h4>
                  <p class="bonus-desc">
                    Pantau berapa orang yang sudah membuka undanganmu secara
                    real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="cta-bottom" style="background: #f8f5ff">
          <div class="container">
            <div class="cta-card">
              <div class="cta-deco cta-deco-1"></div>
              <div class="cta-deco cta-deco-2"></div>
              <div class="cta-body">
                <p class="cta-eyebrow">Mulai Sekarang</p>
                <h2 class="cta-title">
                  Siap Buat Undangan<br />Digital Impianmu?
                </h2>
                <p class="cta-desc">
                  Ayo bikin undangannya dulu, bayar belakangan! Pilih tema,
                  admin kami yang buatkan, kamu tinggal cek hasilnya baru bayar.
                </p>
                <div class="cta-actions">
                  <NuxtLink to="/tema" class="cta-btn-primary">Mulai Pilih Tema</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
</template>
