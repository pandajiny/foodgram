import { doGetRequest, doPostRequest, serverUrl } from ".";

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

// Save place by user id
// path : /place/saved/:uid
// body : SavePlaceRequest
// result : ActionResult
export async function savePlace(
  request: SavePlaceRequest
): Promise<ActionResult> {
  const url = `${serverUrl}/users/${request.userId}/places/${request.placeId}`;
  const body: SavePlaceRequestBody = request;

  const result = await doPostRequest<ActionResult>({
    url,
    body,
  });

  return result;
}

// export function getPlacePhoto(args: { photoRef: string }) {
//   const { photoRef } = args;
//   const url = new URL(
//     `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyDAUhEa-Zph-I057wMA5CEIV3v9dhV8g5o`
//   );
// }
