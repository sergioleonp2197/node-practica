import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola mundo!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en <http://localhost>:${PORT}`);
});
