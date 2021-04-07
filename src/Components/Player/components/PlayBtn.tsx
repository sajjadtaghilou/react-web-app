import { transparentize } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { IoPlay, IoPause } from "react-icons/io5";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const PlayBtn: React.FC<{
  big?: boolean;
  isPlaying?: boolean;
  handleClick?: () => void;
  isOpaque?: boolean;
}> = ({ big, isPlaying, handleClick, isOpaque }) => {
  return (
    <Container
      isOpaque={isOpaque}
      big={big}
      onClick={(e) => {
        e.stopPropagation();
        handleClick && handleClick();
      }}
    >
      <AnimatePresence>
        {!isPlaying && (
          <IoPlay style={{ position: "relative", left: "0.1em" }} />
        )}
        {isPlaying && <IoPause />}
      </AnimatePresence>
    </Container>
  );
};

export default PlayBtn;

const Container = styled(motion.button)<{ big?: boolean; isOpaque?: boolean }>`
  display: flex;
  border: none;
  color: ${(p) => (p.isOpaque ? "black" : "white")};
  background-color: ${(p) =>
    p.isOpaque ? "white" : transparentize(0.85, p.theme.palette.common.white)};
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
  backdrop-filter: blur(0.07em);
  ${(p) =>
    p.big &&
    css`
      font-size: 2.5rem;
      padding: 0.3em 0.4em 0.3em 0.3em;
      border: 3px solid white;
    `}
`;
