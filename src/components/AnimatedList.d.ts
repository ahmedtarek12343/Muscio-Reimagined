// src/components/Particles.d.ts
import { FC } from "react";

export interface TextTypeProps {
  items: (song: SongType) => void; // map song names
  showGradients: boolean;
  enableArrowNavigation: boolean;
  displayScrollbar: boolean;
}

declare const TextType: FC<TextTypeProps>;
export default TextType;
