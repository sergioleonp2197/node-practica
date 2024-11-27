// src/routes/health.ts
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
    });
});

export default router;
