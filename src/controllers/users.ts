import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/Users'
import { login } from '../services/Login';
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


};


export const obtenerEmail = async (req: Request, res: Response) => {

      try {
        const { email } = req.body;
    
        // Validación: Verificar que el campo email no esté vacío
        if (!email) {
          throw new Error('El campo email es obligatorio.');
        }
    
        // Validación: Verificar que el email tenga un formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('El formato del correo electrónico es inválido.');
        }
    
        // Buscar el usuario en la base de datos
        const userEmail = await getUserByEmail(email);
    
        // Si el usuario no existe, lanzar un NotFoundError
        if (!userEmail) {
          throw new Error('Usuario no encontrado con el correo proporcionado.');
        }
    
        // Si todo está bien, devolver la respuesta exitosa
        res.status(200).json({
          success: true,
          data: userEmail,
        });
      } catch (error:any) {
        res.status(401).json({ error: error.message });
      }
};



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





