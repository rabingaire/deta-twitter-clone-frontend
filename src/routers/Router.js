import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "../components/login";
import Signup from "../components/signup";
import routes from "../constants/routes";
import CommonRoute from "./CommonRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/home";
import Profile from "../components/profile";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <CommonRoute component={Login} path={routes.login} />
        <CommonRoute component={Signup} path={routes.signup} />
        <PrivateRoute component={Profile} path={routes.profile} />
        <PrivateRoute component={Home} path={routes.root} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
