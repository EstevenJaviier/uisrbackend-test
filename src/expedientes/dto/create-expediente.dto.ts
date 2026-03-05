import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { EstadoExpediente } from '../../common/enums';

export class CreateExpedienteDto {
  @IsNotEmpty()
  @IsString()
  numeroExpediente: string;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsOptional()
  @IsEnum(EstadoExpediente)
  estado?: EstadoExpediente;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
