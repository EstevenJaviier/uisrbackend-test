import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ExpedientesService } from './expedientes.service';
import { CreateExpedienteDto } from './dto/create-expediente.dto';

@Controller('expedientes')
export class ExpedientesController {
  constructor(private readonly expedientesService: ExpedientesService) {}

  @Post()
  create(@Body() createExpedienteDto: CreateExpedienteDto) {
    return this.expedientesService.create(createExpedienteDto);
  }

  @Get()
  findAll() {
    return this.expedientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expedientesService.findOne(id);
  }

  @Get(':id/resumen')
  getResumen(@Param('id', ParseIntPipe) id: number) {
    return this.expedientesService.getResumen(id);
  }
}
