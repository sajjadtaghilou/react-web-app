import { transparentize } from "polished";
import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { BsArrowClockwise } from "react-icons/bs";
import { motion } from "framer-motion";

export const ForwardBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Container {...props}>
      <BsArrowClockwise />
    </Container>
  );
};

export const BackwardBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Container {...props} style={{ transform: "scaleX(-1)" }}>
      <BsArrowClockwise />
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
`;
