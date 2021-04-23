import React from "react";
import { useHistory } from "react-router-dom";

import * as api from "../../utils/api";
import config from "../../config/config";
import routes from "../../constants/routes";
import useToggle from "../../hooks/useToggle";

import "./Signup.css";

function Signup() {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState();
  const [loading, toggleLoading] = useToggle();

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleLoading();
    api
      .post(config.signup.uri, {
        username,
        password,
      })
      .then((res) => {
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
    <div className="signup">
      <h1>Signup</h1>
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
        <input type="submit" value="signup" disabled={loading} />
        <br />
      </form>
      <a href={routes.login}>Already have an account? Login</a>
    </div>
  );
}

export default Signup;
