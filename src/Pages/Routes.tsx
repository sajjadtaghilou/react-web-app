import Layout from "Base/Layout";
import ProtectedRoute from "Components/ProtectedRoute";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Home";
import Meditations from "./Meditations";
import Login from "./Login";
import Musics from "./Musics";

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
                  <ProtectedRoute path="/meditations" component={Meditations} />
                  <ProtectedRoute path="/musics" component={Musics} />
                  <ProtectedRoute path="/" exact component={Home} />
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
