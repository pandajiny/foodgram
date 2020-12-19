import { hashPassword } from "../../auth/auth.service";
import { getUniqueString } from "../db.services";

export function getSignupQuery(request: SignupRequest): string {
  const { name, email, _password } = request;
  const password = hashPassword(_password);
  const userId = getUniqueString();
  console.log(userId);
  return `
    INSERT INTO users
    (user_id, name, email, password)
    VALUES
    ("${userId}", "${name}", "${email}", "${password}");
  `;
}
