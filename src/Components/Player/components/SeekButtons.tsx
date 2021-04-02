import { transparentize } from "polished";
import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { BsArrowClockwise, BsArrowRepeat } from "react-icons/bs";
import { motion } from "framer-motion";
import { CgShare } from "react-icons/cg";

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

export const RepeatBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Container {...props}>
      <BsArrowRepeat />
    </Container>
  );
};
export const ShareBtn: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Container {...props}>
      <CgShare />
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
  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.3;
    `}
`;
