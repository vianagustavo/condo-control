import { Module } from '@nestjs/common';
import { BANK_SLIPS_REPOSITORY, UNITS_REPOSITORY } from './constants';
import { PrismaUnitsRepository } from './infra';
import { PrismaService } from 'src/common';
import { PrismaBankSlipsRepository } from './infra/repositories/bank-slips.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: BANK_SLIPS_REPOSITORY,
      useClass: PrismaBankSlipsRepository,
    },
    {
      provide: UNITS_REPOSITORY,
      useClass: PrismaUnitsRepository,
    },
  ],
  controllers: [],
})
export class CondoControlModule {}
