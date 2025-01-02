import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Endpoint para autenticar y generar un token
export const ruta = () =>{
    router.post('/login', (req: Request, res: Response): void => {
        const { username, password } = req.body;
    
        // Aquí validarías el usuario y contraseña contra una base de datos
        if (username === 'admin' && password === 'password') {
            const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '1h' }); // Generar token
            res.json({ token });
            return;
        }
    
        res.status(401).json({ error: 'Credenciales inválidas.' });
    });
    
}

export default router;
