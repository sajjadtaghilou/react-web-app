import Layout from "Base/Layout";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Home";
import Lectures from "./Lectures";
import Login from "./Login";

const Routes: React.FC = () => {
  const location = useLocation();
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        render={() => (
          <Layout>
            <AnimateSharedLayout type="crossfade">
              <AnimatePresence>
                <Switch location={location} key={location.pathname}>
                  <Route path="/lectures" component={Lectures} />
                  <Route path="/" exact component={Home} />
                </Switch>
              </AnimatePresence>
            </AnimateSharedLayout>
          </Layout>
        )}
      />
    </Switch>
  );
};

export default Routes;
