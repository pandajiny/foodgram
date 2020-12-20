import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { PATH } from "./constants";
import { LoginRequire } from "./pages/LoginRequire";
import { MainPage } from "./pages/MainPage";
import { SignupPage } from "./pages/SignupPage";
import { getUser } from "./api";

export function App() {
  return (
    <div className="app">
      <Switch>
        <Route path={PATH.LOGIN}>
          <LoginPage />
        </Route>
        <Route path={PATH.SIGNUP}>
          <SignupPage />
        </Route>
        <Route path={PATH.LOGIN_REQUIRE}>
          <LoginRequire />
        </Route>
        <Route path={PATH.MAIN}>
          <MainPage />
        </Route>
        <Route exact path={PATH.DEFAULT}>
          <DefaultRoute />
        </Route>
        <Route>
          <div>404 not found</div>
        </Route>
      </Switch>
    </div>
  );
}

function DefaultRoute() {
  const history = useHistory();
  useEffect(() => {
    getUser().then((u) => {
      if (u) {
        history.push(PATH.MAIN);
      } else {
        history.push(PATH.LOGIN_REQUIRE);
      }
    });
  }, []);
  return <></>;
}
