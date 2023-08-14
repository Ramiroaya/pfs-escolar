import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Profesore } from './entities/profesore.entity';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesore)
    private readonly profesoreRepository: Repository<Profesore>
  ){}

  create(profesoreDto: CreateProfesoreDto) {
    const c = this.profesoreRepository.create(profesoreDto);
    return this.profesoreRepository.save(c);
  }

  async findAll(): Promise<Profesore[]> {
    let criterio : FindManyOptions = { relations: [ 'clases' ] }
     let profesores : Profesore[] = await this.profesoreRepository.find( criterio );
     return profesores ;
   }
 
    async findOne(id: number):Promise<Profesore> {
     let criterio : FindOneOptions = { relations: [ 'clase' ], where: { idClase: id } }
     let profesore : Profesore = await this.profesoreRepository.findOne( criterio );
     return profesore ;
 
     throw new HttpException(
       'No existe una ciudad con ese id',
       HttpStatus.I_AM_A_TEAPOT,
     );;
   }
 
   async update(id: number, updateProfesoreDto: UpdateProfesoreDto) {
     await this.findOne(id);
 
     try {
       const result = await this.profesoreRepository.update(
         { idProfesor: id},
         {...updateProfesoreDto, idProfesor: id},
       );
 
       console.log(`Update, id: ${id}, result: ${result}`);
 
       return result;
     } catch (error){
       console.log(error);
       throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
       };
   }
 
   async remove(id: number) {
     const r = await this.profesoreRepository.delete(id);
 
     console.log(
       `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
     );
     if (r.affected)
       return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);
     throw new HttpException(
       'No existe una ciudad con ese id',
       HttpStatus.I_AM_A_TEAPOT,
     );;
   }
 }
 