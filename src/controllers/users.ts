import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../services/Users'
import { login } from '../services/Login';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import { JwtPayload } from 'jsonwebtoken';






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
  } catch (error: any) {
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


export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find(); // Obtener todos los usuarios
    res.json(users.map((user) => ({ id: user.id, name: user.name, email: user.email })));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}


export const getProfile = async (req: Request, res: Response) => {
  const user = req.user;
  const { id, email } = user as JwtPayload;

  res.json({
    message: 'Bienvenido al perfil protegido',
    user: {
      id: id,
      email: email,
    }
  });
}




export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID del usuario de los parámetros de la URL
  const { name, email } = req.body; // Obtenemos los datos a actualizar del cuerpo de la solicitud

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Buscar el usuario por ID
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    // Actualizar los campos del usuario
    if (name) user.name = name;
    if (email) user.email = email;

    // Guardar los cambios en la base de datos
    await userRepository.save(user);

    res.json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};



export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: "ID invalido" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;

    }
    //Retornar solo los campos deaseados
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
}