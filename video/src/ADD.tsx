import { Audio } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { getState } from "./lib/director";
import { C } from "./lib/palette";
import { Overlay } from "./overlay/Overlay";
import { Effects } from "./scene/Effects";
import { World } from "./scene/World";

/** ADD: a 60-second vertical portfolio film, cut to the beat of the track. */
export const ADD: React.FC<{ noEffects?: boolean; noOverlay?: boolean }> = ({ noEffects, noOverlay }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const state = useMemo(() => getState(frame, fps), [frame, fps]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.void }}>
      <Audio src={staticFile("music.m4a")} />
      <ThreeCanvas width={width} height={height} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}>
        <World state={state} height={height} />
        {!noEffects && <Effects state={state} />}
      </ThreeCanvas>
      {/* Type is laid out on a 1080 × 1920 grid and scaled to the output size. */}
      {!noOverlay && (
        <AbsoluteFill style={{ width: 1080, height: 1920, scale: String(width / 1080), transformOrigin: "0 0" }}>
          <Overlay state={state} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
