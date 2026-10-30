// https://nuxt.com/docs/api/configuration/nuxt-config
const TITLE = "Veyra — Undangan Digital Online Website";
const DESC =
  "Buat undangan digital online bersama Veyra. Tema elegan, mudah dibagikan lewat WhatsApp, dan siap pakai untuk pernikahan hingga acara spesial lainnya.";
const OG_IMG =
  "https://assets.satumomen.com/images/media/585826-media-1769860401.png";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  // Nama komponen tanpa prefix folder: components/home/ThemeCard.vue -> <ThemeCard />
  components: [{ path: "~/components", pathPrefix: false }],
  // Aplikasi ini mengandalkan localStorage / Supabase di sisi browser, jadi SPA.
  // `nuxt generate` menghasilkan file statis yang bisa di-hosting di mana saja.
  ssr: false,

  runtimeConfig: {
    public: {
      // Boleh ditaruh di sini karena ini URL + publishable key (memang terbuka di browser).
      // JANGAN isi dengan service_role / secret key.
      supabaseUrl: "https://ojbgkxpkboplhioqaasc.supabase.co",
      supabaseKey: "sb_publishable_ISI_KEY_KAMU",
      // Situs reseller webinvit.id (sumber tema, kategori, portofolio)
      sellerSite: "https://lunaviadigital.webinvit.id",
      waNumber: "6283862715772",
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "id" },
      title: TITLE,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "description", content: DESC },
        { name: "theme-color", content: "#041b49" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Veyra — Undangan Digital Online",
        },
        { property: "og:description", content: DESC },
        { property: "og:image", content: OG_IMG },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "Veyra" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Veyra — Undangan Digital Online",
        },
        { name: "twitter:description", content: DESC },
        { name: "twitter:image", content: OG_IMG },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicon-192.png",
        },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },
});
