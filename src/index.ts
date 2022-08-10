import { AppDataSource } from "./configs/db"
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import routes from "./routes";
import initDB from "./configs/init";
import * as swaggerJSDoc  from 'swagger-jsdoc';
import swaggerDocs from "./configs/swagger";

AppDataSource.initialize().then(async () => {
  const app = express();

  // middleware
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  initDB()

  // routes
  app.use("/", routes);

  app.listen(3000, () => {
    console.log("Server started on port 3000!");
    
    swaggerDocs(app)
  });

}).catch(error => console.log(error))
