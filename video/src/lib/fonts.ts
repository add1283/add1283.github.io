import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const DISPLAY = "Bricolage Grotesque";
export const BODY = "IBM Plex Sans";

export const fontsReady = Promise.all([
  loadFont({ family: DISPLAY, url: staticFile("fonts/bricolage-grotesque-latin-opsz-normal.woff2"), weight: "200 800" }),
  loadFont({ family: DISPLAY, url: staticFile("fonts/bricolage-grotesque-latin-ext-opsz-normal.woff2"), weight: "200 800", unicodeRange: "U+0100-02BA" }),
  loadFont({ family: BODY, url: staticFile("fonts/ibm-plex-sans-latin-400-normal.woff2"), weight: "400" }),
  loadFont({ family: BODY, url: staticFile("fonts/ibm-plex-sans-latin-500-normal.woff2"), weight: "500" }),
  loadFont({ family: BODY, url: staticFile("fonts/ibm-plex-sans-latin-600-normal.woff2"), weight: "600" }),
]);
