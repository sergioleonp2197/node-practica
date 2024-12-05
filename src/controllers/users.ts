import { Request, Response } from 'express';
import { createUser } from '../services/Users'

export const signupController = async (req: Request, res: Response) =>  {
    const user = req.body;
    const userCreated =  await createUser(user);
    res.status(201).json({
        success: true,
        data: userCreated
    });
}


