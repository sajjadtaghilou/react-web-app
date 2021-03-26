import { atom } from "jotai";

export const AuthAtom = atom<{ isLoggedIn: boolean }>({
  isLoggedIn: false,
});
