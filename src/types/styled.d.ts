// styled.d.ts
import "styled-components";
import { PaletteType } from "./paletteType";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
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
      "card-bg": Omit<PaletteType, "gradient">;
      shadow: Omit<PaletteType, "gradient">;
    };
  }
}
