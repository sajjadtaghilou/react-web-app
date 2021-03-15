import { transparentize } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { IoPlayOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const PlayBtn: React.FC<{ big?: boolean }> = ({ big }) => {
  return (
    <Container big={big}>
      <IoPlayOutline />
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
  padding: 0.5em 0.4em 0.5em 0.6em;
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
