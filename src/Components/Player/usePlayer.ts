import { useCallback, useEffect, useRef, useState } from "react";

export type audioType = { path: string | null };

const SEEK_SECONDS = 10;
export function usePlayer(path: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  audioRef.current.preload = "none";
  useEffect(() => {
    audioRef.current.src = path;
  }, [path]);
  const play = useCallback(() => {
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
    play,
    pause,
    forward,
    rewind,
  };
}
