import React, { useState } from "react";
import { matchPath, useLocation, useRouteMatch, Link } from "react-router-dom";
import Page from "Components/Page";
import LecturesMain from "./subPages/LecturesMain";
import LectureDetails from "./subPages/LectureDetails";
import sea2 from "Assets/images/sea2.jpg";
import styled from "styled-components";
import Player from "Components/Player";

const Lectures: React.FC = () => {
  const loc = useLocation();
  const match = useRouteMatch();
  const isLecturesMain = matchPath(loc.pathname, {
    exact: true,
    path: match.path,
  });
  const isLectureDetails = matchPath(loc.pathname, {
    exact: true,
    path: `${match.path}/:id`,
  });
  const isLecturePlay = matchPath(loc.pathname, {
    exact: true,
    path: `${match.path}/:id/play`,
  });
  const [s, setS] = useState(false);
  return (
    <Page noPadding>
      {isLecturesMain && <LecturesMain />}

      {isLectureDetails && <LectureDetails />}

      {/* {isLecturePlay && <LecturePlayer />} */}
      <button onClick={() => setS(!s)}>salam</button>
      <Player
        isVisible={s}
        closePlayer={() => setS(false)}
        onTrackEnd={() => {}}
        playlist={[]}
        backgroundImage={sea2}
      />
    </Page>
  );
};

export default Lectures;

const SubpageContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
`;
