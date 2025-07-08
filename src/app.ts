import './configs/config.environments';
import { Utils } from './utils/utils';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { json, urlencoded } from 'body-parser';

process.env.TZ = 'America/Bogota';

const app = express();
const port = process.env.APP_PORT;
let protocol = 'http';

app.set('trust proxy', 'loopback');

const allowedOrigins = [
  process.env.ORIGEN_HTTP
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: true }));

// Inyeccion de rutas de la API
import { RoutesConfig } from './routes/RoutesConfig';
new RoutesConfig(app).rutasMicroservicio();

try {
  app.listen(port, () => {
    const ambiente = protocol == 'http' ? 'localhost' : process.env.SERVIDOR ;
    console.log(`Servidor corriendo en ${protocol}://${ambiente}:${port}`);
    console.log('Fecha/Hora APP: ', new Utils().utilFechaActual());
  });
} catch (error) {
  console.error(error);
}
