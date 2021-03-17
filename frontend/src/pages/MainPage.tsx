import React, { useContext, useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import { doLogout, getPlaceDetail, getSavedPlaces, getUser } from "../api";
import { PlaceSearchBar } from "../components/places/PlaceSearchBar";
import { DEFAULT_PATH, PLACE_DETAIL_PATH } from "../constants";
import { NaverMap, NaverMapOptions } from "../modules/react-naver-map";
import { NAVER_CLIENT_ID } from "../secrets";

import SEARCH_ICON from "../images/icons/icon_search_gray.png";
import { PlaceDetail } from "../components/places/PlaceDetail";
import { UserState } from "../components/user/UserState";
import { RecommendPlaces } from "../components/places/RecommendPlaces";
import { useSelector } from "react-redux";
import { RootState } from "../modules/store";
import { FoodgramService } from "../App";

export function MainPage() {
  const user = useSelector((state: RootState) => state.userReducer.user);

  const history = useHistory();
  const { placeId } = useParams() as {
    placeId?: string;
  };
  function goPlace(placeId: string) {
    history.push(`/places/${placeId}`);
    setIsSearch(false);
  }

  useEffect(() => {
    if (placeId) {
      getPlaceDetail({ placeId }).then(setPlace);
    }
  }, [placeId]);

  const [isSearch, setIsSearch] = useState(false);
  const [place, setPlace] = useState<Place>();
  const [myPlaces, setMyPlaces] = useState<UserPlace[]>([]);
  const [mapOptions, setMapOptions] = useState<NaverMapOptions>({});

  // load saved places
  useEffect(() => {
    if (user) {
      getMyPlaces().then(setMyPlaces);
    }
  }, [user]);

  // update marker when place updated
  useEffect(() => {
    if (place && place.lat && place.lng) {
      history.push(`/places/${place.id}`);
      updateMap(place);
    } else {
      updateMap(null);
    }
  }, [place]);

  async function getMyPlaces(): Promise<UserPlace[]> {
    if (user?.uid) {
      return await FoodgramService.get(`/users/${user.uid}/places`).then(
        (resp) => resp.data
      );
    } else {
      throw `User not logged in`;
    }
  }

  function updateMap(place: Place | null) {
    if (place && place.lat && place.lng) {
      const position = new naver.maps.LatLng(place.lat, place.lng);
      const marker: MarkerProps = {
        title: place.name,
        position,
        address: place.address || "",
        type: "DEFAULT",
      };

      setMapOptions({
        center: position,
        markers: [marker],
        zoom: 16,
      });
    } else {
      setMapOptions((prev) => {
        prev.markers = [];
        return prev;
      });
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
              onSelect={goPlace}
            />
          )}
        </div>
        <Switch>
          <Route path={PLACE_DETAIL_PATH}>
            <PlaceDetail
              onPlaceSelected={setPlace}
              onClosed={() => {
                history.push(DEFAULT_PATH);
              }}
            />
          </Route>
          <Route exact path={DEFAULT_PATH}>
            <UserState user={user} />
            <RecommendPlaces places={myPlaces} />
          </Route>
        </Switch>
      </div>
      <div className="map-container">
        <NaverMap
          $elementId="naver-map"
          clientId={NAVER_CLIENT_ID}
          options={mapOptions}
        />
      </div>
    </div>
  );
}

// useEffect(() => {
//   const markers = savedPlaces.map((place) => {
//     const position = new naver.maps.LatLng(place.lat, place.lng);
//     const marker: MarkerProps = {
//       title: place.name,
//       position,
//       type: "SAVED_PLACE",
//     };
//     return marker;
//   });
//   setMarkers(markers);
// }, [savedPlaces]);
