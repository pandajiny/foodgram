import { DB_NAME, doGetQuery, doWriteQuery } from "../../db/db.services";
import {
  getInsertSavedPlaceQuery,
  getSelectSavedPlaceQuery,
  getSelectSavedPlacesQuery,
} from "../../db/query/place.query";

export async function savePlace(
  request: SavePlaceRequest
): Promise<ActionResult> {
  const dbName = DB_NAME.MAIN;

  const query = getInsertSavedPlaceQuery(request);

  const writeResult = await doWriteQuery({ query, dbName });

  return {
    ok: true,
    message: `successfully saved place`,
  };
}

export async function getSavedPlaces(userId: string): Promise<SavedPlace[]> {
  const dbName = DB_NAME.MAIN;
  const query = getSelectSavedPlacesQuery({ userId });

  const getResult = await doGetQuery<SavedPlace>({
    query,
    dbName,
  });

  return getResult;
}

export async function getSavedPlace(
  userId: string,
  placeId: string
): Promise<SavedPlace> {
  const dbName = DB_NAME.MAIN;
  const query = getSelectSavedPlaceQuery(userId, placeId);

  const result = await doGetQuery<SavedPlace>({
    query,
    dbName,
  });

  if (result.length == 1) {
    return result[0];
  } else {
    throw `saved place got problem / length : ${result.length} query : ${query}`;
  }
}
