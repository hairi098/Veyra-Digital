// Penjaga halaman /admin/*: belum login -> /admin/login, sudah login -> tidak perlu ke halaman login lagi
export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server || !to.path.startsWith("/admin")) return;
  const { authed, restore } = useAdmin();
  const isLogin = to.path.replace(/\/+$/, "") === "/admin/login";
  const ok = authed.value || (await restore());

  if (isLogin) {
    if (ok) return navigateTo("/admin/pesanan");
    return;
  }
  if (!ok) {
    const next = to.path.replace(/\/+$/, "");
    const query = next && next !== "/admin" && next !== "/admin/pesanan" ? { next } : {};
    return navigateTo({ path: "/admin/login", query });
  }
});
