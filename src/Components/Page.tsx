import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Page = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  ({ children }, ref) => {
    return (
      <Container exit={{ y: 100 }} ref={ref} layoutId="page">
        {children}
      </Container>
    );
  }
);

export default Page;

const Container = styled(motion.div)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  padding: 1em;
  position: relative;
`;
