import React from "react";
import { matchPath, useLocation, useRouteMatch, Link } from "react-router-dom";
import Page from "Components/Page";
import LecturesMain from "./subPages/LecturesMain";
import LectureDetails from "./subPages/LectureDetails";
import LecturePlayer from "./subPages/LecturePlayer";

import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

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

  return (
    <Page>
      <AnimatePresence>
        {isLecturesMain && (
          <SubpageContainer>
            <LecturesMain />
          </SubpageContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLectureDetails && (
          <SubpageContainer>
            <LectureDetails />
          </SubpageContainer>
        )}
      </AnimatePresence>
      {isLecturePlay && <LecturePlayer />}
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
