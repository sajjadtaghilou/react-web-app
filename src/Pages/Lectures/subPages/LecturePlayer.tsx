import React, { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { AnimateSharedLayout, motion, useCycle } from "framer-motion";
import Page from "Components/Page";
import sea2 from "Assets/images/sea2.jpg";
import forest from "Assets/images/forest.jpg";
import road from "Assets/images/road.jpg";
import { spaceXMixinFactory, spaceYMixinFactory } from "Styles/mixins";
import Card from "Components/Card";
import { Link } from "react-router-dom";
import PlayBtn from "../components/PlayBtn";
import Button from "Components/Button";
import { useAtom } from "jotai";
import { LayoutAtom } from "Contexts/LayouContext";

const LecturePlayer: React.FC = () => {
  const [, setLayoutAtom] = useAtom(LayoutAtom);
  useEffect(() => {
    return () => {
      setLayoutAtom({ isFullscreen: false });
    };
  }, []);
  return (
    <Container>
      <motion.div
        transition={{ delay: 1 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <Background
          bg={sea2}
          transition={{
            delay: 1,
            duration: 100,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          animate={{ backgroundPosition: "100% 100%" }}
          initial={{ backgroundPosition: "0% 0%" }}
        />
        <HandlersContainer>
          <PlayBtn big />
        </HandlersContainer>
      </motion.div>
    </Container>
  );
};

export default LecturePlayer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2em;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Background = styled(motion.div)<{ bg: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${(p) => p.bg});
  /* background-position: left; */
  background-size: cover;
`;

const HandlersContainer = styled.div``;
