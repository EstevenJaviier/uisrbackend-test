import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CargaArchivo } from 'src/cargas-archivos/entities/carga-archivo.entity';

@Entity('archivos')
export class Archivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreOriginal: string;

  @Column()
  nombreGuardado: string;

  @Column()
  mimetype: string;

  @Column()
  ruta: string;

  @Column()
  size: number;

  @ManyToOne(() => CargaArchivo, (carga) => carga.archivos)
  carga: CargaArchivo;
}
