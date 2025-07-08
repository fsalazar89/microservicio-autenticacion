const pool = require("../configs/db_conn/db.microservicio");

export class ModelAdministracion {
  constructor() {}

  modelRegistrarUsuario = async (datos: any) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `
      INSERT INTO autenticacion.tab_usuarios (nombre, usuario, clave)
      VALUES ($1, $2, $3)
      RETURNING nombre, usuario, fecha_creacion, estado`;
      const resultadoConsulta = await client.query(querySql, [
        datos.nombre,
        datos.usuario,
        datos.clave,
      ]);
      return { estado: true, datos: resultadoConsulta.rows[0] };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };

  modelValidarUsuario = async (usuario: string) => {
    let client;
    try {
      client = await pool.connect();
      let querySql = `SELECT usuario, clave, estado FROM autenticacion.tab_usuarios WHERE usuario = $1`;
      const resultadoConsulta = await client.query(querySql, [usuario]);
      return { estado: true, datos: resultadoConsulta.rows };
    } catch (error) {
      return { estado: false, datos: error };
    } finally {
      if (client) client.release();
    }
  };
}
