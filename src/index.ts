import 'reflect-metadata'; // Importa reflect-metadata para usar decoradores
import express from 'express'; // Importa express para crear el servidor
import healthRouter from './routes/health'; // Importa el router de health
import userRouter from './routes/users'; // Importa el router de users
import { AppDataSource } from './data-source'; // Importa la fuente de datos
import { errorHandler } from './middlewares/errorHandler'; // Importa el middleware de manejo de errores

const app = express(); // Crea una instancia de express
const PORT = process.env.PORT || 3000; // Define el puerto en el que correrá el servidor

// Middlewares
app.use(express.json()); // Middleware para parsear JSON
app.use(errorHandler); // Middleware para manejar errores

// Rutas
// app.use(healthRouter); // Acá le decimos a la app que use la ruta nueva creada en el archivo src/routes/health.ts
app.use(userRouter); // Usa el router de users

// Inicializa la fuente de datos y luego inicia el servidor
AppDataSource.initialize()
    .then(() => {
        console.log('Conectado a la base de datos'); // Mensaje de éxito en la conexión a la base de datos
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`); // Mensaje de éxito al iniciar el servidor
        });
    })
    .catch((error) => console.log(error)); // Manejo de errores en la inicialización de la fuente de datos
