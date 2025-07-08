import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ModelAdministracion } from "../models/model.administracion";

export class ControllerAdministracion {
  private algorithm: any = process.env.ALGORITMO;
  private key: any = Buffer.from(process.env.KEY_ENCRIPT || "", "utf8");
  private iv: any = Buffer.from(process.env.IV_ENCRIPT || "", "utf8");
  private modelAdministracion: ModelAdministracion;

  constructor() {
    this.modelAdministracion = new ModelAdministracion();
  }

  private _generarTokenJWT = (key: string) => {
    try {
      const payloadJWT = { key };
      const secreto: string = `${process.env.SECRET_TOKEN_JWT}` || "";
      const tokenJwt = jwt.sign(payloadJWT, secreto);

      return tokenJwt;
    } catch (error) {
      console.log(error);
    }
  };

  private _encriptarDato = (dato: any) => {
    try {
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(dato, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    } catch (error) {
      return error;
    }
  };

  private _desencriptarDato = (dato: any) => {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv
      );
      let decrypted = decipher.update(dato, "hex", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    } catch (error) {
      return error;
    }
  };

  controllerRegistrarUsuario = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      req.body.clave = this._encriptarDato(req.body.clave);
      const datosUsuario: any =
        await this.modelAdministracion.modelRegistrarUsuario(req.body);
      if (datosUsuario.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo consultando el usuario";
        respuesta.datos = datosUsuario.datos;
        res.status(401).json(respuesta);
        return;
      } else {
        datosUsuario.datos.clave = "********";
        respuesta.estado = true;
        respuesta.mensaje = "Usuario credo exitosamente";
        respuesta.datos = datosUsuario.datos;
        res.status(200).json(respuesta);
        return;
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };

  controllerAutenticacion = async (req: Request, res: Response) => {
    let respuesta: any = { estado: false, mensaje: null, datos: null };
    try {
      const infoUsuario: any =
        await this.modelAdministracion.modelValidarUsuario(req.body.usuario);
      if (infoUsuario.estado == false) {
        respuesta.estado = false;
        respuesta.mensaje = "Fallo consultando el usuario";
        respuesta.datos = null;
        res.status(401).json(respuesta);
        return;
      } else if (infoUsuario.datos.length == 0) {
        respuesta.estado = false;
        respuesta.mensaje = "El usuario no existe";
        respuesta.datos = null;
        res.status(401).json(respuesta);
        return;
      } else if (infoUsuario.datos[0].estado != true) {
        respuesta.estado = false;
        respuesta.mensaje = "El usuario esta inactivo";
        respuesta.datos = null;
        res.status(401).json(respuesta);
        return;
      } else {
        const claveDecifrada = this._desencriptarDato(infoUsuario.datos[0].clave);
        if (claveDecifrada !== req.body.clave) {
          respuesta.estado = false;
          respuesta.mensaje = "Credenciales incorrectas";
          respuesta.datos = null;
          res.status(401).json(respuesta);
          return;
        } else {
          infoUsuario.datos[0].token = this._generarTokenJWT(infoUsuario.datos[0].usuario);
          infoUsuario.datos[0].clave = '********'
          respuesta.estado = true;
          respuesta.mensaje = "inicio de sesion exitoso";
          respuesta.datos = infoUsuario.datos[0];
          res.status(200).json(respuesta);
          return;
        }
      }
    } catch (error) {
      respuesta.estado = false;
      respuesta.mensaje = "Error inesperado";
      respuesta.datos = error;
      res.status(400).json(respuesta);
      return;
    }
  };

}
