import { AnimateSharedLayout } from "framer-motion";

import { Route, Switch, useLocation } from "react-router-dom";
import Lectures from "./Lectures";

const Routes: React.FC = () => {
  const location = useLocation();
  return (
    // <Switch location={location} key={location.pathname}>
    <AnimateSharedLayout type="crossfade">
      <Switch>
        <Route path="/lectures" component={Lectures} />
      </Switch>
    </AnimateSharedLayout>
  );
};

export default Routes;
