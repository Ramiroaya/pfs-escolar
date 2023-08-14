import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CiudadService {
constructor(
  @InjectRepository(Ciudad)
  private readonly ciudadRepository: Repository<Ciudad>
) {}

  create(ciudadDto: CreateCiudadDto) {
    const c = this.ciudadRepository.create(ciudadDto);
    return this.ciudadRepository.save(c);
  }

  async findAll(): Promise<Ciudad[]> {
    let criterio : FindManyOptions = { relations: [ 'escuelas' ] }
    let ciudades : Ciudad[] = await this.ciudadRepository.find( criterio );
    return ciudades ;
  }

  async findOne(id: number): Promise<Ciudad> {
    let criterio : FindOneOptions = { relations: [ 'escuela' ], where: { idEscuela: id } }
    let ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
    return ciudad ;

    throw new HttpException(
      'No existe una ciudad con ese id',
      HttpStatus.I_AM_A_TEAPOT,
    );;
  }

  async update(id: number, updateCiudadDto: UpdateCiudadDto) {
    await this.findOne(id);

    try {
      const result = await this.ciudadRepository.update(
        { idCiudad: id},
        {...updateCiudadDto, idCiudad: id},
      );

      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error){
      console.log(error);
      throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
      }
    }
  

  async remove(id: number) {
    const r = await this.ciudadRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No eliminado'}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);
    throw new HttpException(
      'No existe una ciudad con ese id',
      HttpStatus.I_AM_A_TEAPOT,
    );
  }
}
