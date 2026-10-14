import { Audio } from "@remotion/media";
import React, { useState } from "react";
import { AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ActCraft, ActIdentity, ActSignal } from "./ActsOpening";
import { ActPortfolio } from "./ActPortfolio";
import { ActHuman, ActSignature, ActSystems } from "./ActsClosing";
import { lexiconFonts } from "./fonts";
import { MUSIC, TimeContext, Track, setTrack } from "./lib";
import { P } from "./tokens";

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: 0.055, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id="lexicon-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={Math.floor(frame / 2) % 61} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#lexicon-grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Project Lexicon: a 60-second vertical portfolio film. Every act reads the
 * current time in seconds, so the cut holds at any frame rate.
 */
export const Lexicon: React.FC<{ music?: boolean; track?: Track }> = ({ music = true, track = "papaoutai" }) => {
  setTrack(track);
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const [handle] = useState(() => delayRender("Loading Lexicon fonts"));
  const [ready, setReady] = useState(false);
  useState(() => {
    lexiconFonts.then(() => {
      setReady(true);
      continueRender(handle);
    });
    return null;
  });

  return (
    <AbsoluteFill style={{ background: P.graphite }}>
      {music && <Audio src={staticFile(MUSIC[track])} />}
      {ready && (
        <TimeContext.Provider value={frame / fps}>
          {/* Laid out on a 1080 × 1920 grid and scaled to the output size. */}
          <AbsoluteFill style={{ width: 1080, height: 1920, scale: String(width / 1080), transformOrigin: "0 0", overflow: "hidden" }}>
            <ActSignal />
            <ActIdentity />
            <ActCraft />
            <ActPortfolio />
            <ActSystems />
            <ActHuman />
            <ActSignature />
          </AbsoluteFill>
        </TimeContext.Provider>
      )}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
      <Grain />
    </AbsoluteFill>
  );
};
