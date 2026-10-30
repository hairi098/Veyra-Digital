export function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
export function rp(n) {
  return "Rp" + Math.max(0, Math.round(n)).toLocaleString("id-ID");
}
export function safeUrl(u) {
  u = String(u || "").trim();
  if (!u) return "";
  return /^https?:\/\//i.test(u) ? u : "https://" + u.replace(/^\/+/, "");
}
