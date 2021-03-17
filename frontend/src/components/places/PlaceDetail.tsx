import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPlaceDetail, getSavedPlace, getUser } from "../../api";
import { getPhoto } from "../../api/photo";
import SavedIcon from "../../images/icons/icon_saved_white.png";
import SaveIcon from "../../images/icons/icon_save.png";
import { SavePlaceModal } from "../../modals/SavePlaceModal";
import { PhotoComponent } from "../../modules/google-photo-api";
import { PlaceInformation } from "./PlaceInformation";
import CLOSE_ICON from "../../images/icons/icon_cancel_white.png";
import { RootState } from "../../modules/store";
import { PlaceReview } from "./PlaceReview";
import { useSelector } from "react-redux";

interface PlaceDetailProps {
  onPlaceSelected: (place: Place) => void;
  onClosed: () => void;
}
export function PlaceDetail({ onClosed, onPlaceSelected }: PlaceDetailProps) {
  const history = useHistory();
  const user = useSelector((state: RootState) => {
    state.userReducer.user;
  });
  const { placeId } = useParams<Record<string, string | undefined>>();
  const [place, setPlace] = useState<Place>();
  const [myPlace, setMyPlace] = useState<UserPlace>();

  // get place detail
  useEffect(() => {
    if (placeId) {
      getPlaceDetail({ placeId }).then((p) => {
        setPlace(p);
        checkIsSaved(p);
      });
    }
  }, [placeId]);

  async function checkIsSaved(place?: google.maps.places.PlaceResult) {
    // console.log(`place`);
    // const user = await getUser();
    // if (user?.userId && place?.place_id) {
    //   getSavedPlace(user.userId, place.place_id)
    //     .then((place) => {
    //       console.log(`this place is saved`);
    //       setSavedPlace(place);
    //     })
    //     .catch(() => {
    //       console.log(`not saved`);
    //       props.onPlaceSelected(place);
    //     });
    // }
  }

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  // useEffect(() => {
  //   const photo = place?.photos && place?.photos[0];
  //   if (photo) {
  //     const photoRef = photo.photo_reference;
  //     getPhoto(photoRef).then((result) => {
  //       setPhotoUrl(result.url);
  //     });
  //   } else {
  //     setPhotoUrl(null);
  //   }
  // }, [place]);

  const [isSaving, setIsSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  if (place) {
    return (
      <div className="place-detail">
        <SavePlaceModal
          place={place}
          isActive={isSaving}
          onCancel={() => {
            setIsSaving(false);
          }}
          myPlace={myPlace}
          isEdit={isEdit || undefined}
        />
        <img
          className="close-icon"
          src={CLOSE_ICON}
          onClick={function () {
            onClosed();
          }}
        />
        <PhotoComponent url={photoUrl} />
        <div className="summary">
          <h3 className="description">{place.name}</h3>
          <p className="address">
            {place.address || "등록된 주소가 없습니다."}
          </p>
          <div className="save-button" onClick={() => setIsSaving(true)}>
            <img className="icon" src={myPlace ? SavedIcon : SaveIcon}></img>
            <label>{myPlace ? "저장됨" : "저장하기"}</label>
          </div>
        </div>
        <div className="details">
          {place.address && (
            <PlaceInformation type="LOCATION" content={place.address} />
          )}
          {place.phone_number && (
            <PlaceInformation type="PHONE" content={place.phone_number} />
          )}
          {/* {place.opening_hours && (
            <PlaceInformation
              type="HOURS"
              important={
                (place.opening_hours.open_now && "현재 영업 중") || undefined
              }
              content={
                getDateStringFromPeriods(place.opening_hours) || "영업 시간"
              }
            />
          )} */}
          {/* {place.website && (
            <PlaceInformation type="WEBSITE" content={place.website} />
          )} */}
          {myPlace && (
            <div className="review">
              <p>저장된 리뷰</p>
              <PlaceReview
                place={myPlace}
                onEditCallback={function () {
                  setIsSaving(true);
                  setIsEdit(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function getDateStringFromPeriods(periods: google.maps.places.OpeningHours) {
  const weekday = new Date().getDay();
  let dayString: string;
  switch (weekday) {
    case 0:
      dayString = "일요일";
      break;
    case 1:
      dayString = "월요일";
      break;

    case 2:
      dayString = "화요일";
      break;

    case 3:
      dayString = "수요일";
      break;

    case 4:
      dayString = "목요일";
      break;

    case 5:
      dayString = "금요일";
      break;
    case 6:
      dayString = "토요일";
      break;
    default:
      dayString = "";
  }
  console.log(`peri`);
  console.log(weekday);
  console.log(periods);
  if (!periods.periods[weekday]) {
    return "영업 시간 정보가 없습니다.";
  }
  console.log(periods.periods[weekday]);
  const openHour = `${periods.periods[weekday].open.time}`;
  const closeHour = `${periods.periods[weekday].close?.time}`;

  return `${dayString} ${openHour.slice(0, 2)}:${openHour.slice(
    2,
    4
  )} ~ ${closeHour.slice(0, 2)}:${closeHour.slice(2, 4)}`;
}
/*
{address_components: Array(7), adr_address: "<span class="country-name">대한민국</span> <span class…9</span> <span class="postal-code">110-130</span>", business_status: "OPERATIONAL", formatted_address: "대한민국 서울특별시 종로구 종로1.2.3.4가동 종로 19", formatted_phone_number: "02-730-6198", …}
address_components: Array(7)
0: {long_name: "１９", short_name: "１９", types: Array(1)}
1: {long_name: "종로", short_name: "종로", types: Array(3)}
2: {long_name: "종로1.2.3.4가동", short_name: "종로1.2.3.4가동", types: Array(3)}
3: {long_name: "종로구", short_name: "종로구", types: Array(3)}
4: {long_name: "서울특별시", short_name: "서울특별시", types: Array(2)}
5: {long_name: "대한민국", short_name: "KR", types: Array(2)}
6: {long_name: "110-130", short_name: "110-130", types: Array(1)}
length: 7
__proto__: Array(0)
adr_address: "<span class="country-name">대한민국</span> <span class="region">서울특별시</span> <span class="locality">종로구</span> <span class="street-address">종로1.2.3.4가동 종로 19</span> <span class="postal-code">110-130</span>"
business_status: "OPERATIONAL"
formatted_address: "대한민국 서울특별시 종로구 종로1.2.3.4가동 종로 19"
formatted_phone_number: "02-730-6198"
geometry:
location: {lat: 37.5705694, lng: 126.9799416}
viewport: {northeast: {…}, southwest: {…}}
__proto__: Object
icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png"
international_phone_number: "+82 2-730-6198"
name: "광화문 미진"
opening_hours:
open_now: true
periods: Array(7)
0: {close: {…}, open: {…}}
1: {close: {…}, open: {…}}
2: {close: {…}, open: {…}}
3: {close: {…}, open: {…}}
4: {close: {…}, open: {…}}
5: {close: {…}, open: {…}}
6: {close: {…}, open: {…}}
length: 7
__proto__: Array(0)
weekday_text: (7) ["월요일: 오전 10:00 ~ 오후 10:00", "화요일: 오전 10:00 ~ 오후 10:00", "수요일: 오전 10:00 ~ 오후 10:00", "목요일: 오전 10:00 ~ 오후 10:00", "금요일: 오전 10:00 ~ 오후 10:00", "토요일: 오전 10:00 ~ 오후 10:00", "일요일: 오전 10:00 ~ 오후 10:00"]
__proto__: Object
photos: Array(10)
0: {height: 3120, html_attributions: Array(1), photo_reference: "ATtYBwKj7qTZzGyJBIHq7AediaIZkSR_a4relxSF3bO0UZJga_…2hSMD_61Yh2RzzZP_K25xfGiu9STMYs_CPPXs4SmWF2tbsoAQ", width: 4160}
1: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwJLD8yefFianFU9zFlKiCP2ChT9zT_RrJJNLNtMOC2HhH…GMcMqgYCI_fwEcJxriGxbsm5OqQeGhhgtZYlnVpM1P0Q2TMOJ", width: 3024}
2: {height: 2966, html_attributions: Array(1), photo_reference: "ATtYBwKImb9R3jXK7XNP_3Vdw5BTwH68dMGbJ9fykHq9GQe37v…Matx0dsLOWraFQcRAcf6IybtmJ3Kfp0CTRED4I7lSDU6H6b-X", width: 3955}
3: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwKQtk3PLG5dxNPTi9IjRhL4hbQYlN5T3J5kb10ggTWUi4…h1ruI716Ta4qPQ3hZq66Fx15rxvEaReS2qY6524UpiR4mluQ6", width: 4032}
4: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwJaCniML1Tv8xvWADWrOHb_KeDMijRL3lK9TbIz1O35_k…8wi4a2P1D019saTGfY_LZrUPm4bxJbp-VeSzze10-jsaBtM9d", width: 4032}
5: {height: 4032, html_attributions: Array(1), photo_reference: "ATtYBwKhuoWLHkUwke1JoE00-xdOSIe-CBstyw4AcLdRg1aEbv…w6xcxJlAs4bAqTwx5MIKfb3aM6A7hBgvZ_YtFYpPEOsOJ-5cK", width: 3024}
6: {height: 1836, html_attributions: Array(1), photo_reference: "ATtYBwLUqiAj8hsxHVYmH4FF-oDK7zRZ-m68T8V9jMZL1Kncr7…t5DB4oxoCXaBlHiXyM9w00bzt2vt9O5EU8zfWXdJ5g8ZQ4M1o", width: 3264}
7: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwKAQ0rVJsjf08pRSj7XAYxrJCmVGiwm1Q3yb4-rQ8oq-T…clZ4t_zllyqPQ5Iu00JEKKEzc-FIcd2qT5Kl53mkYfFY9rqkO", width: 4032}
8: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwKFDcfRdwuBD6x6VJMuSXFHURi_Q96F4I_TFyiytGAhtK…3b-DDLvV2hMxG4Ur24UW6q7hJlGjGUjOQpKTEO6qJ6etZfV5t", width: 4032}
9: {height: 3024, html_attributions: Array(1), photo_reference: "ATtYBwIcwt7LsTN_CGBevTHCHPiHCbc7A2DMLJJHkDFmYUo5nl…KQ7lXm_U47Ur_3XvR1KIDiIcLfFr0YQCIzu1kUP49mWUyvQVs", width: 4032}
length: 10
__proto__: Array(0)
place_id: "ChIJUdO28-uifDURutXAwIaJQjw"
plus_code:
compound_code: "HXCH+6X 대한민국 서울특별시"
global_code: "8Q98HXCH+6X"
__proto__: Object
price_level: 2
rating: 4
reference: "ChIJUdO28-uifDURutXAwIaJQjw"
reviews: Array(5)
0: {author_name: "이용민", author_url: "https://www.google.com/maps/contrib/103803367236762022567/reviews", language: "ko", profile_photo_url: "https://lh5.googleusercontent.com/-UQU-qzCv9n4/AAA…8XbwqhRBD7_4g/s128-c0x00000000-cc-rp-mo/photo.jpg", rating: 5, …}
1: {author_name: "아저씨", author_url: "https://www.google.com/maps/contrib/111621087385298430202/reviews", language: "ko", profile_photo_url: "https://lh4.googleusercontent.com/-F6H1vv90OeE/AAA…1ZyZ6wfJQ/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg", rating: 4, …}
2: {author_name: "heehee Lee", author_url: "https://www.google.com/maps/contrib/117218143369219172218/reviews", language: "ko", profile_photo_url: "https://lh5.googleusercontent.com/-3rSo1XHnyM0/AAA…rr5fB59pA/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg", rating: 4, …}
3: {author_name: "lime kang", author_url: "https://www.google.com/maps/contrib/113021753206833939287/reviews", language: "ko", profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14Gh9GUwR2…h7JspftGA78Scq3XaSA=s128-c0x00000000-cc-rp-mo-ba2", rating: 4, …}
4: {author_name: "S Cho", author_url: "https://www.google.com/maps/contrib/111873480708433298546/reviews", language: "ko", profile_photo_url: "https://lh3.googleusercontent.com/a-/AOh14GiOcRBsC…SRWNd5JrEA88cchsNZw=s128-c0x00000000-cc-rp-mo-ba4", rating: 5, …}
length: 5
__proto__: Array(0)
types: Array(4)
0: "restaurant"
1: "food"
2: "point_of_interest"
3: "establishment"
length: 4
__proto__: Array(0)
url: "https://maps.google.com/?cid=4342184202591065530"
user_ratings_total: 2119
utc_offset: 540
vicinity: "종로구 종로 19"
website: "https://mijin1954.modoo.at/"
*/
