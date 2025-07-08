// src/routes/InitRoute.ts
import { Router, Request, Response } from "express";

export class InitRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializarRutas();
  }

  private initializarRutas() {
    this.router.get(
      "/",
      (req: Request, res: Response) => {
        res.status(200).json({
          estado: true,
          mensaje: process.env.NOMBRE_PROYECTO,
          datos: null,
        });
      }
    );
  }
}
