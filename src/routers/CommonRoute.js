import React from "react";
import { Route, Redirect } from "react-router-dom";

import * as local from "../utils/local";
import routes from "../constants/routes";
import { validateToken } from "../utils/jwt";

function CommonRoute({ component: Component, path, exact = true }) {
  const isLoggedIn = validateToken(local.get("accessToken"));

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return isLoggedIn ? (
          <Redirect
            to={{
              pathname: routes.root,
            }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

export default CommonRoute;
