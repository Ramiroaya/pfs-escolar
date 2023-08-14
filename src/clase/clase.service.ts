import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';



@Injectable()
export class ClaseService {
  constructor( 
  @InjectRepository(Clase)
  private readonly claseRepository : Repository<Clase>
  ){}

  
  create(claseDto: CreateClaseDto) {
    const c = this.claseRepository.create(claseDto);
    return this.claseRepository.save(c);
  }

  async findAll(): Promise<Clase[]> {
    let criterio : FindManyOptions = { relations: [ 'escuelas']}
    let clases : Clase[] = await this.claseRepository.find( criterio );
    return clases;
  }

  async findOne(id: number): Promise<Clase> {
    let criterio: FindOneOptions = { relations: [ 'escuelas'], where: {idClase: id} }
    let clase : Clase = await this.claseRepository.findOne( criterio );
    return clase ;

    throw new HttpException(
      'No existe una ciudad con ese id',
      HttpStatus.I_AM_A_TEAPOT,
    );
  }

  async update(id: number, updateClaseDto: UpdateClaseDto) {
    await this.findOne(id);

    try {
      const result = await this.claseRepository.update(
        { idClase: id},
        {...updateClaseDto, idClase: id},
      );

      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error){
      console.log(error);
      throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
      };
  }

  async remove(id: number) {
    const r = await this.claseRepository.delete(id);

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
