import { User } from "Api/GeneratedApi";
import { atom } from "jotai";

const COOKIE_NAME = "token";

const getTokenFromLocalStorage = (): {
  token: string;
  user: User;
} | null => {
  const savedToken = localStorage.getItem(COOKIE_NAME);
  if (!savedToken) return null;
  return JSON.parse(savedToken);
};

export const AuthAtom = atom<{ isLoggedIn: boolean; user: User | null }>({
  isLoggedIn: !!getTokenFromLocalStorage(),
  user: getTokenFromLocalStorage()?.user || null,
});
