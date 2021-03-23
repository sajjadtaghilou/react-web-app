// styled.d.ts
import "styled-components";
import { PaletteType } from "./paletteType";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    zIndex: {
      high: number;
      higher: number;
      highest: number;
    };
    palette: {
      common: {
        black: string;
        white: string;
        dark: strnig;
        darker: string;
        light: string;
        lighter: strnig;
      };
      primary: PaletteType;
      secondary: PaletteType;
      tertiary: PaletteType;
      fourth: PaletteType;
      bg: PaletteType;
      "card-bg": PaletteType;
      shadow: Omit<PaletteType, "gradient">;
    };
  }
}
