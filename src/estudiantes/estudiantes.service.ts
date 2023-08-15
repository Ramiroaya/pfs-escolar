import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante) 
    private readonly estudianteRepository: Repository<Estudiante>
  ){}

  create(estudianteDto: CreateEstudianteDto) {
    const c = this.estudianteRepository.create(estudianteDto);
    return this.estudianteRepository.save(c);
  }

 async findAll(): Promise<Estudiante[]> {
   let criterio : FindManyOptions = { relations: [ 'clases' ] }
    let estudiantes : Estudiante[] = await this.estudianteRepository.find( criterio );
    return estudiantes ;
  }

   async findOne(id: number):Promise<Estudiante> {
    let criterio : FindOneOptions = { relations: [ 'clase' ], where: { idEstudiante: id } }
    let estudiante : Estudiante = await this.estudianteRepository.findOne( criterio );
    return estudiante ;

    throw new HttpException(
      'No existe una ciudad con ese id',
      HttpStatus.I_AM_A_TEAPOT,
    );;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    await this.findOne(id);

    try {
      const result = await this.estudianteRepository.update(
        { idEstudiante: id},
        {...updateEstudianteDto, idEstudiante: id},
      );

      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error){
      console.log(error);
      throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
      };
  }

  async remove(id: number) {
    const r = await this.estudianteRepository.delete(id);

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
