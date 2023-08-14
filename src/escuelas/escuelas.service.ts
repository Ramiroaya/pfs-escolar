import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EscuelasService {
  constructor(
  @InjectRepository(Escuela)
  private readonly escuelaRepository: Repository<Escuela>
  ){}

  create(escuelaDto: CreateEscuelaDto) {
    const c = this.escuelaRepository.create(escuelaDto);
    return this.escuelaRepository.save(c);
  }

   async findAll(): Promise<Escuela[]> {
    let criterio : FindManyOptions = { relations: [ 'clases' ] }
    let escuelas : Escuela[] = await this.escuelaRepository.find( criterio );
    return escuelas ;
  }

  async findOne(id: number): Promise<Escuela> {
    let criterio : FindOneOptions = { relations: [ 'clases' ], where: { idEscuela: id } }
    let escuela : Escuela = await this.escuelaRepository.findOne( criterio );
    return escuela ;

    throw new HttpException(
      'No existe una ciudad con ese id',
      HttpStatus.I_AM_A_TEAPOT,
    );;
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    await this.findOne(id);

    try {
      const result = await this.escuelaRepository.update(
        { idEscuela: id},
        {...updateEscuelaDto, idEscuela: id},
      );

      console.log(`Update, id: ${id}, result: ${result}`);

      return result;
    } catch (error){
      console.log(error);
      throw new HttpException('no te voy a dar cafe', HttpStatus.I_AM_A_TEAPOT);
      };
  }

  async remove(id: number) {
    const r = await this.escuelaRepository.delete(id);

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
