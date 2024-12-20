// src/routes/health.ts
import { Router } from 'express';
import { signupController, obtenerEmail, loginController } from '../controllers/users';


const router = Router();

router.post('/signup', signupController,)
router.get('/signup/login', obtenerEmail);
router.post('/login',loginController);

export default router;
