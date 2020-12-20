import { DB_TABLES, getCurrentTime, getUniqueString } from "../db.services";

export function getInsertSavedPlaceQuery(request: SavePlaceRequest): string {
  const id = getUniqueString();
  const createDatetime = getCurrentTime();

  const { description, lat, lng, name, placeId, rate, userId } = request;
  const query = `
    INSERT INTO ${DB_TABLES.SAVED_PLACES}
    (
        id, place_id, user_id,
        create_datetime, lat, lng,
        name, description, rate
    )
    values 
    (
        "${id}", "${placeId}", "${userId}", 
        ${createDatetime}, "${lat}", "${lng}",
        "${name}", "${description}", ${rate}
    );
    `;
  return query;
}

export function getSelectSavedPlacesQuery(request: { userId: string }): string {
  const { userId } = request;
  const query = `
    SELECT * FROM ${DB_TABLES.SAVED_PLACES}
    WHERE user_id = "${userId}";
  `;
  return query;
}

export function getSelectSavedPlaceQuery(
  userId: string,
  placeId: string
): string {
  const query = `
        SELECT * FROM ${DB_TABLES.SAVED_PLACES}
        WHERE
        user_id = "${userId}" AND
        place_id = "${placeId}";
    `;
  return query;
}
