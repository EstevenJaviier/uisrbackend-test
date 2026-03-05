import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargasArchivosService } from './cargas-archivos.service';
import { CargasArchivosController } from './cargas-archivos.controller';
import { CargaArchivo } from './entities/carga-archivo.entity';
import { Archivo } from '../archivos/entities/archivo.entity';
import { ExpedientesModule } from '../expedientes/expedientes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CargaArchivo, Archivo]),
    forwardRef(() => ExpedientesModule),
    UsuariosModule,
  ],
  controllers: [CargasArchivosController],
  providers: [CargasArchivosService],
  exports: [CargasArchivosService],
})
export class CargasArchivosModule {}
