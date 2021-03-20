import "./App.css";
import { Provider } from "jotai";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "Base/theme";
import Routes from "Pages/Routes";
import { MotionConfig } from "framer-motion";
import Layout from "Base/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MotionConfig transition={{ ease: "easeIn" }}>
        <Provider>
          <GlobalStyles />
          <Routes />
        </Provider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    background-color:${(p) => p.theme.palette.bg.contrast};
    background-image:linear-gradient(to bottom,${(p) =>
      p.theme.palette.bg.main},${(p) => p.theme.palette.bg.gradient});
    color:${(p) => p.theme.palette.bg.contrast};
  }
`;
