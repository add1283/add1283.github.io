import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useLayoutEffect, useRef, useState } from "react";
import { continueRender, delayRender, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { fontsReady } from "../lib/fonts";

gsap.registerPlugin(SplitText);

export interface Line {
  text: string;
  style: React.CSSProperties;
  /** Split into characters (headlines) or words (supporting lines). */
  split?: "chars" | "words";
  /** Seconds after the block enters. */
  delay?: number;
}

interface Props {
  /** Frames, absolute in the composition. */
  from: number;
  to: number;
  lines: Line[];
  style?: React.CSSProperties;
  /** Faster in/out for rapid sections. */
  quick?: boolean;
  /** Keep on screen until the end instead of animating out. */
  hold?: boolean;
}

/**
 * A text block whose GSAP timeline is built once, paused, and then seeked to the
 * current frame, so every render of a frame is identical.
 */
const Block: React.FC<Omit<Props, "from" | "to"> & { duration: number }> = ({ lines, style, quick, hold, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);
  const [handle] = useState(() => delayRender("Building text timeline"));
  const frameRef = useRef(frame);
  frameRef.current = frame;

  useLayoutEffect(() => {
    let timeline: gsap.core.Timeline | null = null;
    const splits: SplitText[] = [];
    fontsReady.then(() => {
      timeline = gsap.timeline({ paused: true });
      const inDur = quick ? 0.42 : 0.8;
      const outAt = duration - (quick ? 0.18 : 0.38);
      lines.forEach((line, i) => {
        const el = refs.current[i];
        if (!el) return;
        const type = line.split ?? "words";
        // Split chars inside words, so lines only break between words.
        const split = new SplitText(el, { type: type === "chars" ? "words,chars" : "words", mask: type });
        splits.push(split);
        const parts = type === "chars" ? split.chars : split.words;
        timeline!.from(
          parts,
          { yPercent: 115, rotate: quick ? 0 : 4, duration: inDur, ease: "expo.out", stagger: type === "chars" ? (quick ? 0.012 : 0.022) : 0.05 },
          line.delay ?? i * (quick ? 0.06 : 0.12),
        );
        if (!hold) {
          timeline!.to(parts, { yPercent: -115, duration: quick ? 0.16 : 0.32, ease: "power3.in", stagger: type === "chars" ? 0.006 : 0.02 }, outAt);
        }
      });
      // Put the timeline on the current frame before the frame is released.
      timeline.seek(frameRef.current / fps, false);
      setTl(timeline);
      continueRender(handle);
    });
    return () => {
      timeline?.kill();
      splits.forEach((s) => s.revert());
    };
    // Each block's content is fixed, so the timeline is built once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    tl?.seek(frame / fps, false);
  }, [tl, frame, fps]);

  return (
    <div style={{ position: "absolute", left: 80, right: 80, ...style }}>
      {lines.map((l, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={l.style}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
};

export const Kinetic: React.FC<Props> = ({ from, to, ...rest }) => (
  <Sequence from={Math.round(from)} durationInFrames={Math.max(1, Math.round(to - from))} layout="none" name={rest.lines[0]?.text}>
    <Block {...rest} duration={(to - from) / 30} />
  </Sequence>
);
