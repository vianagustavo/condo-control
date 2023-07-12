import { Module } from '@nestjs/common';
import { UNITS_REPOSITORY } from './constants';
import { PrismaUnitsRepository } from './infra';

@Module({
  imports: [],
  providers: [
    {
      provide: UNITS_REPOSITORY,
      useClass: PrismaUnitsRepository,
    },
  ],
  controllers: [],
})
export class CondoControlModule {}
