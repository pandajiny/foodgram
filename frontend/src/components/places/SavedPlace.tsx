import React from "react";
import { getDateString } from "../../modules/document-module";

export function SavedPlace(props: { place: SavedPlace }) {
  const { place } = props;
  const { description } = place;

  return (
    <div className="saved-place">
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
