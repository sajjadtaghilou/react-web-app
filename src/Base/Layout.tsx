import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { useAtom } from "jotai";
import Footer from "./Footer";
import Header from "./Header";
import { LayoutAtom } from "Contexts/LayouContext";

const Layout: React.FC = ({ children }) => {
  const [{ isFullscreen }] = useAtom(LayoutAtom);
  return (
    <Container>
      <AnimateSharedLayout>
        <AnimatePresence>
          {!isFullscreen && (
            <HeaderContainer
              layoutId="HeaderContainer"
              initial={false}
              animate={{ y: 0 }}
              exit={{ y: -100, transition: { duration: 1 } }}
            >
              <Header />
            </HeaderContainer>
          )}
        </AnimatePresence>
        <Body layoutId="Body">{children}</Body>
        <AnimatePresence>
          {!isFullscreen && (
            <FooterContainer
              initial={{ y: 0 }}
              layoutId="FooterContainer"
              exit={{ y: 300, transition: { duration: 1 } }}
            >
              <Footer />
            </FooterContainer>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.palette.bg.main};
`;
const Body = styled(motion.main)`
  flex: 1;
  /* height: 100px; */
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FooterContainer = styled(motion.footer)`
  width: 100%;
  display: inline-block;
  position: relative;
  z-index: 1;
  /* padding: 0 1em; */
`;

const HeaderContainer = styled(motion.div)`
  width: 100%;
  display: inline-block;
  position: relative;
  z-index: 1;
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
  z-index: 1;
  /* padding: 0 1em; */
`;
