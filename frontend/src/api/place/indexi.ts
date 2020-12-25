import { doGetRequest, doPostRequest, doPutRequest, serverUrl } from "..";

export async function getPlaceDetail(args: {
  placeId: string;
}): Promise<google.maps.places.PlaceResult> {
  const { placeId } = args;
  const url = `${serverUrl}/places/${placeId}`;

  const result = await doGetRequest<google.maps.places.PlaceResult>(url);

  return result;
}

export async function getSavedPlaces(userId: string) {
  const url = `${serverUrl}/users/${userId}/places`;
  const result = await doGetRequest<SavedPlace[]>(url);

  return result;
}

export async function getSavedPlace(
  userId: string,
  placeId: string
): Promise<SavedPlace> {
  const url = `${serverUrl}/users/${userId}/places/${placeId}`;
  const result = await doGetRequest<SavedPlace>(url);
  // .catch((e) => {
  //   console.log(`errrrorrr`);
  //   throw e;
  // });
  return result;
}

// POST /users/:userID/places
// result : ActionResult
export async function savePlace(
  request: SavePlaceRequest
): Promise<ActionResult> {
  const url = `${serverUrl}/users/${request.userId}/places`;
  const body: SavePlaceRequestBody = request;

  const result = await doPostRequest<ActionResult>({
    url,
    body,
  });

  return result;
}

export async function editSavedPlace(place: SavedPlace) {
  const url = `${serverUrl}/users/${place.user_id}/places/${place.id}`;
  const body = place;

  const result = await doPutRequest<ActionResult>({
    url,
    body,
  });

  return result;
}
