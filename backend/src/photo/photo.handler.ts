import { RequestHandler } from "express";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";
import { getPhoto } from "./photo.service";

export const getPhotoHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<PhotoResult>> {
  const { photoRef } = req.params;
  const result = await getPhoto(photoRef).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, err);
  });
  console.log(`got photo from ${photoRef}`);
  return httpResponse(res, result);
};
