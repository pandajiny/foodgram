import express from "express";
import cors from "cors";
import { getAutoCompletionHandler } from "./autocompletes/autocomplete.handler";
import {
  savePlaceController,
  getPlaceDetailHandler,
  getSavedPlaceHandler,
} from "./places/places.handler";
import {
  authUserHandler,
  loginHandler,
  signupHandler,
} from "./auth/auth.handler";
import { validJWT } from "./auth/auth.service";
import { httpError, HttpStatus } from "./http/http.service";
import { getPhotoHandler } from "./photo/photo.handler";

export const app = express();

app.use(cors());
app.use(express.json());

// REST APIs

app.get("/", (req, res) => {
  console.log(req.ip);
  res.send("Server is running and connected");
});

// body : SignupRequest
// result : null
app.post("/auth/signup", signupHandler);
// body : LoginRequest
// result : LoginResult
app.post("/auth/login", loginHandler);
// headers : token
// result : user
app.get("/auth/user", authUserHandler);

// app.use("/users", (req, res, next) => {
//   const token = req.headers.token;
//   if (typeof token != "string") {
//     throw httpError(res, HttpStatus.UNAUTHORIZED, `token is empty`);
//   }
//   validJWT(token);
//   next();
// });
app.get("/users");
app.get("/users/:userId");
app.post("/users");
// result : SavedPlace[]
app.get("/users/:userId/places", getSavedPlaceHandler);
// body : SavePlaceRequestBody
// result : ActionResult
app.post("/users/:userId/places/", savePlaceController);
// result : SavedPlace
app.get("/users/:userId/places/:placeId");
app.get("/places");
// result : PlaceResult
app.get("/places/:placeId", getPlaceDetailHandler);
// ?input=[장소이름]
// result : AutocompletePrediction[]
app.get("/autocomplete", getAutoCompletionHandler);
//  params : photoRef
// result : PhotoResult
app.get("/photos/:photoRef", getPhotoHandler);
