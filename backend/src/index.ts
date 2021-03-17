import { app } from "./app";
import { API_PORT } from "./constants";

app.listen(API_PORT, () => {
  console.log(`server is running at ${API_PORT}`);
});
