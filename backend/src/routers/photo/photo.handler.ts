import { RequestHandler } from "express";
import { validateRequest } from "../../place-controllers";
import { getPhoto } from "./photo.service";

export const getPhotoHandler: RequestHandler = async function (req, res) {
  const { photoRef } = req.params;
  validateRequest({ photoRef });
  return await getPhoto(photoRef);
};
