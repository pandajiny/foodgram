import { dbService } from "../../modules/db/db.services";
import {
  insertUserPlaceQuery,
  selectUserPlacesQuery,
} from "../../modules/db/query/user.query";
import { placeAPIs } from "../../modules/google-place-search";
import { cachePlace, parsePlace } from "../places/place.service";

export async function savePlace(request: RequestSavePlace) {
  await dbService.write(insertUserPlaceQuery(request));
}

export async function getUserPlaces(props: {
  uid: string;
}): Promise<UserPlace[]> {
  const { uid } = props;
  const places = await dbService.get<UserPlace>(selectUserPlacesQuery({ uid }));

  await Promise.all(
    places.map(async (place) => {
      if (!place.name) {
        await cachePlace(
          await placeAPIs.getPlaceDetail(place.placeId).then(parsePlace)
        );
      }
    })
  );

  return places;
}
