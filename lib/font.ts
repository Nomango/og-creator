import { ImageResponse } from "next/og";

type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = "normal" | "italic";
type Font = {
  data: Buffer | ArrayBuffer;
  name: string;
  weight?: Weight;
  style?: FontStyle;
  lang?: string;
};

async function remoteFont(
  url: string,
  font: Omit<Font, "data">
): Promise<Font> {
  const fontFile = await fetch(url);
  const data: ArrayBuffer = await fontFile.arrayBuffer();
  return {
    ...font,
    data: data,
  };
}

async function localFont(
  path: string,
  font: Omit<Font, "data">
): Promise<Font> {
  const fontData = await fetch(new URL(path, import.meta.url)).then((res) =>
    res.arrayBuffer()
  );
  return {
    ...font,
    data: fontData,
  };
}

export async function collectFonts(): Promise<Font[]> {
  if (1) {
    return Promise.all([
      localFont("../assets/fonts/ibm-plex-mono_5.0.8_latin-400-normal.ttf", {
        name: "IBM Plex Mono",
        weight: 400,
        style: "normal",
      }),
      localFont("../assets/fonts/ibm-plex-mono_5.0.8_latin-600-normal.ttf", {
        name: "IBM Plex Mono",
        weight: 600,
        style: "normal",
      }),
      localFont(
        "../assets/fonts/noto-sans-sc_5.0.17_chinese-simplified-400-normal.woff",
        {
          name: "Noto Sans SC",
          weight: 400,
          style: "normal",
        }
      ),
      localFont(
        "../assets/fonts/noto-sans-sc_5.0.17_chinese-simplified-600-normal.woff",
        {
          name: "Noto Sans SC",
          weight: 600,
          style: "normal",
        }
      ),
    ]);
  }
  return Promise.all([
    remoteFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.ttf",
      {
        name: "IBM Plex Mono",
        weight: 400,
        style: "normal",
      }
    ),
    remoteFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.ttf",
      {
        name: "IBM Plex Mono",
        weight: 600,
        style: "normal",
      }
    ),
    remoteFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.woff",
      {
        name: "Noto Sans SC",
        weight: 400,
        style: "normal",
      }
    ),
    remoteFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-600-normal.woff",
      {
        name: "Noto Sans SC",
        weight: 600,
        style: "normal",
      }
    ),
  ]);
}
