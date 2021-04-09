import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  borderRadius: "1rem",
  zIndex: {
    high: 1,
    higher: 10,
    highest: 100,
  },
  palette: {
    primary: {
      main: "#dccd7c",
      gradient: "#a99c56",
      contrast: "#000128",
      shade: "#a99c56",
      tint: "#ecde90",
    },
    secondary: {
      main: "#3da1b8",
      gradient: "#00476d",
      contrast: "#062345",
      shade: "#00476d",
      tint: "#44ceec",
    },
    tertiary: {
      main: "#a8df5d",
      gradient: "#30cfbb",
      contrast: "#000000",
      shade: "#94c452",
      tint: "#b1e26d",
    },
    fourth: {
      main: "#ffb59c",
      gradient: "#f88dbb",
      contrast: "#000000",
      shade: "#e09f89",
      tint: "#ffbca6",
    },
    bg: {
      main: "#000128",
      gradient: "#1a1a3e",
      contrast: "#ffffff",
      shade: "#000123",
      tint: "#1a1a3e",
    },
    "card-bg": {
      main: "#061641",
      contrast: "#ffffff",
      shade: "#051339",
      tint: "#1f2d54",
      gradient: "#1f2d54",
    },
    shadow: {
      main: "#262e45",
      contrast: "#ffffff",
      shade: "#21283d",
      tint: "#3c4358",
    },
    common: {
      black: "#000",
      white: "#fff",
      dark: "#555",
      darker: "#333",
      light: "#bbb",
      lighter: "#ddd",
    },
  },
};
