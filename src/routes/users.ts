// src/routes/health.ts
import { Router } from 'express';
import { signupController, obtenerEmail, loginController, getUsers, getProfile, updateUser, getUserById } from '../controllers/users';
import { authMiddleware } from '../middlewares/authMiddleware';





const router = Router();
// Endpoint para obtener usuarios




router.post('/signup', signupController,)
router.get('/signup/login', obtenerEmail);
router.post('/login', loginController);
router.get('/profile', authMiddleware, getProfile);
router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.get("/user/:id", getUserById);





export default router;
