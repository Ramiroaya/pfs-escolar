import { Escuela } from "src/escuelas/entities/escuela.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ciudad')
export class Ciudad {
    @PrimaryGeneratedColumn()
    idCiudad: number;
    @Column({ unique: true })
    nombre: string;
    @Column({ unique: true })
    codPostal: string;
    @OneToMany( type => Escuela, escuela => escuela.ciudad)
    @JoinColumn()
    public escuela: Escuela[];

    constructor(nombre: string, codPostal: string) {
        this.nombre = nombre;
        this.codPostal = codPostal;
    }
}
