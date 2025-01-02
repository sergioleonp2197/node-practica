import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User';

// Clave secreta para firmar y verificar el token
const SECRET_KEY = 'mi_clave_secreta';



// Middleware de autenticación
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    // Verificar si el encabezado `Authorization` está presente
    if (!authHeader) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return;
    }

    try {
        // Obtener el token del encabezado
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Formato de token no válido' });
            return;
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded as User | JwtPayload; // Asignar información del usuario al objeto `req`
        next(); // Continuar al siguiente middleware o controlador

    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(401).json({ message: 'Token no válido o expirado' });
    }
};