import { Composition } from "remotion";
import { ADD } from "./ADD";
import { DURATION, FPS } from "./lib/timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ADD" component={ADD} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} />
    {/* Half-size version for quick previews and storyboard frames. */}
    <Composition id="ADD-preview" component={ADD} durationInFrames={DURATION} fps={FPS} width={540} height={960} />
  </>
);
