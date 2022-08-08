import { AppDataSource } from "./configs/db"
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import initDB from "./configs/init";

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
    });

}).catch(error => console.log(error))
