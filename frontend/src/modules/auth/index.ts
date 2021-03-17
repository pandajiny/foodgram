import { AuthService } from "../../App";

const getUser = async (): Promise<User | null> => {
  return await AuthService.get<User>("/auth")
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
};

export async function doLogin(request: LoginRequest): Promise<void> {
  await AuthService.post("/auth", request)
    .then((resp) => resp.data)
    .catch((err) => {
      console.error(err);
      throw `로그인 할 수 없습니다`;
    });
}

export async function doLogout() {
  throw `Not implement`;
  //   document.cookie = `token=`;
}

export async function doSignup(request: SignupRequest): Promise<void> {
  //   const url = `${serverUrl}/auth/signup`;
  //   console.log(`do signup`);
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(request),
  //   });
  //   const result = (await response.json()) as HttpResponse<null>;
  //   if (result.ok) {
  //     return;
  //   } else {
  //     throw result.error_message;
  //   }
}
