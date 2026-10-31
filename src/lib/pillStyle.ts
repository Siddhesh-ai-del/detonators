export const pillOptics = {
  frost: 0,
  brightness: 0,
  strength: 0.05,
  bend: 0.45,
  dispersion: 0.32,
};

export const pillTint = {
  background: "rgba(255, 255, 255, 0.06)",
};

export const glassEdge =
  "rounded-full border border-white/60 shadow-[0_12px_40px_-12px_rgba(32,30,27,0.18)]";

const pillOpticsMobile = { ...pillOptics, mapSize: 256 };

export function pillOpticsFor(isMobile: boolean) {
  return isMobile ? pillOpticsMobile : pillOptics;
}