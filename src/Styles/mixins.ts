import { PaletteColorKeysType } from "types/paletteType";
import {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from "styled-components";

//shadow
export const bluryShadowMixin = css`
  box-shadow: 0px 0px 40px -10px ${(p) => p.theme.palette.bg.gradient};
`;
export const smallShadowMixin = css`
  box-shadow: 0px 0px 20px 1px ${(p) => p.theme.palette.bg.gradient};
`;
export const bigShadowMixin = css`
  box-shadow: 0px 0px 22px 7px ${(p) => p.theme.palette.bg.gradient};
`;
export const glowMixinFactory = ({
  gradient,
  position,
  size,
  opacity,
}: {
  gradient: FlattenInterpolation<ThemeProps<DefaultTheme>>;
  position?: "top" | "left" | "right" | "bottom";
  size?: "small" | "large";
  opacity?: number;
}) => css`
  position: relative;
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    filter: blur(${size === "large" ? "1em" : "0.5em"});
    content: " ";
    opacity: ${opacity || 1};
    ${gradient};
    ${!!position &&
    css`
      transform: scale(0.9)
        ${position === "bottom"
          ? "translateY(1em)"
          : position === "top"
          ? "translateY(-1em)"
          : position === "left"
          ? "translateX(-1em)"
          : "translateX(1em)"};
    `}
  }
`;

//radius
export const roundedMixin = css`
  border-radius: 0.5em;
`;
export const fullRoundedMixin = css`
  border-radius: 999em;
`;

//gradients
export const gradientMixinFactory = (
  key: PaletteColorKeysType,
  deg?: string
) => css`
  background-image: linear-gradient(
    ${deg || "to right"},
    ${(p) => p.theme.palette[key].main},
    ${(p) => p.theme.palette[key].gradient}
  );
`;

//space
export const spaceXMixinFactory = (size: "small" | "large") => css`
  & > * + * {
    margin-right: ${size === "large" ? "1em" : "0.5em"};
  }
`;
export const spaceYMixinFactory = (size: "small" | "large") => css`
  & > * + * {
    margin-top: ${size === "large" ? "1em" : "0.5em"};
  }
`;
