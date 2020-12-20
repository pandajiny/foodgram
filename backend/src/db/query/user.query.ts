import { DB_TABLES } from "../db.services";

export function getSelectUserQuery(args: {
  email?: string;
  userId?: string;
}): string {
  const { email, userId } = args;
  if (userId) {
    const query = `
            SELECT * FROM ${DB_TABLES.USERS}
            WHERE user_id = "${userId}";
        `;
    return query;
  } else if (email) {
    const query = `
        SELECT * FROM ${DB_TABLES.USERS}
        WHERE email = "${email}";
      `;
    return query;
  } else {
    throw `invalid request / email : ${email}, userId : ${userId}`;
  }
}
