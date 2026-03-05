import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { RolUsuario } from '../common/enums';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async onModuleInit() {
    const count = await this.usuarioRepository.count();
    if (count === 0) {
      const mockUser = this.usuarioRepository.create({
        nombre: 'Abogado Demo',
        username: 'abogado_demo',
        rol: RolUsuario.ABOGADO,
      });
      await this.usuarioRepository.save(mockUser);
    }
  }

  getMock() {
    return this.usuarioRepository.findOne({ where: { username: 'abogado_demo' } });
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({ where: { id } });
  }
}
