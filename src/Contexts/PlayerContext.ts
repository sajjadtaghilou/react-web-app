import { Meditation, Music } from "Api/GeneratedApi";
import { atom } from "jotai";

export const PlayerAtom = atom<{
  isVisible: boolean;
  list: (Music | Meditation)[];
  isPlaying: boolean;
  currentActiveIndex: number;
}>({
  isVisible: false,
  list: [],
  isPlaying: false,
  currentActiveIndex: 0,
});
