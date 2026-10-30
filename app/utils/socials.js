export const SOCIALS = {
  instagram: {
    label: "Instagram",
    svg: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>',
  },
  tiktok: {
    label: "TikTok",
    svg: '<path fill="currentColor" stroke="none" d="M16.5 3a5 5 0 0 0 4 4.4v3.2a8 8 0 0 1-4-1.2v6.1a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.3a2.8 2.8 0 1 0 1.8 2.6V3h3.2z"/>',
  },
  facebook: {
    label: "Facebook",
    svg: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  },
  youtube: {
    label: "YouTube",
    svg: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 11.8a29 29 0 0 0 .5 5.4 2.8 2.8 0 0 0 2 2C5.1 19.6 12 19.6 12 19.6s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-5.4 29 29 0 0 0-.5-5.4z"/><path d="M9.75 15.2l5.75-3.4-5.75-3.4z"/>',
  },
  x: { label: "X (Twitter)", svg: '<path d="M4 4l16 16M20 4L4 20"/>' },
  linkedin: {
    label: "LinkedIn",
    svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  },
  telegram: {
    label: "Telegram",
    svg: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
  },
  website: {
    label: "Website / Lainnya",
    svg: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  },
};
export function socialSvg(k) {
  var s = SOCIALS[k] || SOCIALS.website;
  return (
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    s.svg +
    "</svg>"
  );
}
