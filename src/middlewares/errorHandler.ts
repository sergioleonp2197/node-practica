import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack); //registro del error en la consola

    const status = err.status || 500;//codigo de estado HTTP
    const message = err.message || 'Ocurrió un error en el servidor';//mensaje de error
    res.status(status).json({ message });//respuesta al cliente
};

