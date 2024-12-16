// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entities/User'


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '2197',
    database: 'postgres',
    synchronize: true, // Sincroniza la base de datos automáticamente (solo para desarrollo)
    logging: false,
    entities: [User],
    // entities: [__dirname + '/entities/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
});

