// src/components/Particles.d.ts
import { FC } from "react";

export interface TextTypeProps {
  text: string[];
  typingSpeed: number;
  pauseDuration: number;
  showCursor: boolean;
  textColors: string[];
  cursorCharacter: string;
}

declare const TextType: FC<TextTypeProps>;
export default TextType;
