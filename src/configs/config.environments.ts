import dotenv from 'dotenv';
const path = require('path');
const rutaProyecto = process.cwd();
let ambiente = path.join(rutaProyecto, '/environments/.env.local');
dotenv.config({ path: ambiente });
