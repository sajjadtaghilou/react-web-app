import { DefaultTheme } from "styled-components";

export type PaletteType = {
  main: string;
  gradient: string;
  contrast: string;
  shade: string;
  tint: string;
};

export type PaletteColorKeysType = keyof Omit<
  DefaultTheme["palette"],
  "common" | "card-bg" | "shadow" | "bg"
>;
