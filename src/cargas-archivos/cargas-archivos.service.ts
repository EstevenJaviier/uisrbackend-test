import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CargaArchivo } from './entities/carga-archivo.entity';
import { Archivo } from '../archivos/entities/archivo.entity';
import { ExpedientesService } from '../expedientes/expedientes.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateCargaArchivoDto } from './dto/create-carga-archivo.dto';

@Injectable()
export class CargasArchivosService {
  constructor(
    @InjectRepository(CargaArchivo)
    private readonly cargaRepository: Repository<CargaArchivo>,
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    private readonly expedientesService: ExpedientesService,
    private readonly usuariosService: UsuariosService,
    private readonly dataSource: DataSource,
  ) {}

  async create(expedienteId: number, createDto: CreateCargaArchivoDto, files: Express.Multer.File[]) {
    const expediente = await this.expedientesService.findOne(expedienteId);
    const usuario = await this.usuariosService.findOne(createDto.usuarioId);

    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const carga = this.cargaRepository.create({
        titulo: createDto.titulo,
        descripcion: createDto.descripcion,
        expediente,
        usuario,
      });
      const savedCarga = await queryRunner.manager.save(carga);

      const archivos = files.map(file => this.archivoRepository.create({
        nombreOriginal: file.originalname,
        nombreGuardado: file.filename,
        mimetype: file.mimetype,
        ruta: file.path,
        size: file.size,
        carga: savedCarga,
      }));

      await queryRunner.manager.save(archivos);
      await queryRunner.commitTransaction();

      return this.cargaRepository.findOne({
        where: { id: savedCarga.id },
        relations: ['archivos'],
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAllByExpediente(expedienteId: number) {
    return this.cargaRepository.find({
      where: { expediente: { id: expedienteId } },
      relations: ['archivos', 'usuario'],
      order: { fechaCarga: 'DESC' },
    });
  }
}
