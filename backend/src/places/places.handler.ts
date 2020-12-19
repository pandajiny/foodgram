import { RequestHandler } from "express";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";
import { getPlaceDetail } from "../modules/google-place-search";
import { getSavedPlaces, savePlace } from "../modules/place-module";
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

export const getSavedPlaceHandler: RequestHandler = async function (
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

export const savePlaceController: RequestHandler = async function (req, res) {
  const { userId, placeId } = req.params;
  const { lat, lng, name }: SavePlaceRequestBody = req.body;
  console.log(`save place request placeId :  ${placeId} || userID : ${userId}`);

  const request: SavePlaceRequest = { userId, placeId, lat, lng, name };
  if (isInvalidRequest(request)) {
    throw httpError(res, HttpStatus.BAD_REQUEST, `please fill the form`);
  }

  const result = await savePlace(request).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, `cannot save place - ${err}`);
  });

  console.log(`saving place done`);
  return httpResponse(res, result);
};
