import { User } from './entities/User';
import { JwtPayload } from 'jsonwebtoken';

// Extender la interfaz Request para incluir `user`
declare global {
    namespace Express {
        interface Request {
            user?: User | JwtPayload;
        }
    }
}

