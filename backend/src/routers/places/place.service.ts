import { dbService } from "../../modules/db/db.services";
import {
  insertPlaceQuery,
  selectPlaceQuery,
} from "../../modules/db/query/place.query";
import { placeAPIs } from "../../modules/google-place-search";

export function parsePlace(origin: PlaceResult): Place {
  const place: Place = {
    id: origin.place_id!,
    name: origin.name,
    address: origin.formatted_address || null,
    phone_number: origin.formatted_phone_number || null,
    lat: origin.geometry?.location.lat || null,
    lng: origin.geometry?.location.lng || null,
  };
  return place;
}

export async function findPlaceFromDB(placeId: string): Promise<Place | null> {
  const place = await dbService.get<Place>(selectPlaceQuery(placeId));
  if (place.length) {
    return place[0];
  } else {
    return null;
  }
}

export async function cachePlace(place: Place) {
  await findPlaceFromDB(place.id).then(async (p) => {
    if (!p) {
      await dbService.write(insertPlaceQuery(place));
    }
  });
}

export async function getPlaceDetail(placeId: string): Promise<Place> {
  const dbPlace = await findPlaceFromDB(placeId);
  if (dbPlace) {
    return dbPlace;
  } else {
    const googlePlace = await placeAPIs.getPlaceDetail(placeId);
    const place = parsePlace(googlePlace);
    // await cachePlace(place.id);
    return place;
  }
}
