import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import EMAIL_ICON from "../images/icons/icon_email.png";
import LOCK_ICON from "../images/icons/icon_lock.png";
import { doLogin, getUser } from "../api";
import { DEFAULT_PATH, SIGNUP_PATH } from "../constants";

export function LoginPage() {
  const history = useHistory();
  const [title, setTitle] = useState("이메일 계정으로 로그인");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goMain() {
    history.push(DEFAULT_PATH);
  }

  function handleLogin() {
    const request: LoginRequest = { email, password };
    doLogin(request)
      .then(goMain)
      .catch((err) => setTitle(err));
  }

  return (
    <div className="login-page page">
      <div className="content">
        <h2>{title}</h2>
        <form>
          <img className="icon" src={EMAIL_ICON}></img>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          ></input>
          <img className="icon" src={LOCK_ICON}></img>
          <input
            type="password"
            placeholder="pasword here"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
            }}
          ></input>
        </form>
        <button onClick={handleLogin}>로그인</button>
        <p className="signup-form">
          계정이 없으신가요?{" "}
          <button
            onClick={() => {
              history.push(SIGNUP_PATH);
            }}
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
}
