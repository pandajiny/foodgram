import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api";
import { PATH } from "../constants";

export function LoginRequire() {
  const history = useHistory();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        history.push(PATH.MAIN);
      }
    });
  }, []);

  return (
    <div className="login-require page">
      <div className="content">
        <h1>로그인해 주세요!</h1>
        <h3>로그인하시면 더욱 원할하게 사용할 수 있습니다.</h3>

        <div className="login-buttons">
          <h3>로그인 하지 않고 사용하기</h3>
          <button onClick={() => history.push(PATH.MAIN)}>메인</button>

          <h3>이미 계정이 있으신가요?</h3>
          <button
            className="text-button"
            onClick={() => {
              history.push(PATH.LOGIN);
            }}
          >
            로그인
          </button>
          <h3>아직 없으시다면?</h3>
          <button
            onClick={() => {
              history.push(PATH.SIGNUP);
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
