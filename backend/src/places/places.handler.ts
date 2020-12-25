import { RequestHandler } from "express";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";
import { getPlaceDetail } from "../modules/google-place-search";
import {
  editSavedPlace,
  getSavedPlace,
  getSavedPlaces,
  savePlace,
} from "../modules/place-module";
import { isInvalidRequest } from "../place-controllers";

export const getPlaceDetailHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<google.maps.places.PlaceResult>> {
  const { placeId } = req.params;

  console.log(`place detail request placeId : ${placeId}`);
  if (isInvalidRequest({ placeId })) {
    throw httpError(
      res,
      HttpStatus.BAD_REQUEST,
      `invalid request fill thw form`
    );
  }

  const result = await getPlaceDetail(placeId).catch((e) => {
    throw httpError(
      res,
      HttpStatus.FORBIDDEN,
      `cannot fetch place from ${placeId}`
    );
  });

  return httpResponse(res, result);
};

// GET /users/:userId/places
// result : SavedPlace[]
export const getSavedPlacesHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<SavedPlace[]>> {
  const { userId } = req.params;
  console.log(`saved place request from ${userId}`);

  const result = await getSavedPlaces(userId).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, err);
  });

  return httpResponse(res, result);
};

// GET /users/:userId/places/:placeId
// result : SavedPlace
export const getSavedPlaceHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<SavedPlace>> {
  const { userId, placeId } = req.params;
  const result = await getSavedPlace(userId, placeId).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, err);
  });

  return httpResponse(res, result);
};

export const savePlaceController: RequestHandler = async function (req, res) {
  const { userId } = req.params;
  const {
    lat,
    lng,
    name,
    description,
    rate,
    placeId,
  }: SavePlaceRequestBody = req.body;
  console.log(
    `save place request /  placeId :  ${placeId}, userID : ${userId}`
  );

  const request: SavePlaceRequest = {
    userId,
    placeId,
    lat,
    lng,
    name,
    description,
    rate,
  };
  if (isInvalidRequest(request)) {
    throw httpError(res, HttpStatus.BAD_REQUEST, `please fill the form`);
  }

  const result = await savePlace(request).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, `cannot save place - ${err}`);
  });

  console.log(`saving place done`);
  return httpResponse(res, result);
};

export const editSavedPlaceController: RequestHandler = async function (
  req,
  res
) {
  const place = req.body as SavedPlace;
  console.log(
    `edit place request / userId : ${place.user_id} / place_name : ${place.name}`
  );
  if (isInvalidRequest(place)) {
    throw httpError(res, HttpStatus.BAD_REQUEST, `please fill the form`);
  }

  const result = await editSavedPlace(place).catch((err) => {
    throw httpError(
      res,
      HttpStatus.FORBIDDEN,
      `cannot edit saved place : ${err}`
    );
  });

  return httpResponse(res, result);
};
