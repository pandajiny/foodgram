import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api";
import { PlaceSearchBar } from "../components/places/PlaceSearchBar";
import { PATH } from "../constants";
import { NaverMap } from "../modules/react-naver-map";
import { NAVER_CLIENT_ID } from "../secrets";

import SEARCH_ICON from "../images/icons/icon_search_gray.png";
import { Photo } from "../modules/google-photo-api";

export function MainPage() {
  const history = useHistory();

  const [user, setUser] = useState<User>();
  const [place, setPlace] = useState<google.maps.places.PlaceResult>();
  const [map, setMap] = useState<naver.maps.Map>();

  const [title, setTitle] = useState("장소를 검색해 주세요.");
  const [isSearch, setIsSearch] = useState(false);

  // get user informaion
  useEffect(() => {
    getUser().then((u) => {
      if (u) {
        setUser(u);
      } else {
        history.push(PATH.LOGIN_REQUIRE);
      }
    });
  }, []);

  return (
    <div className="main-page page">
      <div className="main-container">
        <div className="title-container">
          {!isSearch ? (
            <div className={`title ${place ? "" : "unactive"}`}>
              <h2>{title}</h2>
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
              onBlur={() => {
                setIsSearch(false);
              }}
              onSelect={(place) => {
                setPlace(place);
                setTitle(place.name);
                setIsSearch(false);
              }}
            />
          )}
        </div>
        <div>
          <h3>
            <Photo />
          </h3>
        </div>
      </div>
      <div className="map-container">
        <NaverMap
          $elementId="naver-map"
          clientId={NAVER_CLIENT_ID}
          width="100%"
          height="100%"
          // center={mapCenter}
          // zoom={mapZoomLevel}
          onInitialized={setMap}
        />
      </div>
    </div>
  );
}
