import fetch from "node-fetch";
import { GOOGLE_API_KEY } from "../../secrets";

export async function getAutocomplete(
  input: string
): Promise<google.maps.places.AutocompletePrediction[]> {
  const baseUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  const requests: google.maps.places.AutocompletionRequest = {
    input: input,
    language: "ko",
    // location: "37.5662952,-126.9779451",
  };

  const result = await fetchGoogleApi({
    key: GOOGLE_API_KEY,
    baseUrl,
    params: parseMap(requests),
  });

  return result.predictions as google.maps.places.AutocompletePrediction[];
}

export async function getPlaceDetail(
  placeId: string
): Promise<google.maps.places.PlaceResult> {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json`;

  const request = {
    place_id: placeId,
    language: "ko",
  };

  const result = await fetchGoogleApi({
    key: GOOGLE_API_KEY,
    baseUrl,
    params: parseMap(request),
  });

  return result.result as google.maps.places.PlaceResult;
}

function parseMap(from: Object): Map<string, string> {
  const map = new Map();
  Object.entries(from).forEach((entry) => {
    const key = entry[0];
    const value = `${entry[1]}`;
    map.set(key, value);
  });
  return map;
}

async function fetchGoogleApi(args: {
  key: string;
  baseUrl: string;
  params: Map<string, string>;
}) {
  const { baseUrl, key, params } = args;
  const url = new URL(baseUrl);
  url.searchParams.set("key", key);
  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });
  console.log(`request api ${url.href}`);
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error(`cannot fetch ${url.href}`);
  }
  const result = await response.json();

  if (result.status == "OK") {
    return result;
  } else {
    throw new Error(result.status);
  }
}
