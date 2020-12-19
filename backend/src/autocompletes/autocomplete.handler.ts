import { RequestHandler } from "express";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";
import { getAutocomplete } from "../modules/google-place-search";
import { isInvalidRequest } from "../place-controllers";

export const getAutoCompletionHandler: RequestHandler = async function (
  req,
  res
) {
  const input = req.query.input as string;

  console.log(`autocomplete request input : ${input}`);
  if (isInvalidRequest({ input })) {
    throw httpError(
      res,
      HttpStatus.BAD_REQUEST,
      `invalid request : fill the form`
    );
  }

  const result = await getAutocomplete(input).catch((err) => {
    throw httpError(res, HttpStatus.FORBIDDEN, `cannot fetch ${err}`);
  });

  return httpResponse(res, result);
};
