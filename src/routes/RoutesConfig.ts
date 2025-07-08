import { Application } from "express";
import {InitRoute} from "./route.init";
import {AdministracionRoute} from "./route.administracion";

export class RoutesConfig {
  private app: Application;
  private version = process.env.APP_VERSION || "";

  constructor(app: Application) {
    this.app = app;
  }
  public rutasMicroservicio = async () => {
    const initRoute = new InitRoute();
    this.app.use(this.version, initRoute.router);
    const administracionRoute = new AdministracionRoute();
    this.app.use(this.version, administracionRoute.router);
  }
}
