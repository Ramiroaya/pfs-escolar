import { Module } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseController } from './clase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Profesore } from 'src/profesores/entities/profesore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase, Profesore])],
  controllers: [ClaseController],
  providers: [ClaseService]
})
export class ClaseModule {}
