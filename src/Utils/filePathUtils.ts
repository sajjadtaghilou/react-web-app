import { MeditationLecture, Music, User } from "Api/GeneratedApi";
import { checkUserHasSubscribtion } from "./userUtils";

export const getImageAbsolutePath = (path: string) =>
  `${process.env.REACT_APP_PUBLIC_PATH}${path}`;

export const getMusicAbsolutePath = (music: Music, user: User): string => {
  const isPremium = checkUserHasSubscribtion(user);
  return isPremium || music.is_free
    ? `${process.env.REACT_APP_MUSIC_STORAGE}${music.id}`
    : `${process.env.REACT_APP_PUBLIC_PATH}${music.sample_path}`;
};

export const getMeditationLectureAbsolutePath = (
  meditationLecture: MeditationLecture,
  user: User
): string | null => {
  const isPremium = checkUserHasSubscribtion(user);
  return isPremium || meditationLecture.is_free
    ? `${process.env.REACT_APP_MEDITATION_STORAGE}${meditationLecture.id}`
    : null;
};
