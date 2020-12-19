import { doGetRequest, serverUrl } from ".";

// path : /place/autocomplete?input=[장소이름]
export async function getAutocompletions(args: {
  input: string;
}): Promise<google.maps.places.AutocompletePrediction[]> {
  const { input } = args;
  const url = `${serverUrl}/autocomplete?input=${input}`;

  const result = await doGetRequest<
    google.maps.places.AutocompletePrediction[]
  >(url);

  return result;
}
