// Pemanggil RPC Supabase (pengganti rpc() di config.js lama)
export function rpc(name, args) {
  const { supabaseUrl, supabaseKey } = useRuntimeConfig().public;
  const h = { "Content-Type": "application/json", apikey: supabaseKey };
  if (supabaseKey.indexOf("eyJ") === 0) h.Authorization = "Bearer " + supabaseKey;
  return fetch(supabaseUrl + "/rest/v1/rpc/" + name, {
    method: "POST",
    headers: h,
    body: JSON.stringify(args || {}),
  }).then((r) => {
    if (!r.ok) throw new Error("Supabase error " + r.status);
    return r.json();
  });
}
