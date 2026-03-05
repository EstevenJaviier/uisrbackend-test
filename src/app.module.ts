import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cliente } from './clientes/entities/cliente.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Expediente } from './expedientes/entities/expediente.entity';
import { CargaArchivo } from './cargas-archivos/entities/carga-archivo.entity';
import { Archivo } from './archivos/entities/archivo.entity';
import { ClientesModule } from './clientes/clientes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ExpedientesModule } from './expedientes/expedientes.module';
import { CargasArchivosModule } from './cargas-archivos/cargas-archivos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '192.168.1.80',
      port: Number(process.env.DB_PORT) || 5438,
      username: process.env.DB_USERNAME || 'uisrtest',
      password: process.env.DB_PASSWORD || 'uisrtest',
      database: process.env.DB_DATABASE || 'uisrtest',
      entities: [Cliente, Usuario, Expediente, CargaArchivo, Archivo],
      synchronize: true, // Solo para demo técnica
    }),
    TypeOrmModule.forFeature([Cliente, Usuario, Expediente, CargaArchivo, Archivo]),
    ClientesModule,
    UsuariosModule,
    ExpedientesModule,
    CargasArchivosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
