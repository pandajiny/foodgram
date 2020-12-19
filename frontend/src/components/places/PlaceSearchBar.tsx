import React, { useState } from "react";
import { getPlaceDetail } from "../../api";
import { getAutocompletions } from "../../api/autocomplete.api";
import {
  setChangeListener,
  setEnterKeyPressListener,
} from "../../modules/document-module";
import SEARCH_ICON from "../../images/icons/icon_search_gray.png";
import CANCEL_ICON from "../../images/icons/icon_cancel.png";

export function PlaceSearchBar(props: {
  onBlur?: () => void;
  placeholder?: string;
  onSelect: (place: google.maps.places.PlaceResult) => void;
}) {
  const [input, setInput] = useState(props.placeholder || "");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  return (
    <div className="place-search-bar">
      <div className={`input-form ${predictions.length > 0 ? "focus" : ""}`}>
        <img className="icon" src={SEARCH_ICON}></img>
        <input
          value={input}
          placeholder="장소를 입력하세요"
          onChange={(ev) => setChangeListener(ev, setInput)}
          onKeyPress={(ev) =>
            setEnterKeyPressListener(ev, () =>
              getAutocompletions({ input }).then(setPredictions)
            )
          }
        ></input>
        <img
          className="cancel-icon"
          src={CANCEL_ICON}
          onClick={props.onBlur}
        ></img>
      </div>
      {predictions.length > 0 && (
        <div className="autocomplete-list">
          {predictions.map((prediction) => (
            <div
              key={Math.random()}
              onClick={() => {
                const placeId = prediction.place_id;
                getPlaceDetail({ placeId }).then((place) => {
                  setInput("");
                  setPredictions([]);
                  props.onSelect(place);
                });
              }}
            >
              <PredictionItem prediction={prediction} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PredictionItem(props: {
  prediction: google.maps.places.AutocompletePrediction;
}) {
  const { prediction } = props;
  return (
    <div className="autocomplete-item">
      <p className="title">{prediction.structured_formatting.main_text}</p>
      <p className="subtitle">
        {prediction.structured_formatting.secondary_text}
      </p>
    </div>
  );
}
