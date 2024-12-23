import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/Users'
import login from '../services/Login';
import { User } from '../entities/User';





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
        res.status(500).json({ message: 'Error creando usuario', error: error })
    }


}


export const obtenerEmail = async (req: Request, res: Response) => {
    try {
        const user = req.body.email;
        const userEmail = await getUserByEmail(user);
        res.status(201).json({
            success: true,
            data: userEmail
        });
    } catch (error) {
        console.error('Error en el controlador error')
        res.status(500).json({ message: 'Error al encontrar usuario', error: error })
    }
}



export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validar que los campos estén presentes
        if (!email || !password) {
            res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
        }

        // Llamar al servicio de login
        const token = await login({ email, password } as User);

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};





