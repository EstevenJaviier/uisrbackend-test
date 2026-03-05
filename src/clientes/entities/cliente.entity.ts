import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @OneToMany(() => Expediente, (expediente) => expediente.cliente)
  expedientes: Expediente[];
}
