import { app } from "./app";
import { API_PORT, CERT_PATH, KEY_PATH } from "./constants";
import fs from "fs";
import https from "https";

interface Certificates {
  key: Buffer;
  cert: Buffer;
}

async function bootstrap() {
  const credentials = getCredentials();

  app.listen(API_PORT, () => {
    console.log(`server is running at ${API_PORT}`);
  });

  if (credentials) {
    console.log(`running https server :${API_PORT}`);
    https.createServer(credentials, app).listen(API_PORT);
  } else {
    app.listen(API_PORT, () => {
      console.log(`running http server :${API_PORT}`);
    });
  }
}

const getCredentials = (): Certificates | undefined => {
  try {
    const key = fs.readFileSync(KEY_PATH);
    const cert = fs.readFileSync(CERT_PATH);
    return {
      key,
      cert,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

bootstrap();
