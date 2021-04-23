import React from "react";
import { useHistory } from "react-router-dom";

import * as api from "../../utils/api";
import config from "../../config/config";
import * as local from "../../utils/local";
import routes from "../../constants/routes";
import useToggle from "../../hooks/useToggle";

import "./Login.css";

function Login() {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState();
  const [loading, toggleLoading] = useToggle();

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleLoading();
    api
      .post(config.login.uri, {
        username,
        password,
      })
      .then((res) => {
        local.set("accessToken", res.data.data.accessToken);
        setErrorMessage(null);
        toggleLoading();
        history.push(routes.root);
      })
      .catch((err) => {
        console.log(err);
        toggleLoading();
        setErrorMessage(err.response.data.error.message);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        {errorMessage && <span className="error">{errorMessage}</span>}
        <br />
        <input type="submit" value="login" disabled={loading} />
        <br />
      </form>
      <a href={routes.signup}>Create an account? Signup</a>
    </div>
  );
}

export default Login;
