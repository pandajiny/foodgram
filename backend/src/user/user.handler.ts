import { RequestHandler } from "express";
import { DB_NAME, doGetQuery } from "../db/db.services";
import { getSelectUserQuery } from "../db/query";
import { httpError, httpResponse, HttpStatus } from "../http/http.service";

// GET /users/:userId
// result : User
export const getUserHandler: RequestHandler = async function (
  req,
  res
): Promise<HttpResponse<User>> {
  const { userId } = req.params;

  const query = getSelectUserQuery({
    userId,
  });

  const userData = await doGetQuery<UserData>({
    query,
    dbName: DB_NAME.MAIN,
  }).catch((err) => {
    throw httpError(res, HttpStatus.UNAUTHORIZED, err);
  });

  const { email, name } = userData[0];
  const user: User = {
    email,
    name,
    userId,
  };

  return httpResponse<User>(res, user);
};
