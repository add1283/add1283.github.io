import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { continueRender, delayRender, useRemotionEnvironment } from "remotion";
import { Vector2 } from "three";
import type { State } from "../lib/director";

/**
 * The composer finishes setting up after the canvas's first advance, so a tab's
 * first frame would be captured black. Hold that frame and draw it once more.
 */
const Warmup: React.FC = () => {
  const { advance } = useThree();
  const { isRendering } = useRemotionEnvironment();
  useEffect(() => {
    if (!isRendering) return;
    const handle = delayRender("Warming up the effect composer");
    requestAnimationFrame(() => {
      advance(performance.now());
      requestAnimationFrame(() => {
        advance(performance.now());
        continueRender(handle);
      });
    });
  }, [advance, isRendering]);
  return null;
};

/** Bloom follows the music's energy; chromatic aberration spikes on cuts and the drop. */
export const Effects: React.FC<{ state: State }> = ({ state }) => {
  const offset = useMemo(() => new Vector2(), []);
  offset.set(state.chroma, state.chroma * 0.6);
  return (
    <>
      <Warmup />
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={state.bloom}
          luminanceThreshold={0.78}
          luminanceSmoothing={0.25}
          radius={0.75}
        />
        <ChromaticAberration
          offset={offset}
          radialModulation
          modulationOffset={0.25}
          blendFunction={BlendFunction.NORMAL}
        />
        <Vignette offset={0.28} darkness={0.72} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
};
