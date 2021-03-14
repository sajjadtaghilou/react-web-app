import { LayoutAtom } from "Contexts/LayouContext";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";

const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  ({ children }, ref) => {
    const [{ isFullscreen }] = useAtom(LayoutAtom);
    return (
      <Container
        noPadding={isFullscreen}
        exit={{ y: 100 }}
        ref={ref}
        layoutId="page"
      >
        {children}
      </Container>
    );
  }
);

export default Page;

const Container = styled(motion.div)<{ noPadding?: boolean }>`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  /* overflow-x: hidden; */
  padding: ${(p) => (p.noPadding ? "0" : "1em")};
  position: relative;
`;
