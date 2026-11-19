import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** app/icon.svg at 180px, full-bleed: iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#202020" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path d="M19.5 8 12.5 24" stroke="#fcfcfc" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
