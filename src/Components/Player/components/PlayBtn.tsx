import { transparentize } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { IoPlay, IoPause } from "react-icons/io5";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const PlayBtn: React.FC<{ big?: boolean }> = ({ big }) => {
  const [s, ss] = useCycle(false, true);
  return (
    <Container
      big={big}
      onClick={(e) => {
        e.stopPropagation();
        ss();
      }}
    >
      <AnimatePresence>
        {!s && <IoPlay style={{ position: "relative", left: "0.1em" }} />}
        {s && <IoPause />}
      </AnimatePresence>
    </Container>
  );
};

export default PlayBtn;

const Container = styled(motion.button)<{ big?: boolean }>`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
  background-color: ${(p) =>
    transparentize(0.85, p.theme.palette.common.white)};
  backdrop-filter: blur(0.07em);
  ${(p) =>
    p.big &&
    css`
      font-size: 1.8rem;
      padding: 0.3em 0.2em 0.3em 0.4em;
    `}
`;
