import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getSavedPlaces, getUser } from "../api";
import { PlaceSearchBar } from "../components/places/PlaceSearchBar";
import { PATH } from "../constants";
import { NaverMap } from "../modules/react-naver-map";
import { NAVER_CLIENT_ID } from "../secrets";

import SEARCH_ICON from "../images/icons/icon_search_gray.png";
import { PlaceDetail } from "../components/places/PlaceDetail";

export function MainPage() {
  const history = useHistory();

  const [user, setUser] = useState<User | null>();

  const [map, setMap] = useState<naver.maps.Map>();
  const [mapZoom, setMapZoom] = useState(11);
  const [mapCenter, setMapCenter] = useState<naver.maps.LatLng>();
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  // const samplePlace: google.maps.places.PlaceResult = {
  //   name: "가상의 식당",
  //   formatted_address: "문래 파라곤 101동 201호 해선이방 옆",
  //   photos: [
  //     {
  //       photo_reference: "",
  //       // photo_reference:
  //       //   "ATtYBwJM7SqWDZfMsWOHe4EHoDHYjiTYiiRrhST77PzA0DSwYoZzIxcgN5WHTR1hfhomLTZIDTIrDrW-t0VqZ8wrQWStG-j9VSs_FlxC3l5YCE7HyvWrq4pOhEPBjb-vc2ga7SvxWX_qLMMwpjgLBLuZD-K2GiaOL8DTcnBZ6BvJHvEp0pee",
  //       height: 4,
  //       width: 3,
  //       html_attributions: [""],
  //       getUrl: () => "",
  //     },
  //   ],
  // };

  const [place, setPlace] = useState<google.maps.places.PlaceResult>();

  useEffect(() => {
    getUser().then((u) => setUser(u));
  }, []);

  useEffect(() => {
    if (user) {
      getSavedPlaces(user.userId).then((places) => {
        const markers = places.map((place) => {
          const position = new naver.maps.LatLng(place.lat, place.lng);
          const marker: MarkerProps = {
            content: place.name,
            position,
            type: "",
          };
          return marker;
        });
        setMarkers(markers);
      });
    }
  }, [user]);

  useEffect(() => {
    if (place && place.geometry) {
      const position = new naver.maps.LatLng(
        place.geometry.location.lat,
        place.geometry.location.lng
      );
      const marker: MarkerProps = {
        content: place.name,
        position,
        type: "",
      };
      console.log(`set markers`);
      setMapZoom(16);
      setMapCenter(position);
      setMarkers((prev) => [...prev, marker]);
    }
  }, [place]);

  const [title, setTitle] = useState("어서오세요 !");
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
            <div className={`title`}>
              <h2>{place ? "" : title}</h2>
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
        {place && <PlaceDetail place={place} />}
        {/* <PlaceDetail /> */}
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
