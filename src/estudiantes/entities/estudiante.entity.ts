
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('estudiante')
export class Estudiante {
    @PrimaryGeneratedColumn()
    idEstudiante: number;
    @Column({unique: true})
    apellidoNombres: string;
    @Column()
    fechaNacimiento: Date;

    constructor( apellidoNombres: string, fechaNacimiento: Date) {
        this.apellidoNombres = apellidoNombres;
        this.fechaNacimiento = fechaNacimiento;
    }
}
