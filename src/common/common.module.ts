import { Module } from '@nestjs/common';
import { CommonFunctionsService } from './common-functions.service';
import { sequelizeProvider } from './sequelize.provider';
import { Util } from './common-utils';

@Module({
  providers: [CommonFunctionsService, sequelizeProvider, Util],
  exports: [CommonFunctionsService, sequelizeProvider, Util],
})
export class CommonModule {}
