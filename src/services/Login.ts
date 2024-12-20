import { Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const SECRET_KEY = 'mi_clave_secreta';

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        //validacion inicial de los datos
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email y contraseña requeridos" });

        }
        const userRepository = AppDataSource.getRepository(User);

        //buscar usuario por corrreo
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Usuario no encontrado' });

        }
        // Comparar la contraseña usando el método comparePassword de la entidad User

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });

        }

        //Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            SECRET_KEY,                        // Clave secreta
            { expiresIn: '1h' }                // Tiempo de expiración
        );
        //Enviar respuesta exitosa
        return res.status(200).json({
            success: true,
            message: 'Inicio de sesion exitoso',
            token,
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (error) {
        console.error('Error en el proceso de login:', error);
        return res.status(500).json({
            success: false,
            message: 'Error en el servidor, por favor intente nuevamente más tarde',
        })
    }

};
export  default login;