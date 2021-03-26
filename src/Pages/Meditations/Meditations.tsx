import React, { useState } from "react";
import {
  matchPath,
  useLocation,
  useRouteMatch,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import Page from "Components/Page";
import MeditationsMain from "./subPages/MeditationsMain";
import MeditationDetails from "./subPages/MeditationDetails";
const Meditations: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Page noPadding>
      <Switch>
        <Route path={match.path} exact component={MeditationsMain} />
        <Route path={`${match.path}/:id`} component={MeditationDetails} />
      </Switch>
    </Page>
  );
};

export default Meditations;
