import { Request, Response } from 'express';
import { getUserByEmail } from '../services/Users';

export const getUserByEmailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.params; // Obtenemos el correo de los parámetros de la URL
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error en el controlador:', error);
        return res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};
