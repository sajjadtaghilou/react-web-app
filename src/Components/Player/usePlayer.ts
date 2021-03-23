import { useCallback, useRef, useState } from "react";

export type audioType = { path: string };

const SEEK_SECONDS = 10;
export function usePlayer({ audioList }: { audioList: audioType[] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef(new Audio());
  const play = useCallback((index: number) => {
    audioRef.current.src = audioList[index].path;
    audioRef.current.play(); //TODO onload maybe?
    setIsPlaying(true);
  }, []);
  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);
  const forward = useCallback(() => {
    // audioRef.current.loop
    audioRef.current.currentTime =
      audioRef.current.duration - audioRef.current.currentTime < SEEK_SECONDS
        ? audioRef.current.duration
        : audioRef.current.currentTime + SEEK_SECONDS;
  }, []);
  const rewind = useCallback(() => {
    audioRef.current.currentTime =
      audioRef.current.currentTime < SEEK_SECONDS
        ? 0
        : audioRef.current.currentTime - SEEK_SECONDS;
  }, []);
  // const next, prev, reset
  return {
    isPlaying,
    activeIndex,
    play,
    pause,
    forward,
    rewind,
  };
}
