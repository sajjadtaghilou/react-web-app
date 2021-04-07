import useAuth from "Hooks/useAuth";
import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...props }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Route {...props} component={component} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: `${location.pathname}${
            location.search && "&" + location.search
          }`,
        },
      }}
    />
  );
};

export default ProtectedRoute;
