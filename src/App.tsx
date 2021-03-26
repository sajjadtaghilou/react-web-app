import "./App.css";
import Routes from "Pages/Routes";
import "swiper/swiper.min.css";
import useAuth from "Hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { checkIsLogin } = useAuth();
  useEffect(() => {
    checkIsLogin();
  }, []);
  return <Routes />;
}

export default App;
