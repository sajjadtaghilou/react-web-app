import React from "react";
import styled from "styled-components";
import { RiPlayList2Fill } from "react-icons/ri";

const PlaylistBtn: React.FC<React.DOMAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Container {...props}>
      <RiPlayList2Fill />
    </Container>
  );
};

export default PlaylistBtn;

const Container = styled.button`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
  position: relative;
`;
