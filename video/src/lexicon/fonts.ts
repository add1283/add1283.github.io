import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT =
  "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

/** Loads one family in the given weights, Latin and Latin Extended (Turkish). */
const family = (name: string, file: string, weights: number[], style: "normal" | "italic" = "normal") =>
  weights.flatMap((w) =>
    [
      ["latin", LATIN],
      ["latin-ext", LATIN_EXT],
    ].map(([subset, range]) =>
      loadFont({ family: name, url: staticFile(`fonts2/${file}-${subset}-${w}-${style}.woff2`), weight: String(w), style, unicodeRange: range }),
    ),
  );

export const F = {
  grotesk: "Inter Tight",
  serif: "Instrument Serif",
  plex: "IBM Plex Sans",
  mono: "IBM Plex Mono",
};

export const lexiconFonts = Promise.all([
  ...family(F.grotesk, "inter-tight", [400, 500, 600, 700, 800]),
  ...family(F.serif, "instrument-serif", [400]),
  ...family(F.serif, "instrument-serif", [400], "italic"),
  ...family(F.plex, "ibm-plex-sans", [400, 500, 600, 700]),
  ...family(F.mono, "ibm-plex-mono", [400, 500]),
]);
