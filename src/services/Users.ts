import { AppDataSource } from '../data-source'; // Importa la configuración de TypeORM
import { User } from '../entities/User';

export const createUser = async () => {
    const userRepository = AppDataSource.getRepository(User); // Obtener el repositorio de User

    const newUser = new User();
    newUser.name = 'sergio leon';
    newUser.email = 'zerxion1@gmail.com ';
    newUser.password = '12345678'; // En una aplicación real, se debe cifrar la contraseña

    await userRepository.save(newUser);
    console.log('Usuario guardado:', newUser);
}

export const getUserByEmail = async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: email });
    console.log('Usuario encontrado:', user);
    return user; // Retornamos el usuario encontrado
}


export const getUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    console.log('Usuarios:', users);
}