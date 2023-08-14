import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";



@Entity('escuela')
export class Escuela {
    @PrimaryGeneratedColumn()
    idEscuela: number;
    @Column()
    nombre: string;
    @Column()
    direccion:string;
    @ManyToOne(type => Ciudad, ciudad => ciudad.escuela)
    @JoinColumn() 
    ciudad: Ciudad;
    @OneToMany(type =>Clase, clase => clase.escuela)
    @JoinColumn()
    clases : Clase[];
    constructor( nombre: string, direccion: string, ciudad: Ciudad) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.ciudad = ciudad;
    }
}
