import axios from "axios";
import { GOOGLE_API_KEY } from "../../constants";

async function getAutocompletes(input: string): Promise<Autocomplete[]> {
  const baseUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  const requests: AutocompleteRequest = {
    input: input,
    language: "ko",
  };

  const result = await fetchGoogleApi({
    baseUrl,
    params: requests,
  });
  return result.predictions;
}

async function getPlaceDetail(placeId: string): Promise<PlaceResult> {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json`;

  const request = {
    place_id: placeId,
    language: "ko",
  };

  const result = await fetchGoogleApi({
    baseUrl,
    params: request,
  });
  return result.result;
}

async function fetchGoogleApi(args: { baseUrl: string; params: Object }) {
  const { baseUrl, params } = args;
  const key = GOOGLE_API_KEY;
  console.log(`fetch to ${baseUrl}`);
  return await axios
    .get(baseUrl, {
      params: {
        key,
        ...params,
      },
    })
    .then((resp) => resp.data)
    .then((data) => {
      console.log(`fetch finished ${baseUrl}`);
      if (data.status == "OK") {
        return data;
      } else {
        throw `Cannot fetch to ${baseUrl}`;
      }
    })
    .catch((error) => {
      console.error(error);
      throw `Cannot fetch to ${baseUrl}`;
    });
}

export const placeAPIs = {
  getAutocompletes,
  getPlaceDetail,
};
