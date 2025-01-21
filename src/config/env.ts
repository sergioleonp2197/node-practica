import * as dotenv from 'dotenv';

dotenv.config();

// export const ENV = {
//     PORT: process.env.PORT || 3000,
//     DB_TYPE: process.env.DB_TYPE || 'postgres',
//     DB_HOST: process.env.DB_HOST || 'localhost',
//     DB_PORT: process.env.DB_PORT || 5432,
//     DB_USERNAME: process.env.DB_USERNAME || 'postgres',
//     DB_PASSWORD: process.env.DB_PASSWORD || '2197',
//     DB_DATABASE: process.env.DB_DATABASE || 'postgres',
//     DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE || false,
//     DB_LOGGING: process.env.DB_LOGGING || false,
//     DB_ENTITIES: process.env.DB_ENTITIES || [__dirname + '/entities/*.ts'],
//     DB_MIGRATIONS: process.env.DB_MIGRATIONS || [],
//     DB_SUBSCRIBERS: process.env.DB_SUBSCRIBERS || []
// }
export const ENV = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  };