// ===== Template pesan WhatsApp =====
export const DEFAULT_WA_TEMPLATE = [
  "Halo, saya ingin melakukan pemesanan undangan digital dengan rincian berikut:",
  "",
  "*Data Pemesan*",
  "Nama: {nama}",
  "No. WA/Email: {kontak}",
  "Kategori Acara: {acara}",
  "",
  "*Detail Pesanan*",
  "Tema: {tema}",
  "Paket: {paket}",
  "No. Invoice: {invoice}",
  "",
  "*Rincian Pembayaran*",
  "Harga Paket: {harga}",
  "Kode Unik: -{unik}",
  "{promo}",
  "{skema}",
  "{metode}",
  "Total Bayar: *{total}*",
  "",
  "Mohon informasi instruksi pembayaran selanjutnya. Terima kasih.",
].join("\n");
export const DEFAULT_WA_ASK =
  "Halo {brand}, saya mau tanya-tanya dulu soal undangan digital. Bisa dibantu?";
export const DEFAULT_WA_FOLLOW = {
  baru: "Halo {nama}, terima kasih sudah memesan undangan digital ({invoice}) paket {paket} sebesar {total}. Kami konfirmasi pesananmu ya.",
  diproses:
    "Halo {nama}, undangan digital pesanan {invoice} sedang kami kerjakan. Kami kabari lagi kalau sudah siap ya.",
  selesai:
    "Halo {nama}, undangan digital pesanan {invoice} sudah selesai. Terima kasih sudah memesan, semoga acaranya lancar!",
  batal:
    "Halo {nama}, pesanan {invoice} kami batalkan. Kalau ada pertanyaan, silakan balas pesan ini.",
};
// Ganti {variabel}. Baris yang hanya berisi satu variabel kosong dibuang.
export function fillTpl(t, v) {
  return String(t)
    .split("\n")
    .map(function (l) {
      var o = l.trim().match(/^\{(\w+)\}$/);
      if (o && v[o[1]] === "") return null;
      return l.replace(/\{(\w+)\}/g, function (m, k) {
        return v[k] == null ? m : v[k];
      });
    })
    .filter(function (l) {
      return l !== null;
    })
    .join("\n");
}
