import { AppDataSource } from '../data-source'; // Asegúrate de importar correctamente tu fuente de datos
import { User } from '../entities/User'; // Importa la entidad `User`
import { validate } from 'class-validator'; // Para validar las entidades

// Obtener el repositorio de la entidad `User`
const getUserRepository = () => AppDataSource.getRepository(User);

class ValidationError extends Error {
    constructor(message: string, public details?: object) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const createUser = async (user: User) => {
    const userRepository = getUserRepository();
   
    try {
        // Crear una nueva instancia de usuario
        const newUser = new User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = user.password;
    
        // Validar los datos del usuario
        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new ValidationError('Datos del usuario no son válidos', errors);
        }

        // Guardar el usuario en la base de datos
        const userCreated = await userRepository.save(newUser);
        console.log('Usuario guardado:', userCreated);
        return userCreated;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

// Obtener todos los usuarios
export const getUsers = async () => {
    try {
        const userRepository = getUserRepository();

        // Obtener todos los usuarios de la base de datos
        const users = await userRepository.find();
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Obtener un usuario por correo electrónico
export const getUserByEmail = async (email: string) => {
    try {
        const userRepository = getUserRepository();

        // Buscar el usuario por correo electrónico
        const user = await userRepository.findOneBy({ email });
        return user || null; // Retornar null si no se encuentra
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
};
