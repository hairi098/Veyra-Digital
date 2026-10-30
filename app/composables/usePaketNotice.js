// Notifikasi di halaman Paket + alur "pilih tema -> pilih paket -> checkout"
export function usePaketNotice() {
  const n = useState("paket-notice", () => ({ msg: "", error: false, show: false }));
  const { selectedTheme } = useSelectedTheme();
  let timer;
  function notify(message, isError) {
    n.value = {
      error: !!isError,
      show: true,
      msg:
        message ||
        (selectedTheme.value
          ? `Tema "${selectedTheme.value.name}" telah dipilih. Silakan pilih paket sesuai kebutuhan acara Anda.`
          : "Silakan pilih paket sesuai kebutuhan acara Anda."),
    };
    clearTimeout(timer);
    timer = setTimeout(() => (n.value = { ...n.value, show: false }), 5000);
  }
  return { notice: n, notify };
}

export function useOrderFlow() {
  const { selectTheme, selectedTheme } = useSelectedTheme();
  const { notify } = usePaketNotice();
  return {
    chooseTheme(slug, name) {
      selectTheme(slug, name);
      navigateTo("/paket");
      notify();
    },
    choosePaket(key) {
      if (!selectedTheme.value) {
        navigateTo("/tema");
        notify("Silakan pilih tema terlebih dahulu sebelum melanjutkan.", true);
        return;
      }
      navigateTo({ path: "/checkout", query: { paket: key, tema: selectedTheme.value.name } });
    },
  };
}

export function useThemeModal() {
  const theme = useState("theme-modal", () => null);
  return { modalTheme: theme, openModal: (t) => (theme.value = t), closeModal: () => (theme.value = null) };
}
