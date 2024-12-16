import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/Users'

export const signupController = async (req: Request, res: Response) => {

    try {
        const user = req.body;
        const userCreated = await createUser(user);
        res.status(201).json({
            success: true,
            data: userCreated
        });
    } catch (error) {
        console.error('Error en el controlador', error)
        res.status(500).json({message:'Error creando usuario', error:error})
    }


}

export const loginController = async (req: Request, res: Response) => {
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

