// src/routes/InitRoute.ts
import { Router } from "express";
import { ValidaCamposAdministracion } from "../middlewares/campos.administracion";
import { ControllerAdministracion } from "../controllers/controller.administracion";

export class AdministracionRoute {
  public router: Router;
  private validaCamposAdministracion: ValidaCamposAdministracion;
  private controllerAdministracion: ControllerAdministracion;

  constructor() {
    this.router = Router();
    this.validaCamposAdministracion = new ValidaCamposAdministracion();
    this.controllerAdministracion = new ControllerAdministracion();
    this.initializarRutas();
  }

  private initializarRutas() {
    this.router.post(
      "/admin/registrar_usuario",
      this.validaCamposAdministracion.validacionCamposRegistroUsuario,
      this.controllerAdministracion.controllerRegistrarUsuario.bind(
        this.controllerAdministracion
      )
    );

    this.router.post(
      "/admin/autenticacion",
      this.validaCamposAdministracion.validacionCamposAutenticacion,
      this.controllerAdministracion.controllerAutenticacion.bind(
        this.controllerAdministracion
      )
    );
  }
}
