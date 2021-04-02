import styled from "styled-components";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Meditation, Music } from "Api/GeneratedApi";
import PlayBtn from "./components/PlayBtn";
import LikeBtn from "./components/LikeBtn";
import { usePlayer } from "./usePlayer";
import {
  ForwardBtn,
  BackwardBtn,
  RepeatBtn,
  ShareBtn,
} from "./components/SeekButtons";
import PlaylistBtn from "./components/PlaylistBtn";
import { RiCloseLine } from "react-icons/ri";
import { useEffect } from "react";
import { fullRoundedMixin } from "Styles/mixins";

const Player: React.FC<{
  isVisible?: boolean;
  closePlayer: () => void;
  onTrackEnd: (track: Music | Meditation) => void;
  backgroundImage: string;
  path: string;
}> = ({
  isVisible = false,
  onTrackEnd,
  backgroundImage,
  closePlayer,
  path,
}) => {
  const {
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
  } = usePlayer(path);
  const [isPlaylistVisible, toggleIsPlaylistVisible] = useCycle(false, true);
  const [isLiked, toggleIsLiked] = useCycle(false, true); //FIXME
  const [isDimmed, toggleIsDimmed] = useCycle(false, true);
  useEffect(() => {
    toggleIsDimmed(0);
    if (!isVisible) {
      pause();
    }
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
          repeat: Infinity, //TODO stop animation when unvisible
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
        <SliderContainer>
          <Slider
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              seekTo(parseInt(e.target.value));
            }}
          />
        </SliderContainer>
        <ButtonsContainer>
          <ShareBtn style={{ opacity: 0 }} />
          <ForwardBtn
            onClick={(e) => {
              e.stopPropagation();
              forward();
            }}
          />
          <PlayBtn
            isPlaying={isPlaying}
            handleClick={isPlaying ? pause : play}
          />
          <BackwardBtn
            onClick={(e) => {
              e.stopPropagation();
              rewind();
            }}
          />
          <RepeatBtn
            style={{ opacity: hasRepeat ? 1 : 0.5 }}
            onClick={(e) => {
              e.stopPropagation();
              setHasRepeat(!hasRepeat);
            }}
          />
        </ButtonsContainer>
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
      <CurrentTime>{remainingTime}</CurrentTime>
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
  border-radius: 100%;
  background-color: #00000022;
  color: white;
  height: 1em;
  width: 1em;
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
  flex-direction: column;
  margin-top: auto;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0.3em 1em 1em 1em;
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

const CurrentTime = styled.h1`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  direction: ltr;
  letter-spacing: 0.05em;
`;

const SliderContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Slider = styled.input`
  direction: ltr;
  -webkit-appearance: none;
  width: 100%;
  margin: 0 auto;
  height: 0.3rem;
  background: #d3d3d388;
  outline: none;
  opacity: 0.9;
  ${fullRoundedMixin};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    background: white;
    cursor: pointer;
    border-radius: 100%;
  }

  &::-moz-range-thumb {
    width: 1rem;
    height: 1rem;
    background: white;
    cursor: pointer;
    border-radius: 100%;
  }
`;
