import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpStatus } from "../../constants";

export class HttpException {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

export class InternalException extends HttpException {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_ERROR, message);
  }
}

export const exceptionHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof HttpException) {
    res.status(err.status).send(err.message);
  } else {
    console.error(err);
    res.status(500).send(`Internal Server Error`);
  }
};

type AsyncHandlerWrapper = (handler: RequestHandler) => RequestHandler;

export const asyncHandler: AsyncHandlerWrapper = (handler) => (
  req,
  res,
  next
) => {
  return Promise.resolve(handler(req, res, next))
    .then((result: any) => {
      if (result) {
        res.status(HttpStatus.OK).json(result);
      } else {
        res.sendStatus(HttpStatus.OK);
      }
      next();
    })
    .catch(next);
};
