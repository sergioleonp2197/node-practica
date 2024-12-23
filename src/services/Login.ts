import { Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const SECRET_KEY = 'mi_clave_secreta';

export const login = async (user: User) => {
    const { email, password } = user;

    try {

        //validacion inicial de los datos
        if (!email || !password) {
            throw new Error('Email y password son requeridos')

        }
        const userRepository = AppDataSource.getRepository(User);

        //buscar usuario por corrreo
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('Usuario no encotrado');

        }
        // Comparar la contraseña usando el método comparePassword de la entidad User

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {

            throw new Error('Password incorrecta');
        }

        //Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            SECRET_KEY,                        // Clave secreta
            { expiresIn: '1h' }                // Tiempo de expiración
        );
        //Enviar token
        return token;
    } catch (error) {
        console.error('Error en el proceso de login:');
        throw error;
    }

};
export default login;