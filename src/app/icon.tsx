import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: "white",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        FR
      </div>
    ),
    {
      ...size,
    }
  );
}

