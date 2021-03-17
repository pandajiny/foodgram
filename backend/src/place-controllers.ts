import { BadRequestException } from "./modules/http";

export function validateRequest(request: { [key: string]: any }) {
  const undefinedKeys = getUndefinedKeys(request);
  if (undefinedKeys != null) {
    const errMessage = `invalid form list : ${undefinedKeys.join(", ")}`;
    throw new BadRequestException(errMessage);
  }
}

function getUndefinedKeys(args: { [key: string]: any }): string[] | null {
  const emptyKeys: string[] = [];
  Object.entries(args).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    if (value == undefined) {
      emptyKeys.push(key);
    }
  });
  return emptyKeys.length > 0 ? emptyKeys : null;
}
