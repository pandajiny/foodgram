import { config } from "dotenv";
config();
export const API_PORT = process.env["API_PORT"] || 6001;
import RedisStore from "connect-redis";
import session, { SessionOptions } from "express-session";
import { createClient } from "redis";

export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  PAGE_NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const SEC = 1000;
const MINUTE = 60 * SEC;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const Store = RedisStore(session);
const client = createClient({
  host: process.env["REDIS_HOST"] || "localhost",
  port: parseInt(process.env["REDIS_PORT"] || "6379"),
});

export const SessionOpts: SessionOptions = {
  secret: process.env["SESSION_SECRET"] || "secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1 * DAY,
    domain: process.env.NODE_ENV == "dev" ? undefined : ".pandajiny.com",
  },
  store: new Store({
    port: 4379,
    client: client,
    ttl: 86400,
  }),
};

export const GOOGLE_API_KEY = process.env["GOOGLE_API_KEY"] as string;
export const DB_PASSWORD = process.env["DB_PASSWORD"] as string;
export const CLIENT_URL = process.env["CLIENT_URL"] || "http://localhost:1234";
