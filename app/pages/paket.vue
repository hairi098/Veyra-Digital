<script setup>
definePageMeta({ layout: "site" });
const { brand: _b } = useSite();
useHead({ title: computed(() => `Paket & Harga — ${_b.value}`) });
const { brand, logo, waAsk, waLink, loginUrl, sellerSite } = useSiteLinks();
</script>

<template>
  <div>

        <section class="fitur-hero" style="padding: 64px 20px 72px">
          <div
            style="
              max-width: 600px;
              margin: 0 auto;
              position: relative;
              z-index: 1;
            "
          >
            <p class="banner-eyebrow">Harga Transparan</p>
            <h1 class="banner-title">
              Pilih Paket yang Sesuai<br /><span class="banner-accent"
                >Kebutuhanmu</span
              >
            </h1>
            <p class="banner-desc">
              Pilih paket sesuai kebutuhanmu. Semua paket sudah termasuk akses
              ke fitur utama undangan digital kami.
            </p>
          </div>
        </section>

        <section class="paket-section">
          <div class="container">
            <PackageGrid variant="tab" />
            <p class="guarantee-note">
              Garansi uang kembali 7 hari jika tidak puas
            </p>
          </div>
        </section>

        <section class="faq" style="background: #f8f5ff">
          <div class="container">
            <div class="section-header">
              <p class="section-eyebrow">Ada Pertanyaan?</p>
              <h2 class="section-title">
                Yang Sering <span class="accent">Ditanyakan</span>
              </h2>
            </div>
            <div class="faq-list">
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Berapa lama masa aktif setiap paket?</span
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
                  Basic aktif 30 hari, Premium 60 hari, dan Prioritas 90 hari
                  sejak akun dikonfirmasi admin.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Bagaimana cara upgrade dari Basic ke Premium?</span
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
                  Kamu bisa upgrade kapan saja dari dashboard akun. Pilih paket
                  yang diinginkan, lakukan pembayaran, dan fitur paket baru
                  langsung aktif setelah dikonfirmasi.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Metode pembayaran apa yang tersedia?</span
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
                  Kami menerima transfer bank, GoPay, OVO, Dana, QRIS, dan kartu
                  kredit/debit Visa/Mastercard.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span>Apakah saya bisa mendapatkan refund?</span
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
                  Ya, kami memberikan garansi uang kembali 7 hari sejak tanggal
                  pembelian jika kamu tidak puas dengan layanan kami.
                </div>
              </details>
              <details class="faq-item">
                <summary class="faq-q">
                  <span
                    >Apakah link undangan bisa dibagikan ke banyak tamu?</span
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
                  Tentu! Link undangan bisa dibagikan ke siapa saja tanpa batas
                  jumlah tamu.
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
                <p class="cta-eyebrow">Bayar Belakangan</p>
                <h2 class="cta-title">
                  Undangan Jadi Dulu,<br />Baru Kamu Bayar
                </h2>
                <p class="cta-desc">
                  Ayo bikin undangannya dulu, bayar belakangan! Pilih tema,
                  admin kami yang buatkan, kamu tinggal cek hasilnya baru bayar.
                </p>
                <div class="cta-actions">
                  <NuxtLink to="/tema" class="cta-btn-primary">Mulai Pilih Tema &nbsp;&rarr;</NuxtLink>
                  <a :href="waAsk"
                    class="cta-btn-outline"
                    target="_blank"
                    >Tanya via WhatsApp</a
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
</template>
