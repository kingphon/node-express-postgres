import * as express from "express";
import { Express } from "express";
import swaggerDocs from "./configs/swagger";
import routes from "./routes";

const init = () => {

  const app: Express = express();

  swaggerDocs(app)

  routes(app)

  app.listen(3000, () => {
    console.log("Server started on port 3000!");
  });
}

init()
