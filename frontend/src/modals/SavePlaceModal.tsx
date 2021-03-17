import React, { useEffect, useState } from "react";
import SAVED_ICON from "../images/icons/icon_saved_white.png";
import CANCEL_ICON from "../images/icons/icon_cancel.png";
import { editSavedPlace, savePlace } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../modules/store";

interface SavePlaceModalProps {
  place: Place;
  myPlace?: UserPlace;
  onCancel: () => void;
  isActive: boolean;
  isEdit?: true;
}
export function SavePlaceModal({
  isActive,
  onCancel,
  place,
  isEdit,
  myPlace,
}: SavePlaceModalProps) {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [name, setName] = useState(place.name);
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState(myPlace?.rate || 1);
  useEffect(() => {
    setDescription(myPlace?.description || "");
    setRate(myPlace?.rate || 1);
  }, [myPlace]);

  useEffect(() => {
    setName(place.name);
    setDescription("");
    setRate(1);
  }, [place]);

  async function handleSavePlace() {
    const { address, id, lat, lng, name, phone_number } = place;
    if (lat && lng && id && user?.uid) {
      const request: RequestSavePlace = {
        userId: user.uid,
        placeId: id,
        rate,
        description,
      };
      if (isEdit) {
        if (!myPlace) {
          throw new Error(`cannot get saved place information`);
        } else {
          myPlace.description = description;
          myPlace.rate = rate;
          editSavedPlace(myPlace).then(onCancel);
        }
      } else {
        savePlace(request).then(onCancel);
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
            <h3 className="address">{place.address}</h3>
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
          <img className="cancel-icon" src={CANCEL_ICON} onClick={onCancel} />
        </div>
      </div>
    );
  }
}
