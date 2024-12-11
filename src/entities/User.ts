// import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
// import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
// // import * as bcrypt from 'bcrypt';

// @Entity() // Decorador para identificar la clase como una entidad en la base de datos
// export class User {
//     @PrimaryGeneratedColumn() // Columna primaria auto-generada
//     id?: number;
//     @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
//     @Column() // Columna para el nombre

//     name?: string;

//     @Column({ unique: true }) // Columna para el correo electrónico con restricción única
//     @IsEmail({}, { message: 'El email no es válido' })
//     email?: string;

//     @Column() // Columna para la contraseña
//     @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
//     password!: string;

//     // @BeforeInsert()
//     // async hashPassword() {
//     //     if (this.password) {
//     //         this.password = await bcrypt.hash(this.password, 10); // Encripta la contraseña antes de guardarla
//     //     }
//     // }

// }


import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Column()
    name!: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'El email no es válido' })
    email!: string;

    @Column()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password!: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10); // Cifra la contraseña antes de insertarla
        }
    }

    // Método para verificar contraseñas
    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
}