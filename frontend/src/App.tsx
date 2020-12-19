import React, { useContext, useEffect, useState } from "react";
import { NaverMap } from "./modules/react-naver-map";
import { renderHTMLIcon, setMarker } from "./modules/react-naver-map/overlay";
import { ActionPage } from "./pages/ActionPage";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";

export function App() {
  const history = useHistory();

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

import PIN_ICON from "./images/icons/icon_pin.png";
import "./styles/places/marker.scss";
import { getSavedPlaces, getUser } from "./api";
import { SetUserContext, UserContext } from "./ContextProvicer";
import { MainPage } from "./pages/MainPage";
import { LoginRequire } from "./pages/LoginRequire";
import { PATH } from "./constants";
import { SignupPage } from "./pages/SignupPage";
function MarkerIcon(props: { place: SavedPlace }) {
  const { place } = props;
  return (
    <div className="marker">
      <label>{place.name}</label>
      <img src={PIN_ICON} />
    </div>
  );
}
