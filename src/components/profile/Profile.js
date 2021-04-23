import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Tweet from "../tweet";
import config from "../../config";
import * as api from "../../utils/api";
import routes from "../../constants/routes";
import useToggle from "../../hooks/useToggle";

import "./Profile.css";

function Profile() {
  let { username } = useParams();
  const [loading, toggleLoading] = useToggle();
  const [userInfo, setUserInfo] = useState({
    description: "",
    following: { count: 0 },
    followers: { count: 0 },
  });
  const [tweets, setTweets] = useState([]);
  const [followUnfollow, toggleFollowUnfollow] = useToggle();
  const [editDescription, toggleEditDescription] = useToggle();
  const [followed, toogleFollowed, setFollowedValue] = useToggle();

  function handleDescriptionChange(event) {
    setUserInfo({ ...userInfo, description: event.target.value });
  }

  function handleOnDescriptionSave(event) {
    event.preventDefault();
    api
      .patch(config.editDescription.uri, {
        description: userInfo.description.trim(),
      })
      .then((res) => {
        toggleEditDescription();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onFollowClick() {
    toggleFollowUnfollow();
    api
      .post(config.follow.uri, { id: username })
      .then((res) => {
        setUserInfo({
          ...userInfo,
          followers: {
            ...userInfo.followers,
            count: userInfo.followers.count + 1,
          },
        });
        toogleFollowed();
        toggleFollowUnfollow();
      })
      .catch((err) => {
        console.log(err);
        toggleFollowUnfollow();
      });
  }

  function onUnfollowClick() {
    toggleFollowUnfollow();
    api
      .post(config.unfollow.uri, { id: username })
      .then((res) => {
        setUserInfo({
          ...userInfo,
          followers: {
            ...userInfo.followers,
            count: userInfo.followers.count - 1,
          },
        });
        toogleFollowed();
        toggleFollowUnfollow();
      })
      .catch((err) => {
        console.log(err);
        toggleFollowUnfollow();
      });
  }

  const getProfileInfo = React.useCallback(() => {
    toggleLoading();
    api
      .get(config.profile.userDetails.uri.replace(":username", username))
      .then((res) => {
        setUserInfo(res.data.data);
        setFollowedValue(res.data.data.isFollowing);
        toggleLoading();
      })
      .catch((err) => {
        console.log(err);
        toggleLoading();
      });
  }, [username, toggleLoading, setFollowedValue]);

  const getTweets = React.useCallback(() => {
    api
      .get(config.profile.userTweets.uri.replace(":username", username))
      .then((res) => {
        setTweets(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  useEffect(() => {
    getProfileInfo();
    getTweets();
  }, [getProfileInfo, getTweets]);

  return (
    <div className="profile">
      <a href={routes.root}>My Feed</a>
      <h1>@{username}</h1>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <div className="profile-description">
            {editDescription && userInfo.isMyProfile ? (
              <form onSubmit={handleOnDescriptionSave}>
                <input
                  type="text"
                  value={userInfo.description}
                  onChange={handleDescriptionChange}
                />
                <input type="submit" value="save" />
              </form>
            ) : (
              <span onClick={toggleEditDescription}>
                {userInfo.description ? userInfo.description : "No description"}
              </span>
            )}
          </div>

          {!userInfo.isMyProfile && (
            <div className="profile-action">
              {followed ? (
                <input
                  type="button"
                  value="unfollow"
                  onClick={onUnfollowClick}
                  disabled={followUnfollow}
                />
              ) : (
                <input
                  type="button"
                  value="follow"
                  onClick={onFollowClick}
                  disabled={followUnfollow}
                />
              )}
            </div>
          )}
          <div className="profile-status">
            <div>
              <strong>{userInfo.following.count}</strong>
              <span> Following</span>
            </div>
            <div>
              <strong>{userInfo.followers.count}</strong>
              <span> Followers</span>
            </div>
          </div>
        </div>
      )}

      {tweets.map((tweet) => (
        <Tweet key={tweet.key} data={tweet} />
      ))}
    </div>
  );
}

export default Profile;
