import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";
import { BsArrowClockwise } from "react-icons/bs";
import { motion } from "framer-motion";

export const ForwardBtn: React.FC = () => {
  return (
    <Container>
      <BsArrowClockwise />
    </Container>
  );
};

export const BackwardBtn: React.FC = () => {
  return (
    <Container style={{ transform: "scaleX(-1)" }}>
      <BsArrowClockwise />
    </Container>
  );
};

const Container = styled(motion.button)`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
`;
