import styled from "styled-components";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Body>{children}</Body>
      <FooterContainer>
        <Footer />
      </FooterContainer>
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
const Body = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FooterContainer = styled.footer`
  width: 100%;
  /* padding: 0 1em; */
`;
