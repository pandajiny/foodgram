import React, { useEffect, useReducer, useState } from "react";
import SAVED_ICON from "../images/icons/icon_saved_white.png";
import CANCEL_ICON from "../images/icons/icon_cancel.png";
import { editSavedPlace, getUser, savePlace } from "../api";

export function SavePlaceModal(props: {
  place: google.maps.places.PlaceResult;
  savedPlace?: SavedPlace;
  onCancel: () => void;
  isActive: boolean;
  isEdit?: true;
}) {
  const { place, isActive, isEdit, savedPlace } = props;

  const [name, setName] = useState(place.name);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(savedPlace?.rate || 1);
  useEffect(() => {
    setDescription(savedPlace?.description || "");
    setRate(savedPlace?.rate || 1);
  }, [savedPlace]);

  useEffect(() => {
    setName(place.name);
    setDescription("");
    setRate(1);
  }, [place]);

  async function handleSavePlace() {
    const lat = place.geometry?.location.lat;
    const lng = place.geometry?.location.lng;
    const placeId = place.place_id;
    const user = await getUser();
    if (lat && lng && placeId && user?.userId) {
      const request: SavePlaceRequest = {
        userId: user.userId,
        lat,
        lng,
        name,
        placeId,
        rate,
        description,
      };
      if (isEdit) {
        if (!savedPlace) {
          throw new Error(`cannot get saved place information`);
        } else {
          savedPlace.description = description;
          savedPlace.rate = rate;
          editSavedPlace(savedPlace).then(props.onCancel);
        }
      } else {
        savePlace(request).then(props.onCancel);
      }
    }
  }
  if (!isActive) {
    return <></>;
  } else {
    return (
      <div className="save-place-modal">
        <div className="content">
          <div className="header">
            <h2 className="title">{place.name}</h2>
            <h3 className="address">{place.formatted_address}</h3>
            <div className="icon-container" onClick={handleSavePlace}>
              <img className="icon" src={SAVED_ICON}></img>
              <label>{isEdit ? `수정` : `저장`}</label>
            </div>
          </div>
          <div className="form">
            <input
              className="place-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <select
              value={rate}
              onChange={(ev) => setRate(parseInt(ev.target.value))}
            >
              <option value={1}>★</option>
              <option value={2}>★★</option>
              <option value={3}>★★★</option>
            </select>
            <textarea
              className="description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="식당에 대한 설명을 적어주세요."
            ></textarea>
          </div>
          <img
            className="cancel-icon"
            src={CANCEL_ICON}
            onClick={props.onCancel}
          />
        </div>
      </div>
    );
  }
}
