// FcLike
// AiOutlineHeart AiTwotoneHeart

import { transparentize } from "polished";
import React from "react";
import styled, { css } from "styled-components";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { AnimatePresence, motion, useCycle } from "framer-motion";

const LikeBtn: React.FC<{ isLiked?: boolean; onClick: () => void }> = ({
  isLiked,
  onClick,
}) => {
  return (
    <Container onClick={onClick}>
      <AiOutlineHeart style={{ opacity: isLiked ? 0 : 1 }} />
      <LikedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: isLiked ? 1 : 0 }}
      >
        <AiTwotoneHeart />
      </LikedContainer>
    </Container>
  );
};

export default LikeBtn;

const LikedContainer = styled(motion.div)`
  position: absolute;
  z-index: 1;
  color: red;
  display: flex;
`;

const Container = styled(motion.button)`
  display: flex;
  border: none;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  border-radius: 100%;
  position: relative;
`;
