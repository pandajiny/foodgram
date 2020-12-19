import { RequestHandler } from "express";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";
import { doLogin, doSignup, validJWT } from "./auth.service";

// POST /auth/signup
// result : null
export const signupHandler: RequestHandler = async function (req, res) {
  const request: SignupRequest = req.body;
  console.log(`signup request from ${request.name}`);
  const result = await doSignup(request).catch((err) => {
    throw httpError(res, HttpStatus.BAD_REQUEST, err);
  });
  console.log(`signup request done / name : ${request.name}`);

  return httpResponse(res, result);
};

// POST /auth/login
// result : LoginResult
export const loginHandler: RequestHandler = async function (req, res) {
  const request: LoginRequest = req.body;
  console.log(`login request from ${request.email}`);
  const result = await doLogin(request).catch((err) => {
    throw httpError(res, HttpStatus.UNAUTHORIZED, err);
  });
  console.log(`login success / email : ${request.email}`);
  return httpResponse(res, result);
};

export const authUserHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<User>> {
  const { token } = req.headers;
  if (!token) {
    throw httpError(res, HttpStatus.BAD_REQUEST, `cannot parse token`);
  }

  const user = await validJWT(token as string);
  if (user) {
    return httpResponse(res, user);
  } else {
    throw httpError(res, HttpStatus.UNAUTHORIZED, `token invalid`);
  }
};
