import React, { useEffect, useRef, useState } from "react";
import { getPhoto } from "../../api/photo";
import SaveIcon from "../../images/icons/icon_save.png";
import { SavePlaceModal } from "../../modals/SavePlaceModal";
import { PhotoComponent } from "../../modules/google-photo-api";

interface PlaceDetailProps {
  place: google.maps.places.PlaceResult;
}

export function PlaceDetail(props: PlaceDetailProps) {
  const { place } = props;

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  useEffect(() => {
    const photo = place?.photos && place?.photos[0];
    if (photo) {
      const photoRef = photo.photo_reference;
      getPhoto(photoRef).then((result) => {
        setPhotoUrl(result.url);
      });
    } else {
      setPhotoUrl(null);
    }
  }, [place]);

  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className="place-detail">
      <SavePlaceModal
        place={place}
        isActive={isSaving}
        onCancel={() => {
          setIsSaving(false);
        }}
      />
      <PhotoComponent url={photoUrl} />
      <div className="summary">
        <h3 className="description">{place.name}</h3>
        <p className="address">
          {place.formatted_address || "등록된 주소가 없습니다."}
        </p>
        <div className="save-button" onClick={() => setIsSaving(true)}>
          <img className="icon" src={SaveIcon}></img>
          <label>저장하기</label>
        </div>
      </div>
    </div>
  );
}
