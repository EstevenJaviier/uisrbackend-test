import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { EstadoExpediente } from '../../common/enums';
import { CargaArchivo } from 'src/cargas-archivos/entities/carga-archivo.entity';

@Entity('expedientes')
export class Expediente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroExpediente: string;

  @Column({
    type: 'enum',
    enum: EstadoExpediente,
    default: EstadoExpediente.ABIERTO,
  })
  estado: EstadoExpediente;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn()
  fechaApertura: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.expedientes)
  cliente: Cliente;

  @OneToMany(() => CargaArchivo, (carga) => carga.expediente)
  cargas: CargaArchivo[];
}
