import 'reflect-metadata';
import express from 'express';
import healthRouter from './routes/health';
import { AppDataSource } from './data-source';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use(healthRouter); // Acá le decimos a la app que use la ruta nueva creada en el archivo src/routes/health.ts

// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en <http://localhost>:${PORT}`);
// });

AppDataSource.initialize()
    .then(() => {
        console.log('Conectado a la base de datos');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en <http://localhost>:${PORT}`);
        });
    })
    .catch((error) => console.log(error));
