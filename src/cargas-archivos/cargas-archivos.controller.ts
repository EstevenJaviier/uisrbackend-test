import { Controller, Post, Get, Param, Body, UseInterceptors, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CargasArchivosService } from './cargas-archivos.service';
import { CreateCargaArchivoDto } from './dto/create-carga-archivo.dto';

@Controller('expedientes')
export class CargasArchivosController {
  constructor(private readonly cargasService: CargasArchivosService) {}

  @Post(':id/cargas')
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadFiles(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateCargaArchivoDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.cargasService.create(id, createDto, files);
  }

  @Get(':id/cargas')
  findAll(@Param('id', ParseIntPipe) id: number) {
    return this.cargasService.findAllByExpediente(id);
  }
}
