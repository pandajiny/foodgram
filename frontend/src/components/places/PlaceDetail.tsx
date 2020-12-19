import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { savePlace } from "../../api";
import SaveIcon from "../../images/icons/icon_save.png";

import "../../styles/places/place-detail.scss";

interface PlaceDetailProps {
  place?: google.maps.places.PlaceResult;
}

export function PlaceDetail(props: PlaceDetailProps) {
  const { place } = props;

  // const place: google.maps.places.PlaceResult = {
  //   name: "가상의 식당",
  //   formatted_address: "문래 파라곤 101동 201호 해선이방 옆",
  // };

  const [isSaving, setIsSaving] = useState(false);

  const saveContainerRef = useRef<HTMLDivElement>(null);

  function handleSaveButtonClick() {
    if (saveContainerRef.current) {
      saveContainerRef.current.style.display = "block";
    }
  }
  if (!place) {
    return <div>장소를 선택해 주세요</div>;
  }

  return (
    <div className="place-detail-component">
      <div className="header">
        <div className="information">
          <h1 className="title">{place.name}</h1>
          <p className="address">{place.formatted_address}</p>
        </div>
        <div className="action-buttons">
          <button className="save-button" onClick={handleSaveButtonClick}>
            <img src={SaveIcon}></img>
            <label>저장</label>
          </button>
        </div>
      </div>
      <div ref={saveContainerRef} style={{ display: "none" }}>
        <SavePlace place={place} />
      </div>
    </div>
  );
}

import "../../styles/places/place-save.scss";

export function SavePlace(props: { place: google.maps.places.PlaceResult }) {
  const { place } = props;
  function handleSubmitButtonClick() {
    if (place.name && place.place_id && place.geometry) {
      const request: SavePlaceRequest = {
        name: place.name,
        placeId: place.place_id,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        userId: "pandajiny_temp_user_id",
      };
      savePlace(request);
    }
  }
  return (
    <div className="save-place-component">
      <h3 className="title">장소 저장하기</h3>
      <div className="input-form">
        <input placeholder="장소 설명을 적어주세요" />
        <button onClick={handleSubmitButtonClick}>완료</button>
      </div>
    </div>
  );
}
