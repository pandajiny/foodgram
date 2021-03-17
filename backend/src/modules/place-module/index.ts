// import {
//   insertUserPlaceQuery,
//   getSelectSavedPlaceQuery,
//   getSelectSavedPlacesQuery,
//   getUpdateSavedPlaceQuery,
// } from "../db/query/place.query";

// export async function savePlace(
//   request: RequestSavePlace
// ): Promise<ActionResult> {
//   const dbName = DB_NAME.MAIN;

//   const query = insertUserPlaceQuery(request);

//   const writeResult = await doWriteQuery({ query, dbName });

//   return {
//     ok: true,
//     message: `successfully saved place`,
//   };
// }

// export async function getSavedPlaces(userId: string): Promise<UserPlace[]> {
//   const dbName = DB_NAME.MAIN;
//   const query = getSelectSavedPlacesQuery({ userId });

//   const getResult = await doGetQuery<UserPlace>({
//     query,
//     dbName,
//   });

//   return getResult;
// }

// export async function getSavedPlace(
//   userId: string,
//   placeId: string
// ): Promise<UserPlace> {
//   const dbName = DB_NAME.MAIN;
//   const query = getSelectSavedPlaceQuery(userId, placeId);

//   const result = await doGetQuery<UserPlace>({
//     query,
//     dbName,
//   });

//   if (result.length == 1) {
//     return result[0];
//   } else {
//     throw `saved place got problem / length : ${result.length} query : ${query}`;
//   }
// }

// export async function editSavedPlace(place: UserPlace): Promise<ActionResult> {
//   const dbName = DB_NAME.MAIN;
//   const query = getUpdateSavedPlaceQuery(place);

//   const result = await doWriteQuery({
//     query,
//     dbName,
//   });

//   return {
//     ok: true,
//     message: `successfully edit place`,
//   };
// }
