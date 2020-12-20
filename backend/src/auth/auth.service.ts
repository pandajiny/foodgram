import { createHmac } from "crypto";
import { DB_NAME, doWriteQuery } from "../db/db.services";
import { getSignupQuery } from "../db/query/auth.query";
import { JWT_SECRET, PASSWORD_HASH_SALT } from "../secrets";
import { getUserData } from "../user/user.service";
import jwt from "jsonwebtoken";
import { isInvalidRequest } from "../place-controllers";

export async function doSignup(request: SignupRequest): Promise<ActionResult> {
  const query = getSignupQuery(request);
  const result = await doWriteQuery({
    query,
    dbName: DB_NAME.MAIN,
  });
  return result;
}

export async function doLogin(request: LoginRequest): Promise<LoginResult> {
  const user = await getUserData({
    email: request.email,
  });

  if (hashPassword(request._password) == user.password) {
    const { user_id: userId } = user;
    const token = getJWT({
      userId,
    });
    console.log(token);
    return {
      token,
    };
  } else {
    throw `invalid password`;
  }
}

function getJWT(args: { userId: string; expDays?: number }): string {
  const { userId, expDays } = args;
  const iat = new Date().getTime();
  const exp = iat + 1000 * 60 * 60 * 24 * (expDays || 1);
  const payload: JwtPayload = {
    userId,
    exp,
    iat,
  };
  return jwt.sign(payload, JWT_SECRET);
}

export function hashPassword(_password: string): string {
  return createHmac("sha256", PASSWORD_HASH_SALT)
    .update(_password)
    .digest("hex");
}

export async function validJWT(token: string): Promise<User | null> {
  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  const userData = await getUserData({
    userId: payload.userId,
  });

  const currentDatetime = new Date().getTime();
  if (isInvalidRequest(userData) || payload.exp < currentDatetime) {
    return null;
  } else {
    return {
      email: userData.email,
      name: userData.name,
      userId: userData.user_id,
    };
  }
}
