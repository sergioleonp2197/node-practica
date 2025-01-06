// src/routes/health.ts
import { Router } from 'express';
import { signupController, obtenerEmail, loginController } from '../controllers/users';
import { authMiddleware } from '../middlewares/authMiddleware';
import { JwtPayload } from 'jsonwebtoken';





const router = Router();

router.post('/signup', signupController,)
router.get('/signup/login', obtenerEmail);
router.post('/login', loginController);

router.get('/profile', authMiddleware, async (req, res) => {
    const user =  req.user;
    const { id, email } =  user as JwtPayload;
    
    res.json({
        message: 'Bienvenido al perfil protegido',
        user: {
            id: id,
            email: email,
        }
    });
});






export default router;
