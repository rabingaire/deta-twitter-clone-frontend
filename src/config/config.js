const config = {
  baseUri: process.env.REACT_APP_API_BASE_URI,
  login: {
    uri: "users/login",
  },
  signup: {
    uri: "users/signup",
  },
  feed: {
    uri: "tweets/myfeed",
  },
  like: {
    uri: "tweets/like",
  },
  unlike: {
    uri: "tweets/unlike",
  },
  tweet: {
    uri: "tweets/create",
  },
  follow: {
    uri: "users/follow",
  },
  unfollow: {
    uri: "users/unfollow",
  },
  editDescription: {
    uri: "users/edit",
  },
  profile: {
    userDetails: {
      uri: "users/:username",
    },
    userTweets: {
      uri: "tweets/:username",
    },
  },
};

export default config;
