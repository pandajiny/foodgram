import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import EMAIL_ICON from "../images/icons/icon_email.png";
import LOCK_ICON from "../images/icons/icon_lock.png";
import PROFILE_ICON from "../images/icons/icon_profile.png";
import { PATH } from "../constants";
import { doSignup } from "../api";

export function SignupPage() {
  const history = useHistory();
  const [title, setTitle] = useState("회원가입");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    const request: SignupRequest = {
      name,
      email,
      _password: password,
    };

    doSignup(request);
  }

  return (
    <div className="login-page page">
      <div className="content">
        <h2>{title}</h2>
        <form>
          <img className="icon" src={PROFILE_ICON}></img>
          <input
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          ></input>

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
        <button onClick={handleSignup}>회원가입</button>
        <p className="signup-form">
          이미 계정이 있으신가요?
          <button
            onClick={() => {
              history.push(PATH.LOGIN);
            }}
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
}
