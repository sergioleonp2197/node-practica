// src/data-source.ts
import { DataSource } from 'typeorm';
import { ENV } from './config/env';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    synchronize: false, // Sincroniza la base de datos automáticamente (solo para desarrollo)
    logging: false,
    entities: [__dirname + '/entities/*.ts'],
    migrations: [__dirname + '/migration/*.ts'],
    subscribers: [],
});

