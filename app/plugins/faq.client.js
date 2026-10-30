// FAQ accordion: membuka satu item menutup item lain dalam daftar yang sama
export default defineNuxtPlugin(() => {
  document.addEventListener(
    "toggle",
    (e) => {
      const el = e.target;
      if (!el.classList || !el.classList.contains("faq-item") || !el.open) return;
      const list = el.closest(".faq-list");
      if (!list) return;
      list.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== el) item.removeAttribute("open");
      });
    },
    true,
  );
});
