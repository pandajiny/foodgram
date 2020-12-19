import { doGetRequest, serverUrl } from "..";

export async function getPhoto(photoRef: string): Promise<PhotoResult> {
  const url = `${serverUrl}/photos/${photoRef}`;
  const result = await doGetRequest<PhotoResult>(url);
  return result;
}
