import { AppDataSource } from '../data-source'; // Importa la configuración de TypeORM
import { User } from '../entities/User';

export const createUser = async (user: User) => {
    const userRepository = AppDataSource.getRepository(User); // Obtener el repositorio de User

    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password; // En una aplicación real, se debe cifrar la contraseña

    const userCreated = await userRepository.save(newUser);
    console.log('Usuario guardado:', newUser);
    return userCreated;
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