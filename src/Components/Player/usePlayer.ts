import { useCallback, useEffect, useRef, useState } from "react";

export type audioType = { path: string | null };

const SEEK_SECONDS = 10;
export function usePlayer(path: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [hasRepeat, setHasRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());
  audioRef.current.preload = "none";

  useEffect(() => {
    audioRef.current.src = path;

    function onLoadedMetadata(this: HTMLAudioElement, ev: Event) {
      setDuration(parseInt(this.duration + ""));
    }

    function ontimeUpdate(this: HTMLAudioElement, ev: Event) {
      if (this.duration) {
        setRemainingTime(secondsToTimeFormat(this.duration - this.currentTime));
        setCurrentTime(this.currentTime);
      }
    }

    function onPaused(this: HTMLAudioElement, ev: Event) {
      setIsPlaying(false);
    }
    function onPlayed(this: HTMLAudioElement, ev: Event) {
      setIsPlaying(true);
    }

    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);

    audioRef.current.addEventListener("pause", onPaused);
    audioRef.current.addEventListener("play", onPlayed);
    audioRef.current.addEventListener("timeupdate", ontimeUpdate);
    return () => {
      audioRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioRef.current.removeEventListener("timeupdate", ontimeUpdate);
      audioRef.current.removeEventListener("pause", onPaused);
      audioRef.current.removeEventListener("play", onPlayed);
    };
  }, [path]);
  useEffect(() => {
    function onEnded(this: HTMLAudioElement, ev: Event) {
      this.currentTime = 0;
      if (hasRepeat) this.play();
    }
    audioRef.current.addEventListener("ended", onEnded);
    return () => {
      audioRef.current.removeEventListener("ended", onEnded);
    };
  }, [hasRepeat]);

  const play = useCallback(() => {
    audioRef.current.play(); //TODO onload maybe?
  }, []);

  const pause = useCallback(() => {
    audioRef.current.pause();
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

  const seekTo = useCallback((time: number) => {
    audioRef.current.currentTime = time;
  }, []);

  // const next, prev, reset
  return {
    isPlaying,
    play,
    pause,
    forward,
    rewind,
    remainingTime,
    hasRepeat,
    setHasRepeat,
    currentTime,
    duration,
    seekTo,
  };
}

const addLeadingZero = (str: string): string =>
  str.length > 1 ? str : "0" + str;

const secondsToTimeFormat = (Totalseconds: number): string => {
  const hour = parseInt(Totalseconds / 60 / 60 + "") + "";
  const minute = parseInt(((Totalseconds / 60) % 60) + "") + "";
  const seconds = parseInt((Totalseconds % 60) + "") + "";
  return `${Number(hour) ? addLeadingZero(hour) + " : " : ""}${addLeadingZero(
    minute
  )} : ${addLeadingZero(seconds)}`;
};
