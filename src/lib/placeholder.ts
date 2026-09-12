/**
 * Scaffolding images. Obviously placeholder — a study author deletes this file
 * once real assets arrive against the asset spec in the README.
 *
 * Each image is an SVG data URI with its own dimensions printed on it and a
 * circled "subject" so the crop is visible: when a slot's shape differs from
 * the source's, `object-fit: cover` discards edges, and the marker shows which
 * edges went. Move the subject off-centre to see why `object-position` exists.
 */
export interface PlaceholderImage {
  src: string;
  width: number;
  height: number;
  /** Where the subject sits in the source, as a CSS object-position value. */
  subject: string;
}

export function placeholderImage(
  label: string,
  width: number,
  height: number,
  hue: number,
  subject: { x: number; y: number } = { x: 0.5, y: 0.5 }
): PlaceholderImage {
  const cx = Math.round(width * subject.x);
  const cy = Math.round(height * subject.y);
  const r = Math.round(Math.min(width, height) * 0.12);
  const fs = Math.round(Math.min(width, height) * 0.08);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="hsl(${hue} 40% 70%)"/><stop offset="1" stop-color="hsl(${hue + 40} 45% 40%)"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="hsl(${hue} 30% 20%)" stroke-width="4" stroke-dasharray="16 12"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="hsl(${hue} 30% 15%)" stroke-width="${Math.max(3, r / 8)}"/>
  <circle cx="${cx}" cy="${cy}" r="${Math.max(3, r / 6)}" fill="hsl(${hue} 30% 15%)"/>
  <text x="16" y="${fs + 12}" font-family="ui-monospace, monospace" font-size="${fs}" fill="hsl(${hue} 30% 15%)">${label} ${width}×${height}</text>
</svg>`;
  return {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    width,
    height,
    subject: `${Math.round(subject.x * 100)}% ${Math.round(subject.y * 100)}%`,
  };
}
