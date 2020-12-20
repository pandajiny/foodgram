import { serverUrl } from "..";
import { getCookie } from "../../modules/document-module";

export async function getUser(): Promise<User | null> {
  const token = getCookie("token");
  if (!token) {
    return null;
  }

  const url = `${serverUrl}/auth/user`;
  console.log(`request to ${url}`);
  const response = await fetch(url, {
    headers: {
      token,
    },
  });
  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as HttpResponse<User>;
  const user = result.data;
  if (result.ok && user) {
    return user;
  } else {
    console.log(`error : ${result.error_message}`);
    return null;
  }
}

export async function doLogin(request: LoginRequest): Promise<void> {
  const url = `${serverUrl}/auth/login`;
  console.log(`do login`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const result = (await response.json()) as HttpResponse<LoginResult>;
  const token = result.data?.token;
  if (result.ok && token) {
    document.cookie = `token=${token}`;
    return;
  } else {
    throw result.error_message;
  }
}

export async function doLogout() {
  document.cookie = `token=`;
}

export async function doSignup(request: SignupRequest): Promise<void> {
  const url = `${serverUrl}/auth/signup`;
  console.log(`do signup`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const result = (await response.json()) as HttpResponse<null>;
  if (result.ok) {
    return;
  } else {
    throw result.error_message;
  }
}
