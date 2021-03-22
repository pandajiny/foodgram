import { config } from "dotenv";
export const API_PORT = process.env["API_PORT"] || 6001;
import RedisStore from "connect-redis";
import session, { SessionOptions } from "express-session";
import { createClient } from "redis";
import { ConnectionOptions } from "mysql2/promise";

// configure dotenv module
const isDev = process.env.NODE_ENV?.includes("dev");
const envPath = isDev ? ".dev.env" : ".env";
config({ path: envPath });

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
  host: process.env["SESSION_HOST"]!,
  port: parseInt(process.env["REDIS_PORT"]!),
});

export const SessionOpts: SessionOptions = {
  secret: process.env["SESSION_SECRET"]!,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 3 * DAY,
    domain: isDev ? undefined : ".pandajiny.com",
  },
  store: new Store({
    client: client,
    ttl: 3 * MINUTE,
  }),
};

export const dbOptions: ConnectionOptions = {
  host: process.env["DB_HOST"]!,
  port: parseInt(process.env["DB_PORT"]!),
  user: process.env["DB_USER"]!,
  database: "foodgram_db",
  password: process.env["DB_PASSWORD"]!,
};

export const GOOGLE_API_KEY = process.env["GOOGLE_API_KEY"]!;
export const CLIENT_URL = process.env["CLIENT_URL"]!;
export const KEY_PATH = process.env["KEY_PATH"]!;
export const CERT_PATH = process.env["CERT_PATH"]!;
