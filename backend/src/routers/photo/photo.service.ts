import fetch from "node-fetch";
import { GOOGLE_API_KEY } from "../../constants";

export async function getPhoto(photoRef: string): Promise<PhotoResult> {
  const key = GOOGLE_API_KEY;
  const baseUrl = `https://maps.googleapis.com/maps/api/place/photo`;
  const url = `${baseUrl}?maxheight=400&photoreference=${photoRef}&key=${key}`;
  const result = await fetch(url);

  if (!result.ok) {
    return {
      url: null,
    };
  }
  const photoUrl = result.url;
  return {
    url: photoUrl,
  };
}
