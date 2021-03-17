import mysql, { ConnectionOptions } from "mysql2/promise";
import uniqueString from "unique-string";
import { DB_PASSWORD } from "../../constants";
import { InternalException } from "../http";

function getUniqueString(): string {
  return uniqueString();
}

function getCurrentTime(): number {
  return new Date().getTime();
}

export const dbOptions: ConnectionOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  database: "foodgram_db",
  password: DB_PASSWORD,
};

async function get<T>(query: string): Promise<T[]> {
  const conn = await mysql.createConnection(dbOptions);
  const [results] = await conn.execute(query).catch((err) => {
    console.error(err);
    throw new InternalException(`Cannot get data`);
  });
  await conn.end();
  if (results && Array.isArray(results) && results.length > 0) {
    return (results as Array<T>).map((v) => ({ ...v }));
  } else {
    return [];
  }
}

async function write(query: string) {
  const conn = await mysql.createConnection(dbOptions);
  await conn.execute(query).catch((err) => {
    console.error(err);
    throw new InternalException(`Cannot write data`);
  });
  await conn.end();
}

export const PLACE_TABLE = "places" as const;
export const USER_PLACE_TABLE = "user_places" as const;

export const dbService = {
  get,
  write,
  getUniqueString,
  getCurrentTime,
};
