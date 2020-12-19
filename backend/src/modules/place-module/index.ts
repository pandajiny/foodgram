import { v4 } from "uuid";
import { DB_NAME, doGetQuery, doWriteQuery } from "../../db/db.services";

export async function savePlace(args: SavePlaceRequest): Promise<ActionResult> {
  const { placeId, userId, lat, lng, name } = args;
  const dbName = DB_NAME.MAIN;
  const id = getUniqueString();
  const query = `
        insert into saved_places (id, place_id, user_id, create_datetime, lat, lng, name)
        values ("${id}", "${placeId}", "${userId}", ${getCurrentTime()}, "${lat}", "${lng}", "${name}");
    `;

  const writeResult = await doWriteQuery({ query, dbName }).catch((e) => {
    throw e;
  });

  return {
    ok: true,
    message: `successfully saved place`,
  };
}

export async function getSavedPlaces(userId: string): Promise<SavedPlace[]> {
  const dbName = DB_NAME.MAIN;
  const query = `
    select * from saved_places where user_id = "${userId}";
  `;

  const getResult = await doGetQuery<SavedPlace>({
    query,
    dbName,
  }).catch((e) => {
    throw e;
  });

  return getResult;
}

function getUniqueString(): string {
  return v4();
}

function getCurrentTime(): number {
  return new Date().getTime();
}
