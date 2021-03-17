import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./user-reducer";

const rootReducer = combineReducers({
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
