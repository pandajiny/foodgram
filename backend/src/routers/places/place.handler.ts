import { RequestHandler } from "express";
import { validateRequest } from "../../place-controllers";
import { getPlaceDetail } from "./place.service";

export const handlerPlaceDetail: RequestHandler = async function (req, res) {
  const { placeId } = req.params;
  validateRequest({ placeId });
  return await getPlaceDetail(placeId);
};

// export const getSavedPlacesHandler: RequestHandler = async function (req, res) {
//   const { userId } = req.params;
//   validateRequest({ userId });
//   return await getSavedPlaces(userId);
// };

// export const getSavedPlaceHandler: RequestHandler = async function (req, res) {
//   const { userId, placeId } = req.params;
//   validateRequest({ userId, placeId });
//   return await getSavedPlace(userId, placeId);
// };

export const editSavedPlaceController: RequestHandler = async function (req) {
  const place = req.body as UserPlaceObject;
  validateRequest(place);
  // return await editSavedPlace(place);
};
