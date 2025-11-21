// src/components/Particles.d.ts
import { FC } from "react";

export interface TextTypeProps {
  label: string;
  className: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: any;
  radius: number;
  falloff: string;
}

declare const TextType: FC<TextTypeProps>;
export default TextType;
