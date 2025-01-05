// src/routes/health.ts
import { Router } from 'express';
import { signupController, obtenerEmail, loginController } from '../controllers/users';
import { authMiddleware } from '../middlewares/authMiddleware';
import { JwtPayload } from 'jsonwebtoken';





const router = Router();

router.post('/signup', signupController,)
router.get('/signup/login', obtenerEmail);
router.post('/login', loginController);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Bienvenido al perfil protegido',
        user: req.user
    });
});






export default router;
