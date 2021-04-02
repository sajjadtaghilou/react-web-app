import Page from "Components/Page";
import styled from "styled-components";
import headerBg from "Assets/images/profile_bg.jpg";
import { spaceYMixinFactory } from "Styles/mixins";
import Avatar from "./components/Avatar";
import { useRouteMatch } from "react-router";
import ProfileInfo from "./subPages/ProfileInfo";

const Profile: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Page>
      <HeaderBg bg={headerBg}>
        <AvatarContainer>
          <Avatar />
        </AvatarContainer>
      </HeaderBg>
      <Body>
        <ProfileInfo />
      </Body>
    </Page>
  );
};

export default Profile;

const HeaderBg = styled.div<{ bg: string }>`
  width: 100%;
  background-image: url(${(p) => p.bg});
  background-size: cover;
  background-position: top;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 5em;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(80%);
`;

const Body = styled.div`
  width: 70%;
  margin: 0 auto;
  flex: 1;
`;
