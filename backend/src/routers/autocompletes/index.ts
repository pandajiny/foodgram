import express, { RequestHandler } from "express";
import { placeAPIs } from "../../modules/google-place-search";
import { asyncHandler } from "../../modules/http";
import { validateRequest } from "../../place-controllers";

const getAutoCompletionHandler: RequestHandler = async function (req, res) {
  const input = req.query.input as string;
  validateRequest({ input });
  return await placeAPIs.getAutocompletes(input);
};

const router = express.Router();
router.get("/", asyncHandler(getAutoCompletionHandler));

export const AutocompletesRouter = router;
