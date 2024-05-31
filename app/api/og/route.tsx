import { collectFonts } from "@/lib/font";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
  // Make sure the font exists in the specified path:
  const fonts = await collectFonts();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
