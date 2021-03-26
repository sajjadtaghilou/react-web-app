import { api } from "Api/Api";
import { Configuration, User } from "Api/GeneratedApi";
import { AuthAtom } from "Contexts/AuthContext";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useCallback } from "react";

const COOKIE_NAME = "token";

export default function () {
  const [{ isLoggedIn }, setAuthAtom] = useAtom(AuthAtom);

  const loggedIn = useCallback((token: string, user: User) => {
    Cookies.set(COOKIE_NAME, token, {
      domain: process.env.REACT_APP_COOKIE_DOMAIN,
      expires: 1000,
      path: "/",
      sameSite: "None",
    });
    api.changeConfig(new Configuration({ accessToken: token }));
    setAuthAtom({ isLoggedIn: true, user });
    saveTokenToLocalStorage(token, user);
  }, []);

  const loggedOut = useCallback(() => {
    Cookies.remove(COOKIE_NAME);
    setAuthAtom({ isLoggedIn: false, user: null });
    api.changeConfig(new Configuration());
    remoteTokenFromLocalStorage();
  }, []);

  const checkIsLogin = useCallback(() => {
    const savedToken = getTokenFromLocalStorage();
    if (!savedToken) {
      loggedOut();
      return;
    }
    loggedIn(savedToken.token, savedToken.user);
    api
      .getUserAuth()
      .then(({ data: { user } }) => loggedIn(savedToken.token, user))
      .catch(loggedOut);
  }, []);
  return {
    isLoggedIn,
    loggedIn,
    loggedOut,
    checkIsLogin,
  };
}

//localstorage
const saveTokenToLocalStorage = (token: string, user: User) => {
  localStorage.setItem(COOKIE_NAME, JSON.stringify({ token, user }));
};

const remoteTokenFromLocalStorage = () => {
  localStorage.removeItem(COOKIE_NAME);
};

const getTokenFromLocalStorage = (): {
  token: string;
  user: User;
} | null => {
  const savedToken = localStorage.getItem(COOKIE_NAME);
  if (!savedToken) return null;
  return JSON.parse(savedToken);
};
