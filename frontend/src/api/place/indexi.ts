import { doGetRequest, doPostRequest, doPutRequest, serverUrl } from "..";
import { FoodgramService } from "../../App";

export async function getPlaceDetail(args: {
  placeId: string;
}): Promise<Place> {
  const { placeId } = args;
  return await FoodgramService.get<Place>(`/places/${placeId}`).then(
    (resp) => resp.data
  );
}

export async function getSavedPlaces(userId: string) {
  const url = `${serverUrl}/users/${userId}/places`;
  const result = await doGetRequest<UserPlace[]>(url);

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
export async function savePlace(request: RequestSavePlace) {
  console.log(request);
  await FoodgramService.post(`/users/${request.userId}/places`, request).catch(
    (err) => {
      console.error(err);
      throw `Cannot save place`;
    }
  );
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
