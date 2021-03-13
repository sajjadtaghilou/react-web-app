import { transparentize } from "polished";
import React from "react";
import { BsPlay } from "react-icons/bs";

import styled from "styled-components";

const PlayBtn: React.FC = () => {
  return (
    <Container>
      <BsPlay />
    </Container>
  );
};

export default PlayBtn;

const Container = styled.button`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
  background-color: ${(p) => transparentize(0.8, p.theme.palette.common.white)};
  backdrop-filter: blur(1em);
`;
