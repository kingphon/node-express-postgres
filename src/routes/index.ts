import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Express } from "express";
import helmet from "helmet";
import DB from "../configs/db";
import initDB from "../configs/init";
import staff from "./staff";

const routes = (app: Express) => {
  dotenv.config();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  DB.setAppDataSource(process.env);
  const dataSource = DB.getAppDataSource();

  dataSource
    .initialize()
    .then(async () => {
      initDB();
    })
    .catch((error) => console.log(error));

  staff(app);
};

export default routes;
