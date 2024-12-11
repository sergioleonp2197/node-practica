import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};