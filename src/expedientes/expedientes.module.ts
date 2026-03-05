import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expediente } from './entities/expediente.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { CargasArchivosModule } from '../cargas-archivos/cargas-archivos.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expediente]),
    ClientesModule,
    forwardRef(() => CargasArchivosModule),
  ],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
  exports: [ExpedientesService],
})
export class ExpedientesModule {}
