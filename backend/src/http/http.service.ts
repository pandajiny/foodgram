import { Response } from "express";
export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  PAGE_NOT_FOUND: 404,
};

export function httpResponse<T>(
  res: Response<any | number>,
  result: T
): HttpResponse<T> {
  const response: HttpResponse<T> = {
    ok: true,
    data: result,
  };
  res.send(response);
  return response;
}

export function httpError(
  res: Response<any | number>,
  status: number,
  errMessage: string
): Error {
  res.status(status).send(errMessage);
  return new Error(errMessage);
}
