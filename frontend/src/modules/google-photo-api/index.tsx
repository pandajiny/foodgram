import React, { useEffect } from "react";

export function Photo(props: { key: string; photoRef: string }) {
  useEffect(() => {
    getPhoto(props.photoRef);
  }, []);

  async function getPhoto(uri: string) {
    const key = props.key;
    const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${key}`;
    const photo = await fetch(uri);
    console.log(photo);
  }
  return <div>photo</div>;
}
