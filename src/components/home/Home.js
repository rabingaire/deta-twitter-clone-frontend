import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import config from "../../config";
import * as api from "../../utils/api";
import * as local from "../../utils/local";
import routes from "../../constants/routes";
import useToggle from "../../hooks/useToggle";

import Tweet from "../tweet";

import "./Home.css";

function Home({ username }) {
  const history = useHistory();

  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, toggleLoading] = useToggle();
  const [tweeting, toggleTweeting] = useToggle();

  function onHandleLogout() {
    local.remove("accessToken");
    history.push(routes.root);
  }

  function handleTextareaChange(event) {
    setTweet(event.target.value);
  }

  function onTweetClick(event) {
    toggleTweeting();
    event.preventDefault();
    api
      .post(config.tweet.uri, { body: tweet.trim() })
      .then((res) => {
        const newTweets = [res.data.data, ...tweets];
        setTweets(newTweets);
        setTweet("");
        toggleTweeting();
      })
      .catch((err) => {
        console.log(err);
        toggleTweeting();
      });
  }

  useEffect(() => {
    toggleLoading();
    api
      .get(config.feed.uri)
      .then((res) => {
        setTweets(res.data.data);
        toggleLoading();
      })
      .catch((err) => {
        console.log(err);
        toggleLoading();
      });
  }, [toggleLoading]);

  return (
    <div className="home">
      <a href={routes.profile.replace(":username", username)}>My Profile</a>
      <span className="logout" onClick={onHandleLogout}>
        Logout
      </span>
      <h1>My Feed</h1>
      <div className="tweet-create">
        <form onSubmit={onTweetClick}>
          <textarea
            placeholder="Tweet..."
            value={tweet}
            onChange={handleTextareaChange}
          ></textarea>
          <br />
          <input
            type="submit"
            value="tweet"
            disabled={!tweet.length || tweeting}
          />
        </form>
      </div>
      <div>
        {loading && <span className="loading">Loading...</span>}
        {tweets.map((tweet) => (
          <Tweet key={tweet.key} data={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Home;
