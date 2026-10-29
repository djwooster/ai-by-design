/** Shared motion values, matching the CSS tokens in globals.css. */
export const ease = {
  glide: [0.22, 1, 0.36, 1],
  press: [0.3, 0, 0.2, 1],
} as const;

export const rise = {
  distance: 10,
  duration: 0.4,
  stagger: 0.04,
};
