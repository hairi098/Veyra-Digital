// Pembantu kecil untuk dashboard admin (/admin/*)

/* nilai status di database tetap (baru/diproses/selesai/batal), hanya labelnya yang disesuaikan */
export const STATUS_LIST = ["baru", "diproses", "selesai", "batal"];
export const STATUS_LABEL = {
  baru: "Belum bayar",
  diproses: "Sudah bayar",
  selesai: "Sudah dikirim",
  batal: "Batal",
};

export function waNum(k) {
  let w = String(k || "").replace(/\D/g, "");
  if (w.indexOf("0") === 0) w = "62" + w.slice(1);
  return /^\d{9,}$/.test(w) ? w : "";
}

export function ago(d) {
  const m = (Date.now() - new Date(d)) / 6e4;
  return m < 1
    ? "baru saja"
    : m < 60
      ? Math.floor(m) + " mnt lalu"
      : m < 1440
        ? Math.floor(m / 60) + " jam lalu"
        : Math.floor(m / 1440) + " hari lalu";
}

export function fdt(d) {
  return new Date(d).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** isi chat WhatsApp ke pelanggan dari daftar pesanan */
export function waMsg(o) {
  return "Halo " + o.nama + ", terkait pesanan undangan digital " + o.invoice + " (" + o.paket + ", tema " + o.tema + ").";
}

export function dataText(o) {
  return [
    "Data Pesanan " + o.invoice,
    "Nama: " + o.nama,
    "Kontak: " + o.kontak,
    "Acara: " + o.acara,
    "Tema: " + o.tema,
    "Paket: " + o.paket,
  ].join("\n");
}

/** "Fitur" -> { t, on }. Baris berawalan "-" berarti fitur tidak termasuk */
export function parseFitur(t) {
  return String(t || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const off = l.charAt(0) === "-";
      return { t: off ? l.slice(1).trim() : l, on: !off };
    })
    .filter((f) => f.t);
}

/** perkecil gambar upload jadi data URL */
export function shrinkImg(file, max, type) {
  return new Promise((ok) => {
    const rd = new FileReader();
    const im = new Image();
    rd.onload = () => (im.src = rd.result);
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = Math.round(im.width * k);
      c.height = Math.round(im.height * k);
      const g = c.getContext("2d");
      if (type === "image/jpeg") {
        g.fillStyle = "#fff";
        g.fillRect(0, 0, c.width, c.height);
      }
      g.drawImage(im, 0, 0, c.width, c.height);
      ok(c.toDataURL(type, 0.85));
    };
    rd.readAsDataURL(file);
  });
}

export function downloadOrdersCsv(list) {
  const rows = [
    ["Tanggal", "Invoice", "Nama", "Kontak", "Acara", "Tema", "Paket", "Harga", "Kode Unik", "Promo", "Diskon", "Total", "Status"],
  ];
  list.forEach((o) =>
    rows.push([
      o.created_at, o.invoice, o.nama, o.kontak, o.acara, o.tema, o.paket,
      o.harga, o.kode_unik, o.promo_kode || "", o.diskon, o.total, o.status,
    ]),
  );
  const csv = rows
    .map((r) => r.map((c) => '"' + String(c == null ? "" : c).replace(/"/g, '""') + '"').join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" }));
  a.download = "laporan-pesanan.csv";
  a.click();
}

/** variabel yang bisa disisipkan ke pesan WhatsApp checkout */
export const WA_TOKENS = ["nama", "kontak", "acara", "tema", "paket", "invoice", "harga", "unik", "promo", "metode", "total"];
