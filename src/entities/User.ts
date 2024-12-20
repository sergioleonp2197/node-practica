import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';

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
    async passwordHash() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10); // Cifra la contraseña antes de insertarla
        }
    }

    // Método para verificar contraseñas
    //se reutiliza en el login user.comparePassword
    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
}