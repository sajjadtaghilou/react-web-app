import styled from "styled-components";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Meditation, Music } from "Api/GeneratedApi";
import PlayBtn from "./components/PlayBtn";
import LikeBtn from "./components/LikeBtn";
import { usePlayer } from "./usePlayer";
import { ForwardBtn, BackwardBtn } from "./components/SeekButtons";
import PlaylistBtn from "./components/PlaylistBtn";
import { RiCloseLine } from "react-icons/ri";
import { useEffect } from "react";

const Player: React.FC<{
  playlist: (Music | Meditation)[];
  isVisible?: boolean;
  closePlayer: () => void;
  onTrackEnd: (track: Music | Meditation) => void;
  backgroundImage: string;
}> = ({
  isVisible = false,
  playlist,
  onTrackEnd,
  backgroundImage,
  closePlayer,
}) => {
  const { isPlaying, activeIndex, play, pause, forward, rewind } = usePlayer({
    audioList: playlist.flatMap((p) =>
      "lectures" in p
        ? p.lectures.map(({ path }) => ({ path }))
        : { path: p.music_path }
    ),
  });
  const [isPlaylistVisible, toggleIsPlaylistVisible] = useCycle(false, true);
  const [isLiked, toggleIsLiked] = useCycle(false, true); //FIXME
  const [isDimmed, toggleIsDimmed] = useCycle(false, true);
  useEffect(() => {
    toggleIsDimmed(0);
  }, [isVisible]);
  return (
    <Container
      initial={false}
      animate={{
        y: isVisible ? "0%" : "100%",
      }}
      onClick={() => {
        if (isPlaylistVisible) {
          toggleIsPlaylistVisible(0);
        } else {
          toggleIsDimmed();
        }
      }}
    >
      <Background
        bg={backgroundImage}
        transition={{
          delay: 1,
          duration: 100,
          repeat: isVisible ? Infinity : 0, //TODO stop animation when unvisible
          repeatType: "mirror",
        }}
        animate={{ backgroundPosition: "100% 100%" }}
        initial={{ backgroundPosition: "0% 0%" }}
      />
      <CloseBtnContainer
        onClick={() => {
          closePlayer();
        }}
      >
        <RiCloseLine />
      </CloseBtnContainer>
      <ControlsContainer>
        <LikeBtn
          isLiked={isLiked}
          onClick={(e) => {
            e.stopPropagation();
            toggleIsLiked();
          }}
        />
        <ForwardBtn />
        <PlayBtn />
        <BackwardBtn />
        <PlaylistBtn
          onClick={(e) => {
            e.stopPropagation();
            toggleIsPlaylistVisible();
          }}
        />
      </ControlsContainer>
      <AnimatePresence>
        {isPlaylistVisible && (
          <PlaylistContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDimmed && (
          <OverLay
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Player;

const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${(p) => p.theme.zIndex.higher};
  background-color: black;
  opacity: 0.9;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${(p) => p.theme.zIndex.higher};
`;

const CloseBtnContainer = styled.div`
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  font-size: xx-large;
`;

const Background = styled(motion.div)<{ bg: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${(p) => p.bg});
  background-size: cover;
`;

const ControlsContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding: 1em;
  font-size: xx-large;
  position: relative;
`;

const PlaylistContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  padding: 1.5em;
  display: flex;
  background-color: white;
`;
const List = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const ListItem = styled(motion.li)`
  padding: 1em;
  display: flex;
`;
