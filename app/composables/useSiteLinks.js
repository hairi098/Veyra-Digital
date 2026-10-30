// Bundel kecil yang dipakai hampir semua komponen halaman publik
export function useSiteLinks() {
  const { brand, logo, waAsk, waLink, socials } = useSite();
  const sellerSite = useRuntimeConfig().public.sellerSite.replace(/\/$/, "");
  return {
    brand, logo, waAsk, waLink, socials, sellerSite,
    loginUrl: sellerSite + "/portal/login",
  };
}
