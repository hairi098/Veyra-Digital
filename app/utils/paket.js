// Cadangan paket bila Supabase belum terjawab / cache kosong
export const DEFAULT_PAKET = [
  { key: "basic", nama: "Basic", harga: 50000, tagline: "Praktis & Terjangkau", badge: "",
    fitur: [{ t: "Semua fitur undangan digital" }, { t: "Undangan dibuat oleh admin" }, { t: "Masa aktif 30 hari" },
      { t: "1x revisi minor" }, { t: "Bantuan Admin" }, { t: "Prioritas pengerjaan", on: false }] },
  { key: "premium", nama: "Premium", harga: 79000, tagline: "Paling Banyak Dipilih", badge: "TERLARIS",
    fitur: [{ t: "Semua fitur undangan digital" }, { t: "Masa aktif 60 hari" }, { t: "Dibuatkan oleh admin" },
      { t: "2x revisi minor" }, { t: "Prioritas Pengerjaan" }, { t: "Support WhatsApp (jam kerja)" }] },
  { key: "prioritas", nama: "Prioritas", harga: 99000, tagline: "Terima beres & tenang", badge: "",
    fitur: [{ t: "Semua fitur undangan digital" }, { t: "Masa aktif 90 hari" }, { t: "Full dibuatkan admin (terima beres)" },
      { t: "Revisi tanpa batas" }, { t: "Prioritas pengerjaan" }, { t: "Prioritas respon Admin" }] },
];
