import express from "express";
import cors from "cors";
import { getPhotoHandler } from "./routers/photo/photo.handler";
import { UserRouter } from "./routers/user";
import session from "express-session";
import { CLIENT_URL, SessionOpts } from "./constants";
import { exceptionHandler } from "./modules/http";
import { AutocompletesRouter as AutocompleteRouter } from "./routers/autocompletes";
import { PlaceRouter } from "./routers/places";
import bodyParser from "body-parser";
import { authGuard } from "./guards";

export const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(session(SessionOpts));

app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use(authGuard);
app.use("/users", UserRouter);
app.use("/autocompletes", AutocompleteRouter);
app.use("/places", PlaceRouter);
//  params : photoRef
// result : PhotoResult
app.get("/photos/:photoRef", getPhotoHandler);
app.use(exceptionHandler);
app.use((req, res, next) => {
  console.log(`${req.path} has finished`);
  next();
});

// app.use("/users", (req, res, next) => {
//   const token = req.headers.token;
//   if (typeof token != "string") {
//     throw httpError(res, HttpStatus.UNAUTHORIZED, `token is empty`);
//   }
//   validJWT(token);
//   next();
// });
