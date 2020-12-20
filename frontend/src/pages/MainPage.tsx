import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { doLogout, getSavedPlaces, getUser } from "../api";
import { PlaceSearchBar } from "../components/places/PlaceSearchBar";
import { PATH } from "../constants";
import { NaverMap } from "../modules/react-naver-map";
import { NAVER_CLIENT_ID } from "../secrets";

import SEARCH_ICON from "../images/icons/icon_search_gray.png";
import { PlaceDetail } from "../components/places/PlaceDetail";
import { UserState } from "../components/user/UserState";
import { RecommendPlaces } from "../components/places/RecommendPlaces";

export function MainPage() {
  const history = useHistory();

  // user state
  const [user, setUser] = useState<User | null>();

  // get user information
  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, []);

  // load saved places
  useEffect(() => {
    loadSavedPlaces();
  }, [user]);

  // dom state
  const [title, setTitle] = useState("어서오세요 !");
  const [isSearch, setIsSearch] = useState(false);

  // map state
  const [map, setMap] = useState<naver.maps.Map>();
  const [mapZoom, setMapZoom] = useState(11);
  const [mapCenter, setMapCenter] = useState<naver.maps.LatLng>();
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [place, setPlace] = useState<google.maps.places.PlaceResult>();

  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

  // update marker when place updated
  useEffect(() => {
    if (place && place.geometry) {
      history.push(`${PATH.MAIN}/${place.place_id}`);
    } else {
      loadSavedPlaces();
    }
  }, [place]);

  useEffect(() => {
    const markers = savedPlaces.map((place) => {
      const position = new naver.maps.LatLng(place.lat, place.lng);
      const marker: MarkerProps = {
        title: place.name,
        position,
        type: "SAVED_PLACE",
      };
      return marker;
    });
    setMarkers(markers);
  }, [savedPlaces]);

  function loadSavedPlaces() {
    if (!user) {
      return;
    }

    getSavedPlaces(user.userId).then((places) => {
      setSavedPlaces(places);
    });
  }

  function handlePlaceSelected(place: google.maps.places.PlaceResult) {
    if (place.geometry) {
      const position = new naver.maps.LatLng(
        place.geometry.location.lat,
        place.geometry.location.lng
      );
      const marker: MarkerProps = {
        title: place.name,
        position,
        address: place.formatted_address,
        type: "DEFAULT",
      };

      setMapZoom(16);
      setMapCenter(position);
      setMarkers((prev) => [...prev, marker]);
    }
  }

  return (
    <div className="main-page page">
      <div className="main-container">
        <div className="title-container">
          {!isSearch ? (
            <div className={`title`}>
              <img
                className="icon"
                src={SEARCH_ICON}
                onClick={() => {
                  setIsSearch(true);
                }}
                style={{ cursor: "pointer" }}
              ></img>
            </div>
          ) : (
            <PlaceSearchBar
              placeholder={place?.name || ""}
              onBlur={() => {
                setIsSearch(false);
              }}
              onSelect={(place) => {
                setPlace(place);
                setTitle("");
                setIsSearch(false);
              }}
            />
          )}
        </div>
        <Switch>
          <Route path={PATH.PLACE_DETAIL}>
            <PlaceDetail
              onPlaceSelected={handlePlaceSelected}
              onClosed={() => setPlace(undefined)}
            />
          </Route>
          <Route exact path={PATH.MAIN}>
            <UserState
              user={user}
              doLogout={() => {
                doLogout();
                setUser(null);
                location.reload();
              }}
            />
            <RecommendPlaces places={savedPlaces} />
          </Route>
        </Switch>
      </div>
      <div className="map-container">
        <NaverMap
          $elementId="naver-map"
          clientId={NAVER_CLIENT_ID}
          width="100%"
          height="100%"
          markers={markers}
          center={mapCenter}
          zoom={mapZoom}
          onInitialized={setMap}
        />
      </div>
    </div>
  );
}
