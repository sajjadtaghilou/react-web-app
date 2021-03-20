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
    ? css`
        ${gradientMixinFactory(p.bg, p.deg)};
        color: ${p.theme.palette.common.white};
      `
    : css`
        background-color: ${p.theme.palette[p.bg].main};
        color: ${p.theme.palette[p.bg].contrast};
      `)}
  ${p.bg &&
  p.hasGlow &&
  css`
    ${glowMixinFactory({ gradient: gradientMixinFactory(p.bg) })};
    & {
      overflow: visible;
    }
  `}
  ${p.color &&
  css`
    color: ${p.theme.palette[p.color].main};
  `}
  ${p.borderColor &&
  css`
    color: ${p.theme.palette[p.borderColor].main};
  `}
`;
