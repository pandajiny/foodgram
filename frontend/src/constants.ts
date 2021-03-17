export const INTRODUCE_PATH = "/introduce";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const DEFAULT_PATH = "/";
export const PLACE_DETAIL_PATH = "/places/:placeId";

export const AUTH_SERVICE_URL =
  process.env["AUTH_SERVICE_URL"] || "http://localhost:4000";

export const FOODGRAM_SERVICE_URL =
  process.env["FOODGRAM_SERVICE_URL"] || "http://localhost:6001";
