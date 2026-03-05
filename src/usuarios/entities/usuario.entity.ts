import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolUsuario } from '../../common/enums';
import { CargaArchivo } from 'src/cargas-archivos/entities/carga-archivo.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.ABOGADO,
  })
  rol: RolUsuario;

  @OneToMany(() => CargaArchivo, (carga) => carga.usuario)
  cargas: CargaArchivo[];
}
