import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expediente } from './entities/expediente.entity';
import { CreateExpedienteDto } from './dto/create-expediente.dto';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expediente)
    private readonly expedienteRepository: Repository<Expediente>,
    private readonly clientesService: ClientesService,
  ) {}

  async create(createExpedienteDto: CreateExpedienteDto) {
    const { clienteId, ...rest } = createExpedienteDto;
    const cliente = await this.clientesService.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    const expediente = this.expedienteRepository.create({
      ...rest,
      cliente,
    });
    return this.expedienteRepository.save(expediente);
  }

  findAll() {
    return this.expedienteRepository.find({ relations: ['cliente'] });
  }

  async findOne(id: number) {
    const expediente = await this.expedienteRepository.findOne({
      where: { id },
      relations: ['cliente', 'cargas', 'cargas.archivos', 'cargas.usuario'],
    });
    if (!expediente) {
      throw new NotFoundException(`Expediente con ID ${id} no encontrado`);
    }
    return expediente;
  }

  async getResumen(id: number) {
    const expediente = await this.findOne(id);
    return {
      id: expediente.id,
      numero: expediente.numeroExpediente,
      cliente: expediente.cliente.nombre,
      estado: expediente.estado,
      totalCargas: expediente.cargas.length,
      fechaApertura: expediente.fechaApertura,
      // Información optimizada para SSR
    };
  }
}
