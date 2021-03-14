import { atom } from "jotai";

export const LayoutAtom = atom<{ isFullscreen: boolean }>({
  isFullscreen: false,
});
