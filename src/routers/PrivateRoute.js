import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as local from "../utils/local";
import routes from "../constants/routes";
import { validateToken, decodeToken } from "../utils/jwt";

function PrivateRoute({ component: Component, path, exact = true }) {
  const accessToken = local.get("accessToken");
  const isLoggedIn = validateToken(accessToken);
  const { username } = decodeToken(accessToken);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        const newProps = { ...props, username };
        return isLoggedIn ? (
          <Component {...newProps} />
        ) : (
          <Redirect
            to={{
              pathname: routes.login,
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
