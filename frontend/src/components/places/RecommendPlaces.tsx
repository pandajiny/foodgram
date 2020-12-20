import React from "react";
import { SavedPlace } from "./SavedPlace";

export function RecommendPlaces(props: { places: SavedPlace[] }) {
  const { places } = props;
  console.log(places);
  return (
    <div className="recommend-places">
      <h3 className="title">
        {places.length > 0 ? " 내 저장한 장소 목록" : "저장한 장소가 없습니다."}
      </h3>
      {places.map((place) => (
        <SavedPlace key={Math.random()} place={place} />
      ))}
    </div>
  );
}
