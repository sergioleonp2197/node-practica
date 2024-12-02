// src/data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2197',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/entities/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});

// Inicializar la conexión
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => console.log(error));
