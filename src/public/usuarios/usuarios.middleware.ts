import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { CommonFunctionsService } from '../../common/common-functions.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsuariosMiddleware implements NestMiddleware {
  constructor(
    private readonly commonService: CommonFunctionsService,
    @Inject('Sequelize') private sequelize: Sequelize,
  ) {}

  use(req: any, res: any, next: () => void) {
    const model = this.sequelize.models.Usuario;
    if (model) {
      this.commonService.model = model;
      next();
    } else {
      res.send({ status: false, error: 'Modelo no Definido' });
    }
  }
}
