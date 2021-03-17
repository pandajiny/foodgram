import { RequestHandler, Router } from "express";
import { asyncHandler } from "../../modules/http";
import { authGuard } from "../../guards";
import { validateRequest } from "../../place-controllers";
import { getUserPlaces, savePlace } from "./user.service";

const handlerGetUserPlaces: RequestHandler = async function (req, res) {
  const { userId: uid } = req.params;
  validateRequest({ uid });
  return await getUserPlaces({ uid });
};

const handlerSavePlace: RequestHandler = async function (req, res) {
  const request: RequestSavePlace = { ...req.params, ...req.body };
  validateRequest(request);
  return await savePlace(request);
};

const router = Router();

router.use(authGuard);
router.get("/:userId/places", asyncHandler(handlerGetUserPlaces));
router.post("/:userId/places", asyncHandler(handlerSavePlace));
// router.get("/:userId/places", asyncHandler(getSavedPlacesHandler));
// router.post("/:userId/places/", savePlaceController);
// router.get("/:userId/places/:placeId", getSavedPlaceHandler);
// router.put("/:userId/places/:placeId", editSavedPlaceController);

export const UserRouter = router;
