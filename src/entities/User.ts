import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Decorador para identificar la clase como una entidad en la base de datos
export class User {
    @PrimaryGeneratedColumn() // Columna primaria auto-generada
    id?: number;

    @Column() // Columna para el nombre
    name?: string;

    @Column({ unique: true }) // Columna para el correo electrónico con restricción única
    email?: string;

    @Column() // Columna para la contraseña
    password?: string;

}
