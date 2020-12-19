import { ConnectionConfig, createConnection } from "mysql";
import { DB_PASSWORD } from "../secrets";
import uniqueString from "unique-string";

export const DB_NAME = {
  MAIN: "places_schema",
};

export const DB_TABLES = {
  USERS: "users",
};

function getConnectionConfig(dbName: string): ConnectionConfig {
  return {
    host: "115.85.182.164",
    port: 3307,
    user: "root",
    password: DB_PASSWORD,
    database: dbName,
  };
}

export function getUniqueString(): string {
  return uniqueString();
}

export async function doGetQuery<T>(args: {
  query: string;
  dbName: string;
}): Promise<T[]> {
  const { dbName, query } = args;
  console.log(`get query with ${query}`);

  const queryResult = await new Promise<T[]>((res, rej) => {
    const connection = createConnection(getConnectionConfig(dbName));
    connection.connect((err) => {
      if (err) rej(err);
      connection.query(query, (err, results) => {
        if (err) rej(err);
        connection.end();
        if (results) {
          res(results);
        } else {
          res([]);
        }
        return;
      });
    });
  }).catch((err) => {
    throw err;
  });

  return queryResult;
}

export async function doWriteQuery(args: {
  query: string;
  dbName: string;
}): Promise<ActionResult> {
  const { dbName, query } = args;
  console.log(`write query : ${query}`);

  const queryResult = await new Promise<ActionResult>((res, rej) => {
    const connection = createConnection(getConnectionConfig(dbName));
    connection.query(query, (err) => {
      if (err) {
        rej(err);
      }

      res({
        ok: true,
        message: `successfully done query ${query}`,
      });
    });
  });

  console.log(`writing query done`);
  return queryResult;
}
