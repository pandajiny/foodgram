import React from "react";
import { useHistory } from "react-router-dom";
import { PATH } from "../../constants";
import ICON_PROFILE from "../../images/icons/icon_profile_white.png";

export function UserState(props: { user?: User | null; doLogout: () => void }) {
  const { user } = props;
  const history = useHistory();
  if (user == undefined) {
    <div className="user-state"></div>;
  }
  return (
    <div className="user-state">
      <h2>안녕하세요!</h2>
      {user ? (
        <>
          <h3>{user.name}님, 반갑습니다.</h3>
          <div className="account-container">
            <img className="icon" src={ICON_PROFILE}></img>
            <label>{user.email}</label>
            <button onClick={props.doLogout}>LOGOUT</button>
          </div>
        </>
      ) : (
        <>
          <h3>아직 로그인 되어있지 않습니다.</h3>
          <button
            onClick={() => {
              history.push(PATH.LOGIN);
            }}
          >
            로그인
          </button>
        </>
      )}
    </div>
  );
}
