import { dbService, PLACE_TABLE, USER_PLACE_TABLE } from "../db.services";

export const insertUserPlaceQuery = (request: RequestSavePlace): string => {
  const id = dbService.getUniqueString();
  const createDatetime = dbService.getCurrentTime();

  const { description, placeId, rate, userId } = request;
  return `
    INSERT INTO ${USER_PLACE_TABLE}
        (
            id,
            place_id,
            user_id,
            rate,
            description,
            create_datetime
        )
    values 
        (
            "${id}",
            "${placeId}",
            "${userId}",
            ${rate},
            "${description}",
            ${createDatetime}
        );
    `;
};

export const selectUserPlacesQuery = (props: { uid: string }): string => {
  const { uid } = props;
  return `
    SELECT
        ${USER_PLACE_TABLE}.id,
        ${USER_PLACE_TABLE}.user_id as userId,
        ${USER_PLACE_TABLE}.place_id as placeId,
        ${USER_PLACE_TABLE}.rate,
        ${USER_PLACE_TABLE}.description,
        ${USER_PLACE_TABLE}.create_datetime,
        ${PLACE_TABLE}.name,
        ${PLACE_TABLE}.lat,
        ${PLACE_TABLE}.lng
    FROM ${USER_PLACE_TABLE} 
    LEFT JOIN places
    ON ${USER_PLACE_TABLE}.place_id = places.id
    WHERE user_id = "${uid}";
  `;
};
