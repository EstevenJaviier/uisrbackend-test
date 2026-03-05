import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Expediente } from 'src/expedientes/entities/expediente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Archivo } from 'src/archivos/entities/archivo.entity';

@Entity('cargas_archivos')
export class CargaArchivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn()
  fechaCarga: Date;

  @ManyToOne(() => Expediente, (expediente) => expediente.cargas)
  expediente: Expediente;

  @ManyToOne(() => Usuario, (usuario) => usuario.cargas)
  usuario: Usuario;

  @OneToMany(() => Archivo, (archivo) => archivo.carga)
  archivos: Archivo[];
}
