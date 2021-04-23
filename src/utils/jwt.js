import jwtDecode from "jwt-decode";

export function validateToken(token) {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return exp > new Date().getTime() / 1000;
  } catch (e) {
    return false;
  }
}

export function decodeToken(token) {
  const payload = {
    exp: 0,
    iat: 0,
    username: "",
  };

  if (!token) return payload;

  try {
    const decodedJwt = jwtDecode(token);
    const payload = {
      exp: decodedJwt.exp,
      iat: decodedJwt.iat,
      username: decodedJwt.username,
    };

    return payload;
  } catch (e) {
    return payload;
  }
}
