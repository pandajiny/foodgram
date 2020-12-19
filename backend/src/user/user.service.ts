import { DB_NAME, doGetQuery } from "../db/db.services";
import { getSelectUserQuery } from "../db/query/user.query";

export async function getUserData(args: {
  userId?: string;
  email?: string;
}): Promise<UserData> {
  const { email, userId } = args;
  if (!userId && !email) {
    throw `invalid request`;
  }
  const query = getSelectUserQuery({
    userId,
    email,
  });

  const users = await doGetQuery<UserData>({
    dbName: DB_NAME.MAIN,
    query,
  });

  if (users.length == 1) {
    return users[0];
  } else {
    if (users.length > 1) {
      throw `user duplicated. user count : ${users.length}`;
    } else {
      throw `user not exist / email : ${email}, userId : ${userId}`;
    }
  }
}
