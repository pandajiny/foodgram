import { Response } from "express";

export function isInvalidRequest(request: { [key: string]: any }): boolean {
  const undefinedKeys = getUndefinedKeys(request);
  if (undefinedKeys != null) {
    const errMessage = `invalid request fill all params : ${undefinedKeys.join(
      ", "
    )}`;
    console.log(errMessage);
    return true;
  } else {
    return false;
  }
}

export function getUndefinedKeys(args: {
  [key: string]: any;
}): string[] | null {
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
