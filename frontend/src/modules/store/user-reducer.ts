import { Action, AnyAction, Reducer } from "redux";

type UserState = {
  user: User | null | undefined;
};
const initialState: UserState = {
  user: undefined,
};

const SET_USER = "user/set" as const;
export function setUser(user: User | null): AnyAction {
  return {
    type: SET_USER,
    payload: user,
  };
}

type UserAction = ReturnType<typeof setUser>;

export const userReducer: Reducer<UserState> = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};
