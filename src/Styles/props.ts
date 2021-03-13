import { css, DefaultTheme } from "styled-components";
import { PaletteColorKeysType } from "types/paletteType";
import { glowMixinFactory, gradientMixinFactory } from "./mixins";

//color props
export type colorVariantsPropsType = {
  bg?: PaletteColorKeysType;
  color?: PaletteColorKeysType;
  borderColor?: PaletteColorKeysType;
  isGradient?: boolean;
  deg?: string;
  hasGlow?: boolean;
};

export const colorVariantsProps = (
  p: colorVariantsPropsType & { theme: DefaultTheme }
) => css`
  ${p.bg &&
  (p.isGradient
    ? gradientMixinFactory(p.bg, p.deg)
    : css`
        background-color: ${p.theme.palette[p.bg].main};
        color: ${p.theme.palette[p.bg].contrast};
      `)}
  ${p.bg &&
  p.hasGlow &&
  glowMixinFactory({ gradient: gradientMixinFactory(p.bg) })}
  ${p.color &&
  css`
    color: ${p.theme.palette[p.color].main};
  `}
  ${p.borderColor &&
  css`
    color: ${p.theme.palette[p.borderColor].main};
  `}
`;
