<script setup>
definePageMeta({ layout: "site" });
const { brand: _b } = useSite();
useHead({ title: computed(() => `Tema Undangan — ${_b.value}`) });
const { brand, logo, waAsk, waLink, loginUrl, sellerSite } = useSiteLinks();
</script>

<template>
  <div>

        <section class="fitur-hero" style="padding: 40px 20px 20px">
          <div
            style="
              max-width: 720px;
              margin: 0 auto;
              position: relative;
              z-index: 1;
            "
          >
            <p class="banner-eyebrow">Koleksi Tema</p>
            <h1 class="banner-title">
              Tema Undangan Digital<br />yang Bisa di
              <span class="banner-accent">Custom</span>
            </h1>
            <p class="banner-desc">
              Pilih dari koleksi template menakjubkan yang dapat diedit sesuka
              hati.
            </p>
          </div>
        </section>

        <ThemeBrowser />

        <section
          class="cta-bottom"
          style="background: #f5f3f9; padding: 40px 0"
        >
          <div class="container">
            <div class="cta-card">
              <div class="cta-deco cta-deco-1"></div>
              <div class="cta-deco cta-deco-2"></div>
              <div class="cta-body">
                <p class="cta-eyebrow">Tidak Menemukan Tema?</p>
                <h2 class="cta-title">Buat Tema Eksklusif<br />Sesukamu!</h2>
                <p class="cta-desc">
                  Tim desainer kami siap membuatkan tema undangan eksklusif
                  sesuai keinginan kamu.
                </p>
                <div class="cta-actions">
                  <a
                    :href="waLink('Halo, saya ingin custom tema undangan')"
                    target="_blank"
                    class="cta-btn-primary"
                    >Hubungi Sekarang</a
                  >
                  <NuxtLink to="/paket" class="cta-btn-outline">Lihat Paket</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </section>
  </div>
</template>
