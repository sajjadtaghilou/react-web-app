import { LayoutAtom } from "Contexts/LayouContext";
import { motion, useElementScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import headBg from "Assets/images/head-bg.jpg";

const Page = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ noPadding?: boolean }>
>(({ children, noPadding }, ref) => {
  const [{ isFullscreen }] = useAtom(LayoutAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useElementScroll(containerRef);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  return (
    <Container
      noPadding={isFullscreen}
      exit={{ y: 100 }}
      ref={containerRef}
      layoutId="page"
    >
      <motion.img
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        layoutId="Page_head_image"
        src={headBg}
        style={{ width: "100%", objectFit: "cover", opacity }}
        alt=""
      />
      <Title>CALM SEA</Title>
      <ContentContainer noPadding={noPadding}>{children}</ContentContainer>
    </Container>
  );
});

export default Page;

const Container = styled(motion.div)<{ noPadding?: boolean }>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  /* overflow-x: hidden; */
`;

const Title = styled(motion.h2)`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
`;

const ContentContainer = styled(motion.div)<{ noPadding?: boolean }>`
  width: 100%;
  padding: ${(p) => (p.noPadding ? "0" : "1em")};
`;
