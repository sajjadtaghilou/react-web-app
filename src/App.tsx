import "./App.css";
import { Provider } from "jotai";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "Base/theme";
import Routes from "Pages/Routes";
import Layout from "Base/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider>
        <GlobalStyles />
        <Routes />
      </Provider>
    </ThemeProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    background-image:linear-gradient(to bottom,${(p) =>
      p.theme.palette.bg.main},${(p) => p.theme.palette.bg.gradient});
    color:${(p) => p.theme.palette.bg.contrast};
  }
`;
