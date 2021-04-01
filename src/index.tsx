import React from "react";
import ReactDOM from "react-dom";
import "Styles/reset.css";
import "Styles/base.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "Base/theme";
import { MotionConfig } from "framer-motion";
import { QueryClientProvider } from "react-query";
import { queryClient } from "Configs/queryConfigs";
import SnackbarProvider from "react-simple-snackbar";

const GlobalStyles = createGlobalStyle`
  body {
    background-color:${(p) => p.theme.palette.bg.contrast};
    background-image:linear-gradient(to bottom,${(p) =>
      p.theme.palette.bg.main},${(p) => p.theme.palette.bg.gradient});
    color:${(p) => p.theme.palette.bg.contrast};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MotionConfig transition={{ ease: "easeIn" }}>
            <JotaiProvider>
              <SnackbarProvider>
                <GlobalStyles />
                <App />
              </SnackbarProvider>
            </JotaiProvider>
          </MotionConfig>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
