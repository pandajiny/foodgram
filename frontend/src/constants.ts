const isDev = process?.env.NODE_ENV?.includes("dev");

export const INTRODUCE_PATH = "/introduce";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const DEFAULT_PATH = "/";
export const PLACE_DETAIL_PATH = "/places/:placeId";

export const AUTH_SERVICE_URL = isDev
  ? "http://localhost:4000"
  : "https://pandajiny.com:4000";
export const FOODGRAM_SERVICE_URL = isDev
  ? "http://localhost:6001"
  : "https://pandajiny.com:6001";
