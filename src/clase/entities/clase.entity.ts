import { Escuela } from "src/escuelas/entities/escuela.entity";
import { Profesore } from "src/profesores/entities/profesore.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clase')
export class Clase {
    @PrimaryGeneratedColumn()
    idClase: number;
    @Column()
    nombre: string;
    @ManyToOne(type => Escuela, escuela => escuela.clase)
    @JoinColumn()
    public escuela: Escuela[];
    @ManyToOne(type => Profesore, profesore => profesore.clase)
    @JoinColumn()
    public profesor: Profesore[]
    constructor(idClase: number, nombre: string) {
        this.idClase = idClase;
        this.nombre = nombre;
    }
}
