import React from "react";
import PHONE_ICON from "../../images/icons/icon_phone.png";
import CLOCK_ICON from "../../images/icons/icon_clock.png";
import LOCATION_ICON from "../../images/icons/icon_location.png";
import WEB_ICON from "../../images/icons/icon_web.png";

type InformationType = "PHONE" | "HOURS" | "LOCATION" | "WEBSITE";

export function PlaceInformation(props: {
  type: InformationType;
  important?: string;
  content: string;
}) {
  const { content, important } = props;
  let src;
  switch (props.type) {
    case "PHONE":
      src = PHONE_ICON;
      break;
    case "HOURS":
      src = CLOCK_ICON;
      break;
    case "LOCATION":
      src = LOCATION_ICON;
      break;
    case "WEBSITE":
      src = WEB_ICON;
      break;
  }
  return (
    <div className="place-information">
      <img className="icon" src={src} />
      <h3>{important}</h3>
      <label>{content}</label>
    </div>
  );
}
