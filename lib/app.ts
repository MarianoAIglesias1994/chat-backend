import express from "express";
import { Routes } from "./config/routes";
import { PassportCfg } from "./config/passport";
import * as swaggerDocument from "../swagger.json";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public passportCfg: PassportCfg = new PassportCfg();

  constructor() {
    dotenv.config({ path: __dirname + "/../.env" });
    this.app = express();
    this.config();
    this.passportCfg.config();
    this.routePrv.routes(this.app);
    this.app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }
}

export default new App().app;
