// Toast + dialog konfirmasi untuk dashboard admin
let toastTimer;

export function useAdminUi() {
  const toastState = useState("adm-toast", () => ({ msg: "", type: "ok", on: false }));
  const confirmState = useState("adm-confirm", () => null);

  function toast(msg, type) {
    toastState.value = { msg, type: type || "ok", on: true };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastState.value = { ...toastState.value, on: false }), 2400);
  }

  /** dialog "Yakin?" -> Promise<boolean> */
  function ask(title, message, ok) {
    return new Promise((resolve) => {
      confirmState.value = { title, message, ok, resolve };
    });
  }
  function answer(v) {
    const c = confirmState.value;
    confirmState.value = null;
    if (c) c.resolve(v);
  }

  return { toastState, toast, confirmState, ask, answer };
}
