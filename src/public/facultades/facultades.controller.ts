import { Controller, Get, Param } from '@nestjs/common';
import { FacultadesService } from './facultades.service';

@Controller()
export class FacultadesController {
  constructor(private facultadService: FacultadesService) {}

  @Get(':id')
  getFacultad(@Param('id') facultadId: number) {
    return this.facultadService.getFacultad(facultadId);
  }
}
