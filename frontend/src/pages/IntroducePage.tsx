import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api";
import { PATH } from "../constants";

export function IntroducePage() {
  const history = useHistory();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        history.push(PATH.MAIN);
      }
    });
  }, []);

  function goLogin() {
    history.push(PATH.LOGIN);
  }

  function goSignup() {
    history.push(PATH.SIGNUP);
  }

  return (
    <div className="page" id="page-introduce">
      <div className="content">
        <h1>로그인해 주세요!</h1>
        <h3>로그인하시면 더욱 원할하게 사용할 수 있습니다.</h3>

        <div className="links">
          <h3 onClick={goLogin}>로그인 하러가기</h3>
          <h3 onClick={goSignup}>새 계정</h3>
        </div>
      </div>
    </div>
  );
}
