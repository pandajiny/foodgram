import React from "react";
import { useHistory } from "react-router-dom";
import { getDateString } from "../../modules/document-module";

export function SavedPlace(props: { place: UserPlace }) {
  const { place } = props;
  const { description } = place;
  const history = useHistory();

  return (
    <div
      className="saved-place"
      onClick={() => {
        history.push(`/places/${place.placeId}`);
      }}
    >
      <p className="date">{getDateString(place.create_datetime)}</p>
      <div className="content">
        <h3 className="name">{place.name}</h3>
        <div className="rate">
          {new Array(place.rate)
            .fill("")
            .map(() => {
              return `★`;
            })
            .join("")}
        </div>
        {description ? (
          <p className="description">{place.description}</p>
        ) : (
          <p className="description disabled">리뷰 내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
