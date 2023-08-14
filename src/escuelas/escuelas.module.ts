import { Module } from '@nestjs/common';
import { EscuelasService } from './escuelas.service';
import { EscuelasController } from './escuelas.controller';
import { Escuela } from './entities/escuela.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Ciudad, Clase])],
  controllers: [EscuelasController],
  providers: [EscuelasService]
})
export class EscuelasModule {}
