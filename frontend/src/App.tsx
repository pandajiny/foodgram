import React from "react";
import { AUTH_SERVICE_URL, FOODGRAM_SERVICE_URL } from "./constants";
import axios from "axios";
import { PageRouter } from "./Router";

console.log(AUTH_SERVICE_URL);
export const AuthService = axios.create({
  baseURL: AUTH_SERVICE_URL,
  withCredentials: true,
});

export const FoodgramService = axios.create({
  baseURL: FOODGRAM_SERVICE_URL,
  withCredentials: true,
});

export function App() {
  return (
    <div className="app">
      <PageRouter></PageRouter>
    </div>
  );
}
