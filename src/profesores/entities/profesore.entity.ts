import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesor')
export class Profesore {
    @PrimaryGeneratedColumn()
    idProfesor: number;
    @Column()
    apellidoNombres: string;
    @OneToMany(type =>Clase, clase => clase.profesor)
    @JoinColumn()
    public clase: Clase[];
    constructor( apellidoNombres: string){
        this.apellidoNombres= apellidoNombres;
    }
}
