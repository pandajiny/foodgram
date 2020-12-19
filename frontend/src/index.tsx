import React from "react";
import ReactDOM from "react-dom";

import "./styles/style.scss";
import { App } from "./App";
import { ContextProvider } from "./ContextProvicer";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
