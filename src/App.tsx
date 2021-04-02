import "./App.css";
import Routes from "Pages/Routes";
import "swiper/swiper.min.css";
import useAuth from "Hooks/useAuth";
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const { checkIsLogin, isLoggedIn } = useAuth();
  useEffect(() => {
    checkIsLogin();
  }, []);
  return (
    <>
      <ReactQueryDevtools
        panelProps={{ style: { direction: "ltr", textAlign: "left" } }}
        position="top-left"
      />
      <Routes />
    </>
  );
}

export default App;
