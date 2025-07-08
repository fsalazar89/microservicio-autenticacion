import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class ValidaCamposAdministracion {
  constructor() {}

  // ------- Registro Usuario ------
  private registro_nombre = Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .max(200)
    .required()
    .messages({
      "string.pattern.base": "El campo nombre solo puede contener letras y espacios",
      "string.max": "El campo nombre no puede tener mas de 200 caracteres",
      "any.required": "El campo nombre es obligatorio",
      "string.empty": "El campo nombre es obligatorio",
    });

  private registro_usuario = Joi.string()
    .pattern(/^[A-Za-z0-9]+$/)
    .max(30)
    .required()
    .messages({
      "string.pattern.base": "El campo usuario solo puede contener letras y numeros",
      "string.max": "El campo usuario no puede tener mas de 30 caracteres",
      "any.required": "El campo usuario es obligatorio",
      "string.empty": "El campo usuario es obligatorio",
    });

  private registro_clave = Joi.string()
    .pattern(/^[A-Za-z0-9!@#$%^&*()_\-+=.,:;?¿¡!'"{}[\]<>~|\\/`¡¨°]+$/)
    .max(200)
    .required()
    .messages({
      "string.pattern.base": "El campo clave contiene caracteres no permitidos",
      "string.max": "El campo clave no puede tener mas de 200 caracteres",
      "any.required": "El campo clave es obligatorio",
      "string.empty": "El campo clave es obligatorio",
    });
  // ------- Fin Registro Usuario ------

  // ------- Autenticacion Usuario ------
  private autenticacion_usuario = Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .max(30)
    .required()
    .messages({
      "string.pattern.base": "El campo usuario solo puede contener letras",
      "string.max": "El campo usuario no puede tener más de 30 caracteres",
      "any.required": "El campo usuario es obligatorio",
      "string.empty": "El campo usuario es obligatorio",
    });

  private autenticacion_clave = Joi.string()
    .pattern(/^[A-Za-z0-9!@#$%^&*()_\-+=.,:;?¿¡!'"{}[\]<>~|\\/`¡¨°]+$/)
    .max(200)
    .required()
    .messages({
      "string.pattern.base": "El campo clave contiene caracteres no permitidos",
      "string.max": "El campo clave no puede tener más de 200 caracteres",
      "any.required": "El campo clave es obligatorio",
      "string.empty": "El campo clave es obligatorio",
    });
  // ------- Fin Autenticacion Usuario ------

  public validacionCamposRegistroUsuario = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      nombre: this.registro_nombre,
      usuario: this.registro_usuario,
      clave: this.registro_clave,
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errores = error.details.map((err) => ({
        mensaje: err.message,
        campo: err.context?.key,
        valor: err.context?.value,
      }));

      res.status(401).json({
        estado: false,
        mensaje: `Error en validación de datos`,
        datos: errores,
      });
      return;
    } else {
      next();
    }
  };

  public validacionCamposAutenticacion = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const schema = Joi.object({
      usuario: this.autenticacion_usuario,
      clave: this.autenticacion_clave,
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      const errores = error.details.map((err) => ({
        mensaje: err.message,
        campo: err.context?.key,
        valor: err.context?.value,
      }));

      res.status(401).json({
        estado: false,
        mensaje: `Error en validación de datos`,
        datos: errores,
      });
      return;
    } else {
      next();
    }
  };
}
