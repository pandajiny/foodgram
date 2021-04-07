import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { IntroducePage } from "./pages/IntroducePage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { SignupPage } from "./pages/SignupPage";
import { getUser } from "./api";
import { setUser } from "./modules/store/user-reducer";
import {
  DEFAULT_PATH,
  INTRODUCE_PATH,
  LOGIN_PATH,
  PLACE_DETAIL_PATH,
  SIGNUP_PATH,
} from "./constants";

const publicPaths = [LOGIN_PATH, SIGNUP_PATH, INTRODUCE_PATH];

export function PageRouter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    getUser().then((user) => {
      if (publicPaths.includes(location.pathname) && user) {
        history.push(DEFAULT_PATH);
      }
      dispatch(setUser(user));
    });
  }, [location]);

  return (
    <Switch>
      <Route path={LOGIN_PATH}>
        <LoginPage />
      </Route>
      <Route path={SIGNUP_PATH}>
        <SignupPage />
      </Route>
      <Route path={INTRODUCE_PATH}>
        <IntroducePage />
      </Route>
      <Route exact path={[DEFAULT_PATH, PLACE_DETAIL_PATH]}>
        <MainPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

function NotFoundPage() {
  return <div>404 not found</div>;
}
