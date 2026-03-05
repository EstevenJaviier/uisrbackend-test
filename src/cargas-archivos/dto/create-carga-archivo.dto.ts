import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCargaArchivoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  usuarioId: number;
}
