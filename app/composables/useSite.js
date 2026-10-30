// Pengaturan situs dari Supabase (brand, sosmed, template WA, paket).
// Menggantikan site.js lama; cache localStorage memakai key yang sama.
const SETTINGS_KEY = "site_settings_v1";
const EXTRA_KEY = "site_extra_v1";
const PAKET_KEY = "paket_v1";
export const DEFAULT_BRAND = "Veyra";
export const DEFAULT_LOGO =
  "https://assets.satumomen.com/images/media/585826-media-1765370525.png";

function readCache(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}
function writeCache(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch (e) {}
}

export function useSite() {
  const cfg = useRuntimeConfig().public;
  const settings = useState("site-settings", () => null); // get_settings
  const extra = useState("site-extra", () => null); // get_site_extra
  const paket = useState("site-paket", () => []); // get_paket
  const apiBrand = useState("site-api-brand", () => null); // brand dari API reseller
  const ready = useState("site-ready", () => false);

  const brand = computed(
    () => settings.value?.brand_name || apiBrand.value?.name || DEFAULT_BRAND,
  );
  const logo = computed(
    () => settings.value?.logo_url || apiBrand.value?.logo || DEFAULT_LOGO,
  );
  const waNumber = computed(() => settings.value?.wa_number || cfg.waNumber);
  const socials = computed(() =>
    (extra.value?.socials || []).filter((x) => x && x.url),
  );

  function waLink(text) {
    const base = "https://wa.me/" + waNumber.value;
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }
  const waAsk = computed(() =>
    waLink(
      fillTpl(extra.value?.wa_ask || DEFAULT_WA_ASK, { brand: brand.value }),
    ),
  );

  return {
    settings,
    extra,
    paket,
    apiBrand,
    ready,
    brand,
    logo,
    waNumber,
    socials,
    waLink,
    waAsk,
  };
}

let started = false;
/** Dipanggil sekali dari layout default. Pakai cache dulu, lalu segarkan dari server. */
export function loadSite() {
  if (started || !import.meta.client) return;
  started = true;
  const { settings, extra, paket, apiBrand, ready } = useSite();

  settings.value = readCache(SETTINGS_KEY);
  extra.value = readCache(EXTRA_KEY);
  const p = readCache(PAKET_KEY);
  if (Array.isArray(p) && p.length) paket.value = p;
  apiBrand.value = readCache("lv_brand_v1");

  rpc("get_settings")
    .then((s) => {
      if (!s) return;
      writeCache(SETTINGS_KEY, s);
      settings.value = s;
    })
    .catch(() => {});
  rpc("get_site_extra")
    .then((x) => {
      if (!x) return;
      writeCache(EXTRA_KEY, x);
      extra.value = x;
    })
    .catch(() => {});
  rpc("get_paket")
    .then((l) => {
      if (!Array.isArray(l) || !l.length) return;
      writeCache(PAKET_KEY, l);
      paket.value = l;
    })
    .catch(() => {})
    .finally(() => (ready.value = true));
}
