import { dbService, PLACE_TABLE, USER_PLACE_TABLE } from "../db.services";

export const selectPlaceQuery = (placeId: string): string => {
  return `
    SELECT * FROM ${PLACE_TABLE} WHERE id = "${placeId}";
  `;
};

export const insertPlaceQuery = (place: Place): string => {
  const { address, id, lat, lng, name, phone_number } = place;
  return `
    INSERT INTO ${PLACE_TABLE}
    (
      id,
      name,
      address,
      phone_number,
      lat,
      lng
    )
    values
    (
      "${id}",
      "${name}",
      "${address}",
      "${phone_number}",
      ${lat},
      ${lng}
    );
  `;
};

export function getSelectSavedPlacesQuery(request: { userId: string }): string {
  const { userId } = request;
  const query = `
    SELECT * FROM ${USER_PLACE_TABLE}
    WHERE user_id = "${userId}";
  `;
  return query;
}

export function getSelectSavedPlaceQuery(
  userId: string,
  placeId: string
): string {
  const query = `
        SELECT * FROM ${USER_PLACE_TABLE}
        WHERE
        user_id = "${userId}" AND
        place_id = "${placeId}";
    `;
  return query;
}

export function getUpdateSavedPlaceQuery(place: UserPlaceObject): string {
  const { description, id, rate } = place;
  const createDatetime = dbService.getCurrentTime();
  // only change datetime, description and rate
  const query = `
    UPDATE ${USER_PLACE_TABLE}

    SET
    create_datetime = ${createDatetime},
    description = "${description}",
    rate = ${rate}

    WHERE id = "${id}";
  `;
  return query;
}
