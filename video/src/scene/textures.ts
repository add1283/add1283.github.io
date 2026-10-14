import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { SRGBColorSpace, Texture, TextureLoader } from "three";

/** Loads textures once and holds the render until they are ready. */
export const useTextures = (urls: string[]) => {
  const [textures, setTextures] = useState<Texture[] | null>(null);
  const [handle] = useState(() => delayRender(`Loading ${urls.length} textures`));
  const key = urls.join("|");

  useEffect(() => {
    let cancelled = false;
    const loader = new TextureLoader();
    Promise.all(
      urls.map(
        (u) =>
          new Promise<Texture>((resolve, reject) =>
            loader.load(
              u,
              (t) => {
                t.colorSpace = SRGBColorSpace;
                t.anisotropy = 8;
                resolve(t);
              },
              undefined,
              reject,
            ),
          ),
      ),
    )
      .then((list) => {
        if (!cancelled) setTextures(list);
        else continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
    return () => {
      cancelled = true;
    };
    // urls is captured through `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, handle]);

  // Release the frame only once the textures are in React state and on screen.
  useEffect(() => {
    if (textures) continueRender(handle);
  }, [textures, handle]);

  return textures;
};
