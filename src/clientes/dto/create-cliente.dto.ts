import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
