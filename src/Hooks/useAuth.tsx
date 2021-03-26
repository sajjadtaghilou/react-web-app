import { api } from "Api/Api";
import { Configuration } from "Api/GeneratedApi";
import { AuthAtom } from "Contexts/AuthContext";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useCallback } from "react";

const COOKIE_NAME = "token";

export default function () {
  const [{ isLoggedIn }, setAuthAtom] = useAtom(AuthAtom);

  const loggedIn = useCallback(async (token: string) => {
    Cookies.set(COOKIE_NAME, token, {
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
      expires: 1000,
      path: "/",
      sameSite: "None",
    });
    await api.changeConfig(new Configuration({ accessToken: token }));
    setAuthAtom({ isLoggedIn: true });
    saveTokenToLocalStorage(token);
  }, []);

  const loggedOut = useCallback(() => {
    Cookies.remove(COOKIE_NAME);
    setAuthAtom({ isLoggedIn: false });
    api.changeConfig(new Configuration());
    remoteTokenFromLocalStorage();
  }, []);
  const saveTokenToLocalStorage = useCallback((token: string) => {
    localStorage.setItem(COOKIE_NAME, token);
  }, []);
  const remoteTokenFromLocalStorage = useCallback(() => {
    localStorage.removeItem(COOKIE_NAME);
  }, []);
  const getTokenFromLocalStorage = useCallback(() => {
    return localStorage.getItem(COOKIE_NAME);
  }, []);

  const checkIsLogin = useCallback(async () => {
    const savedToken = getTokenFromLocalStorage();
    console.log({ savedToken });
    if (!savedToken) {
      loggedOut();
      return;
    }
    await loggedIn(savedToken);
    api.getUserAuth().catch(loggedOut);
  }, []);
  return {
    isLoggedIn,
    loggedIn,
    loggedOut,
    checkIsLogin,
  };
}
