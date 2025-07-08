import moment from "moment-timezone";
moment.tz.setDefault(process.env.ZONA_HORARIA);

export class Utils {
  private zonaHoraria() {
    if (process.env.ZONA_HORARIA) {
      moment.tz.setDefault(process.env.ZONA_HORARIA);
    }
  }

  utilFechaActual = (formato: string = "YYYY-MM-DD HH:mm:ss") => {
    try {
      this.zonaHoraria();
      return moment().format(formato);
    } catch (error) {
      return error;
    }
  };
}
