import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { EscuelasModule } from './escuelas/escuelas.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ClaseModule } from './clase/clase.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'escolar',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    CiudadModule,
    EscuelasModule,
    ProfesoresModule,
    EstudiantesModule,
    ClaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
