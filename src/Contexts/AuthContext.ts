import { User } from "Api/GeneratedApi";
import { atom } from "jotai";

export const AuthAtom = atom<{ isLoggedIn: boolean; user: User | null }>({
  isLoggedIn: false,
  user: null,
});
