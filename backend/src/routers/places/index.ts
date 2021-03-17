import express from "express";
import { asyncHandler } from "../../modules/http";
import { handlerPlaceDetail } from "./place.handler";

// /places
const router = express.Router();
router.get("/:placeId", asyncHandler(handlerPlaceDetail));
export const PlaceRouter = router;
