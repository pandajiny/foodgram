import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.scss";
import { App } from "./App";
import { ProviderWrapper } from "./Provider";
import { handleGithubPages } from "./Router";

handleGithubPages(window.location);

ReactDOM.render(
  <ProviderWrapper>
    <App />
  </ProviderWrapper>,
  document.getElementById("root")
);
