import React from "react";
import { getDateString } from "../../modules/document-module";

export function PlaceReview(props: {
  place: SavedPlace;
  onEditCallback: () => void;
}) {
  const { place } = props;
  return (
    <div className="place-review">
      <p className="create-time">{getDateString(place.create_datetime)} 작성</p>
      <div className="rate">
        {new Array(place.rate).fill("").map(() => (
          <p key={Math.random()}>★</p>
        ))}
      </div>
      {place.description ? (
        <p className="description">{place.description}</p>
      ) : (
        <p className="description disabled">리뷰 내용이 없습니다.</p>
      )}
      <button className="edit-button" onClick={props.onEditCallback}>
        수정
      </button>
    </div>
  );
}

// need edit button
