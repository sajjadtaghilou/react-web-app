import { transparentize } from "polished";
import React from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container>
      <FiMenu />
      <p>calm sea</p>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => transparentize(0.3, p.theme.palette.common.white)};
  padding: 0.9em 0.9em 0 0.9em;
  font-size: 1.2rem;
`;
