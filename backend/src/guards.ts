import { RequestHandler } from "express";
import { UnauthorizedException } from "./modules/http";

export const authGuard: RequestHandler = (req, res, next) => {
  if (!req.session.uid) {
    next(new UnauthorizedException("User not logged in"));
  }
  next();
};
