import Layout from "Base/Layout";
import { AnimateSharedLayout } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import Lectures from "./Lectures";
import Login from "./Login";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        render={() => (
          <Layout>
            <AnimateSharedLayout type="crossfade">
              <Switch>
                <Route path="/lectures" component={Lectures} />
              </Switch>
            </AnimateSharedLayout>
          </Layout>
        )}
      />
    </Switch>
  );
};

export default Routes;
