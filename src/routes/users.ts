// src/routes/health.ts
import { Router } from 'express';
import { signupController } from '../controllers/users';

const router = Router();

router.post('/signup', signupController);

export default router;
