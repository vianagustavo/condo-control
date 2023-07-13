import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common';

import {
  BANK_SLIPS_REPOSITORY,
  CREATE_BANK_SLIP,
  UNITS_REPOSITORY,
} from './constants';
import { CreateBankSlipService } from './data';
import { PrismaUnitsRepository } from './infra';
import { PrismaBankSlipsRepository } from './infra/repositories/bank-slips.repository';
import { BankSlipsController } from './presentation';

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
    {
      provide: CREATE_BANK_SLIP,
      useClass: CreateBankSlipService,
    },
  ],
  controllers: [BankSlipsController],
})
export class CondoControlModule {}
