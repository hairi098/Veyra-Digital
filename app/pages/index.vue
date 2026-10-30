<script setup>
definePageMeta({ layout: "site" });
const { brand: _b } = useSite();
useHead({ title: computed(() => `${_b.value} — Undangan Digital Online Website`) });
const { brand, logo, waAsk, waLink, loginUrl, sellerSite } = useSiteLinks();
const words = ["Apapun","Pernikahan","Tunangan","Ulang Tahun","Khitanan","Aqiqah","Tasmiyah","Wisuda","Syukuran","Launcing","Perusahaan","Party","Reuni"];
const word = ref(words[0]);
let timer;
onMounted(() => {
  let i = 0;
  timer = setInterval(() => (word.value = words[++i % words.length]), 1500);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <div>

        <section class="hero">
          <div class="hero-inner container">
            <div class="hero-text">
              <h1 class="hero-title">
                <span class="title-dark"
                  >Bikin Undangan<br />Digital Online<br />
                  Untuk Acara</span
                >
                <span class="title-accent"><span class="tw-active">{{ word }}</span></span>
              </h1>
              <p class="hero-desc">
                {{ brand }} menghadirkan undangan digital modern yang mudah
                dibuat dan siap dibagikan dalam hitungan menit.
              </p>
              <div class="hero-actions">
                <a
                  :href="loginUrl"
                  target="_blank"
                  rel="noopener"
                  class="btn-primary"
                  >Login Sekarang
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" /></svg
                ></a>
                <NuxtLink to="/tema" class="btn-secondary"><svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" /></svg
                  >Lihat Tema</NuxtLink>
              </div>
            </div>
            <div class="hero-illustration">
              <img
                :src="sellerSite + '/images/aplikasi-undangan-digital-website.webp'"
                :alt="'Contoh Undangan Digital ' + brand + ''"
                class="hero-illustration-img"
              />
            </div>
          </div>
        </section>

        <section class="features" id="fitur-beranda">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Kenapa Pilih Kami</p>
              <h2>Fitur <span class="accent">Unggulan</span></h2>
              <p class="section-sub">
                Semua yang kamu butuhkan untuk membuat undangan digital yang
                memukau
              </p>
            </div>
            <div class="features-grid">
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Pilih Tema</h3>
                <p>
                  Ratusan tema cantik tersedia, pilih sesuai selera dan konsep
                  pernikahanmu.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Edit Mudah</h3>
                <p>
                  Edit semua detail acara langsung dari smartphone tanpa
                  keahlian coding.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Upload Foto</h3>
                <p>
                  Unggah foto prewedding dan galeri kenangan indahmu dengan
                  mudah.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Kirim Instan</h3>
                <p>
                  Bagikan link undangan via WhatsApp, Instagram, atau media
                  sosial lainnya.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                  Tambahkan lagu favorit sebagai backsound undangan digitalmu.
                </p>
              </div>
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <svg
                    width="28"
                    height="28"
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
                  Tamu bisa konfirmasi kehadiran langsung di halaman undangan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="themes" id="tema-beranda">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Koleksi Terlengkap</p>
              <h2>Pilihan <span class="accent">Tema</span></h2>
              <p class="section-sub">
                Puluhan tema unik siap pakai untuk hari spesialmu.
              </p>
            </div>
            <ThemeGridBeranda />
            <div class="center-btn">
              <NuxtLink to="/tema" class="btn-outline">Lihat Semua Tema
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" /></svg
              ></NuxtLink>
            </div>
          </div>
        </section>

        <section class="pricing" id="paket-beranda">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Harga Terjangkau</p>
              <h2>Pilihan <span class="accent">Paket</span></h2>
              <p class="section-sub">
                Pilih paket Basic, Premium, atau Prioritas sesuai kebutuhanmu
              </p>
            </div>
            <PackageGrid variant="home" />
            <p class="pricing-note">
              Garansi uang kembali 7 hari jika tidak puas
            </p>
          </div>
        </section>

        <section class="how-to" id="cara-beli">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Mudah &amp; Cepat</p>
              <h2>Cara <span class="accent">Pesan</span></h2>
              <p class="section-sub">
                6 langkah mudah, tim admin kami yang kerjakan sampai undanganmu
                siap
              </p>
            </div>
            <div class="how-grid">
              <div class="how-card">
                <div class="how-num">1</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Pilih Tema</h3>
                <p>
                  Pilih tema undangan favoritmu dari koleksi tema yang tersedia.
                </p>
              </div>
              <div class="how-card">
                <div class="how-num">2</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <h3>Pilih Paket</h3>
                <p>Pilih paket layanan yang sesuai dengan kebutuhan acaramu.</p>
              </div>
              <div class="how-card">
                <div class="how-num">3</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Isi Data Pemesanan</h3>
                <p>
                  Lengkapi data diri dan detail acara melalui form yang
                  tersedia.
                </p>
              </div>
              <div class="how-card">
                <div class="how-num">4</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"
                    />
                  </svg>
                </div>
                <h3>Admin Proses Pembuatan</h3>
                <p>
                  Tim admin kami langsung membuatkan undangan digitalmu sesuai
                  data yang diisi.
                </p>
              </div>
              <div class="how-card">
                <div class="how-num">5</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--sm-primary)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Undangan Siap Dicek</h3>
                <p>
                  Undangan jadi dikirim untuk kamu periksa dulu sebelum lanjut
                  ke pembayaran.
                </p>
              </div>
              <div class="how-card">
                <div class="how-num">6</div>
                <div class="how-icon">
                  <svg
                    width="28"
                    height="28"
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
                <h3>Bayar Setelah Jadi</h3>
                <p>
                  Baru lakukan pembayaran setelah undangan selesai dan kamu puas
                  dengan hasilnya.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonials" id="testimoni">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Kata Mereka</p>
              <h2>Ribuan Pasangan <span class="accent">Puas</span></h2>
              <p class="section-sub">
                Bergabung bersama 10.000+ pengguna yang sudah mempercayai kami
              </p>
            </div>
            <div class="testi-grid">
              <div class="testi-card">
                <div class="testi-stars">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="var(--sm-info)"
                    stroke="none"
                  >
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    /></svg
                  >★★★★★
                </div>
                <p class="testi-text">
                  "Prosesnya cepat banget, dalam 10 menit undangan sudah jadi.
                  Tampilannya elegan dan tamu-tamu suka!"
                </p>
                <div class="testi-user">
                  <div
                    class="testi-avatar"
                    style="
                      background: linear-gradient(135deg, #f8b4c8, #e8d5b7);
                    "
                  >
                    AB
                  </div>
                  <div>
                    <div class="testi-name">Ayu &amp; Budi</div>
                    <div class="testi-event">Pernikahan · Januari 2025</div>
                  </div>
                </div>
              </div>
              <div class="testi-card">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">
                  "Fitur RSVPnya sangat membantu buat tracking tamu. Recommended
                  banget buat yang mau nikah!"
                </p>
                <div class="testi-user">
                  <div
                    class="testi-avatar"
                    style="
                      background: linear-gradient(
                        135deg,
                        var(--sm-primary),
                        var(--sm-secondary)
                      );
                    "
                  >
                    RS
                  </div>
                  <div>
                    <div class="testi-name">Rizky &amp; Siti</div>
                    <div class="testi-event">Pernikahan · Maret 2025</div>
                  </div>
                </div>
              </div>
              <div class="testi-card">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">
                  "Harganya terjangkau tapi kualitas desainnya premium. Banyak
                  tamu yang tanya pakai platform apa."
                </p>
                <div class="testi-user">
                  <div
                    class="testi-avatar"
                    style="
                      background: linear-gradient(135deg, #b8860b, #ffd700);
                    "
                  >
                    DF
                  </div>
                  <div>
                    <div class="testi-name">Dinda &amp; Fahri</div>
                    <div class="testi-event">Pernikahan · Februari 2025</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testi-stats">
              <div class="stat-item">
                <span class="stat-num">10.000+</span
                ><span class="stat-label">Pengguna Aktif</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">4.9/5</span
                ><span class="stat-label">Rating Rata-rata</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">500+</span
                ><span class="stat-label">Pilihan Tema</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-num">99%</span
                ><span class="stat-label">Pelanggan Puas</span>
              </div>
            </div>
          </div>
        </section>

        <section class="faq" id="faq">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Ada Pertanyaan?</p>
              <h2>FAQ <span class="accent">Pertanyaan Umum</span></h2>
              <p class="section-sub">
                Jawaban untuk pertanyaan yang sering ditanyakan
              </p>
            </div>
            <div class="faq-list">
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Apakah bisa lihat hasilnya dulu sebelum bayar?</span
                  ><svg
                    class="faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div class="faq-a">
                  Bisa! Pilih tema dan paket, isi data pemesanan, lalu admin
                  kami yang buatkan undanganmu. Kamu bisa cek dulu hasil
                  jadinya, baru lakukan pembayaran setelah puas.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Berapa lama proses pembuatan undangannya?</span
                  ><svg
                    class="faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div class="faq-a">
                  Cepat! Setelah kamu pilih tema, pilih paket, dan isi data,
                  admin kami langsung mengerjakan undanganmu. Kamu tinggal cek
                  hasilnya, dan baru bayar setelah undangan selesai dan sesuai
                  keinginanmu.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Apakah bisa diedit setelah diterbitkan?</span
                  ><svg
                    class="faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div class="faq-a">
                  Tentu! Kamu bisa mengedit semua detail undangan kapan saja
                  selama masa aktif paketmu.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Bagaimana cara tamu mengkonfirmasi kehadiran?</span
                  ><svg
                    class="faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div class="faq-a">
                  Tamu cukup membuka link undangan dan mengisi form RSVP yang
                  tersedia. Konfirmasi kehadiran akan langsung masuk ke
                  dashboard kamu.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Apakah tersedia fitur amplop digital?</span
                  ><svg
                    class="faq-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div class="faq-a">
                  Ya! Kamu bisa menambahkan nomor rekening atau QRIS di halaman
                  undangan sehingga tamu bisa mengirimkan hadiah secara digital.
                </div>
              </details>
            </div>
          </div>
        </section>

        <section class="cta-bottom">
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
                  <NuxtLink to="/tema" class="cta-btn-primary">Mulai Pilih Tema
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" /></svg
                  ></NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
</template>
