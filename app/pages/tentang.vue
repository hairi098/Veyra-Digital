<script setup>
definePageMeta({ layout: "site" });
const { brand: _b } = useSite();
useHead({ title: computed(() => `Tentang Kami — ${_b.value}`) });
const { brand, logo, waAsk, waLink, loginUrl, sellerSite } = useSiteLinks();
</script>

<template>
  <div>

        <section class="tentang-hero">
          <div class="container">
            <div
              style="
                max-width: 600px;
                margin: 0 auto;
                position: relative;
                z-index: 1;
                text-align: center;
              "
            >
              <span class="hero-badge-pill">✦ Tentang Kami</span>
              <h1 class="tentang-hero-title">
                Kami Hadir untuk Membuat<br /><span
                  style="color: var(--sm-secondary)"
                  >Momen Spesialmu</span
                ><br />Tak Terlupakan
              </h1>
              <p class="tentang-hero-desc">
                {{ brand }} lahir dari kecintaan terhadap detail dan
                kepercayaan bahwa setiap undangan adalah cerminan cerita cinta
                yang unik. Kami bukan sekadar platform — kami adalah teman
                perjalanan menuju hari istimewamu.
              </p>
            </div>
          </div>
        </section>

        <section class="stats-section">
          <div class="container">
            <div class="stats-grid">
              <div class="stat-item">
                <p class="stat-value">12.000+</p>
                <p class="stat-label-b">Pengguna Aktif</p>
                <p class="stat-desc-b">
                  Pasangan yang telah memakai layanan kami
                </p>
              </div>
              <div class="stat-item">
                <p class="stat-value">500+</p>
                <p class="stat-label-b">Pilihan Tema</p>
                <p class="stat-desc-b">
                  Desain eksklusif dari desainer profesional
                </p>
              </div>
              <div class="stat-item">
                <p class="stat-value">98%</p>
                <p class="stat-label-b">Kepuasan</p>
                <p class="stat-desc-b">
                  Rating rata-rata dari pengguna setia kami
                </p>
              </div>
              <div class="stat-item">
                <p class="stat-value">2 Tahun</p>
                <p class="stat-label-b">Pengalaman</p>
                <p class="stat-desc-b">
                  Melayani dengan sepenuh hati sejak 2022
                </p>
              </div>
            </div>
          </div>
        </section>

        <PortoSection />

        <section class="testi-section">
          <div class="container">
            <div class="sec-header">
              <p class="sec-eyebrow">Kata Mereka</p>
              <h2 class="sec-title">
                Ribuan Pasangan<br /><span style="color: var(--sm-primary)"
                  >Sudah Mempercayai Kami</span
                >
              </h2>
            </div>
            <div class="testi-grid-b">
              <div class="testi-card-b featured">
                <div class="testi-stars-b">★★★★★</div>
                <p class="testi-text-b">
                  "{{ brand }} bikin undangan nikahan kami jadi jauh lebih
                  berkesan. Semua tamu kagum dengan tampilannya!"
                </p>
                <div class="testi-footer-b">
                  <div
                    class="testi-ava-b"
                    style="
                      background: linear-gradient(135deg, #7e57c2, #c9747b);
                    "
                  >
                    AF
                  </div>
                  <div>
                    <p class="testi-name-b">Aulia &amp; Farhan</p>
                    <p class="testi-sub-b">Menikah Juni 2025</p>
                  </div>
                  <div class="testi-category-badge">Wedding</div>
                </div>
              </div>
              <div class="testi-card-b">
                <div class="testi-stars-b">★★★★★</div>
                <p class="testi-text-b">
                  "Prosesnya gampang banget, tinggal pilih tema, isi data,
                  langsung jadi. Tampilannya elegan dan profesional."
                </p>
                <div class="testi-footer-b">
                  <div
                    class="testi-ava-b"
                    style="
                      background: linear-gradient(
                        135deg,
                        var(--sm-primary),
                        var(--sm-dark)
                      );
                    "
                  >
                    DK
                  </div>
                  <div>
                    <p class="testi-name-b">Dewi Kartika</p>
                    <p class="testi-sub-b">Menikah Maret 2025</p>
                  </div>
                  <div class="testi-category-badge">Wedding</div>
                </div>
              </div>
              <div class="testi-card-b">
                <div class="testi-stars-b">★★★★★</div>
                <p class="testi-text-b">
                  "RSVP online-nya sangat membantu buat ngitung jumlah tamu.
                  Fitur amplop digitalnya juga kece!"
                </p>
                <div class="testi-footer-b">
                  <div
                    class="testi-ava-b"
                    style="
                      background: linear-gradient(135deg, #e05c7a, #7e57c2);
                    "
                  >
                    BN
                  </div>
                  <div>
                    <p class="testi-name-b">Bagas &amp; Ninda</p>
                    <p class="testi-sub-b">Menikah Agustus 2025</p>
                  </div>
                  <div class="testi-category-badge">Wedding</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="team-section">
          <div class="container">
            <div class="sec-header">
              <p class="sec-eyebrow">Di Balik Layar</p>
              <h2 class="sec-title">
                Tim yang
                <span style="color: var(--sm-primary)">Berdedikasi</span>
              </h2>
            </div>
            <div class="team-grid">
              <div class="team-card">
                <div
                  class="team-avatar"
                  style="
                    background: linear-gradient(
                      135deg,
                      var(--sm-dark),
                      var(--sm-secondary)
                    );
                  "
                >
                  <span class="team-initial">AB</span>
                </div>
                <h3 class="team-name">Arif Budiman</h3>
                <p class="team-role">Founder &amp; CEO</p>
                <p class="team-desc">
                  Visioner di balik {{ brand }}, dengan passion dalam
                  teknologi dan desain.
                </p>
              </div>
              <div class="team-card">
                <div
                  class="team-avatar"
                  style="background: linear-gradient(135deg, #e05c7a, #c9747b)"
                >
                  <span class="team-initial">SD</span>
                </div>
                <h3 class="team-name">Sari Dewi</h3>
                <p class="team-role">Lead Designer</p>
                <p class="team-desc">
                  Menciptakan tema-tema indah yang membuat setiap undangan
                  menjadi karya seni.
                </p>
              </div>
              <div class="team-card">
                <div
                  class="team-avatar"
                  style="
                    background: linear-gradient(
                      135deg,
                      var(--sm-primary),
                      #4a90d9
                    );
                  "
                >
                  <span class="team-initial">BS</span>
                </div>
                <h3 class="team-name">Budi Santoso</h3>
                <p class="team-role">Head of Engineering</p>
                <p class="team-desc">
                  Memastikan platform selalu cepat, stabil, dan penuh fitur
                  inovatif.
                </p>
              </div>
              <div class="team-card">
                <div
                  class="team-avatar"
                  style="background: linear-gradient(135deg, #f0c040, #e64a19)"
                >
                  <span class="team-initial">MP</span>
                </div>
                <h3 class="team-name">Maya Putri</h3>
                <p class="team-role">Customer Success</p>
                <p class="team-desc">
                  Memastikan setiap pengguna mendapatkan pengalaman terbaik di
                  {{ brand }}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="cta-bottom">
          <div class="container">
            <div class="cta-card">
              <div class="cta-deco cta-deco-1"></div>
              <div class="cta-deco cta-deco-2"></div>
              <div class="cta-body">
                <p class="cta-eyebrow">🎉 Bergabung Sekarang</p>
                <h2 class="cta-title">
                  Undangan Jadi Dulu,<br />Baru Kamu Bayar
                </h2>
                <p class="cta-desc">
                  Bergabung dengan 12.000+ pasangan yang telah mempercayakan
                  hari spesial mereka kepada {{ brand }}. Tim admin kami
                  yang buatkan undanganmu sampai selesai, kamu tinggal cek
                  hasilnya dan bayar setelah puas.
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
