import { Composition } from "remotion";
import { ADD } from "./ADD";
import { StyleFrame } from "./lexicon/StyleFrames";
import { Lexicon } from "./lexicon/Lexicon";
import { DURATION, FPS } from "./lib/timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ADD" component={ADD} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
    <Composition id="Lexicon" component={Lexicon} durationInFrames={60 * 60} fps={60} width={1080} height={1920} defaultProps={{ music: true }} />
    <Composition id="Lexicon-preview" component={Lexicon} durationInFrames={60 * 30} fps={30} width={540} height={960} defaultProps={{ music: true }} />
    <Composition id="Style" component={StyleFrame} durationInFrames={1} fps={30} width={1080} height={1920} defaultProps={{ dir: "swiss" as const, shot: "identity" as const }} />
    {/* Half-size version for quick previews and storyboard frames. */}
    <Composition id="ADD-preview" component={ADD} durationInFrames={DURATION} fps={FPS} width={540} height={960} />
  </>
);
