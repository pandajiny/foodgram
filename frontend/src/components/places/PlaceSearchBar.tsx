import React, { useState } from "react";
import { getPlaceDetail } from "../../api";
import { setChangeListener, onEnter } from "../../modules/document-module";
import SEARCH_ICON from "../../images/icons/icon_search_gray.png";
import CANCEL_ICON from "../../images/icons/icon_cancel.png";
import { FoodgramService } from "../../App";

interface SearchBarProps {
  onBlur?: () => void;
  placeholder?: string;
  onSelect: (placeId: string) => void;
}

export function PlaceSearchBar({
  onSelect,
  onBlur,
  placeholder,
}: SearchBarProps) {
  const [input, setInput] = useState(placeholder || "");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  async function getAutocompletes(input: string) {
    return await FoodgramService.get<Autocomplete[]>("/autocompletes", {
      params: { input },
    })
      .then((resp) => resp.data)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  return (
    <div className="place-search-bar">
      <div className={`input-form ${predictions.length > 0 ? "focus" : ""}`}>
        <img className="icon" src={SEARCH_ICON}></img>
        <input
          value={input}
          placeholder="장소를 입력하세요"
          onChange={(ev) => setChangeListener(ev, setInput)}
          onKeyPress={(ev) =>
            onEnter(ev, () => getAutocompletes(input).then(setPredictions))
          }
        ></input>
        <img className="cancel-icon" src={CANCEL_ICON} onClick={onBlur}></img>
      </div>
      {predictions.length > 0 && (
        <div className="autocomplete-list">
          {predictions.map((prediction) => (
            <div
              key={Math.random()}
              onClick={() => {
                onSelect(prediction.place_id);
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
