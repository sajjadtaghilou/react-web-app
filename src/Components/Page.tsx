import { LayoutAtom } from "Contexts/LayouContext";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";

const Page = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ noPadding?: boolean }>
>(({ children }, ref) => {
  const [{ isFullscreen }] = useAtom(LayoutAtom);
  return (
    <Container
      isFullscreen={isFullscreen}
      ref={ref}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      {children}
    </Container>
  );
});

export default Page;

const Container = styled(motion.div)<{ isFullscreen?: boolean }>`
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
  padding-bottom: 4rem;
`;
