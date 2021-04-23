import React, { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

import useToggle from "../../hooks/useToggle";
import * as api from "../../utils/api";
import config from "../../config";
import routes from "../../constants/routes";

import "./Tweet.css";

function Tweet({ data }) {
  const { body, username, likes, key } = data;
  const [likecount, setLikecount] = useState(likes.count);
  const [liked, toogleLiked] = useToggle(likes.isLiked);

  function handleOnLikeClick() {
    setLikecount(likecount + 1);
    toogleLiked();

    api.post(config.like.uri, { id: key }).catch((err) => {
      console.log(err);
    });
  }

  function handleOnUnlikeClick() {
    setLikecount(likecount - 1);
    toogleLiked();

    api.post(config.unlike.uri, { id: key }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="tweet">
      <div className="username">
        <a href={routes.profile.replace(":username", username)}>@{username}</a>
      </div>
      <div className="tweet-body">{body}</div>
      <div className="tweet-action">
        <div className="tweet-like">
          {liked ? (
            <IoIosHeart onClick={handleOnUnlikeClick} />
          ) : (
            <IoIosHeartEmpty onClick={handleOnLikeClick} />
          )}
          <span>{likecount}</span>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
