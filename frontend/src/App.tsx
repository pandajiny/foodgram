import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { PATH } from "./constants";
import { LoginRequire } from "./pages/LoginRequire";
import { MainPage } from "./pages/MainPage";
import { SignupPage } from "./pages/SignupPage";

export function App() {
  // const [mapCenter, setMapCenter] = useState<naver.maps.LatLng>();
  // const [mapZoomLevel, setMapZoom] = useState<number>();

  // useEffect(() => {
  //   loadMyPlace();
  // }, [map]);

  // async function loadMyPlace() {
  //   if (map) {
  //     const myPlaces = await getSavedPlaces("pandajiny_temp_user_id");
  //     console.log(<MarkerIcon place={myPlaces[0]} />);
  //     myPlaces.forEach((place) => {
  //       const options: naver.maps.MarkerOptions = {
  //         map: map,
  //         position: new naver.maps.LatLng(place.lat, place.lng),
  //         icon: renderHTMLIcon(
  //           <MarkerIcon key={Math.random()} place={place} />
  //         ),
  //       };
  //       setMarker(options);
  //     });
  //   }
  // }

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
        <Route path={PATH.MAIN} exact>
          <MainPage />
        </Route>
        <Route>
          <div>404 not found</div>
        </Route>
      </Switch>
    </div>
  );
}
