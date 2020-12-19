import React from "react";
import { useHistory } from "react-router-dom";
import { PATH } from "../constants";

export function LoginRequire() {
  const history = useHistory();

  return (
    <div className="login-require page">
      <div className="content">
        <h1>로그인해 주세요!</h1>
        <h3>원할한 서비스 사용을 위해서 로그인이 필요합니다.</h3>

        <div className="login-buttons">
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
          <button>회원가입</button>
        </div>
      </div>
    </div>
  );
}
