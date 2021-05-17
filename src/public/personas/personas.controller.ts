import { Body, Controller, Post } from '@nestjs/common';
import { Persona } from './persona.interface';
import { PersonasService } from './personas.service';

@Controller()
export class PersonasController {
  constructor(private service: PersonasService) {}

  @Post()
  async create(@Body() data: Persona) {
    return await this.service.create(data);
  }
}
