import React from "react";
import NOT_FOUND from "../../images/not_found.jpg";

export function PhotoComponent(props: { url: string | null }) {
  return (
    <div className="photo-component">
      <img src={props.url || NOT_FOUND}></img>
    </div>
  );
}
